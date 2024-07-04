const models = require('../database/models/index')
const { Op } = require('sequelize')

export async function getUsers(req, res) {
  try {
    const where = {
      status: { [Op.ne]: 0 },
      [Op.not]: { id: req.userId }
    }

    const users = await models.User.findAll({
      where,
      attributes: { exclude: ['password'] },
      order: ['id'],
      include: ['role']
    })
    res.json({
      data: users
    })
  } catch (error) {
    catchError(error, res)
  }
}

export async function getUser(req, res) {
  try {
    const { userId } = req.params
    const user = await models.User.findOne({
      where: {
        id: userId,
        status: { [Op.ne]: 0 }
      },
      attributes: { exclude: ['password'] },
      include: ['role']
    })
    if (!user) {
      res.status(404).json({
        message: `El usuario con id: ${userId} no existe`
      })
    } else {
      res.json({
        data: user
      })
    }
  } catch (error) {
    catchError(error, res)
  }
}

export async function createUser(req, res) {
  const {
    email,
    name,
    lastName,
    identityCard,
    phone,
    roleId
  } = req.body
  try {
    const foundRol = await models.Role.findByPk(roleId)
    if (!foundRol)
      return res.status(500).json({
        message: `El rol con id: ${roleId} no existe`
      })
    const foundUser = await models.User.findOne({
      where: { email }
    })
    if (foundUser)
      return res.status(500).json({
        message: 'El correo electornico ya esta en uso'
      })

    const userName = await createUserName(name, lastName)
    const randomPassword = Math.random().toString(36).slice(-8)
    const user = {
      userName,
      email,
      name,
      lastName,
      identityCard,
      phone,
      password: await models.User.encryptPassword(randomPassword),
      roleId
    }
    let tempUser = await models.User.create(user)

    let newUser = await models.User.findOne({
      where: {
        id: tempUser.id,
        status: { [Op.ne]: 0 }
      },
      include: ['role']

    })

    if (newUser) {
      newUser.password = randomPassword
      return res.json({
        message: 'Usuario creado con éxito',
        data: newUser
      })
    }
  } catch (error) {
    catchError(error, res)
  }
}

export async function deleteUser(req, res) {
  try {
    const { userId } = req.params
    const user = await models.User.findByPk(userId)
    if (!user) return userNotExist(res, userId)

    await user.update({
      status: 0,
      email: null
    })

    return res.json({
      message: 'Usuario eliminado con éxito'
    })
  } catch (error) {
    catchError(error, res)
  }
}

export async function updateUser(req, res) {
  try {
    let userResponse
    const { userId } = req.params
    const {
      email,
      name,
      lastName,
      identityCard,
      phone,
      roleId,

    } = req.body
    const user = await models.User.findOne({
      where: {
        id: userId,
        status: {
          [Op.ne]: 0
        }
      }
    })
    if (user) {
      const userName = await createUserName(name, lastName, userId)
      await user.update({
        userName,
        email,
        name,
        lastName,
        identityCard,
        phone,
        roleId,
      })

      userResponse = await models.User.findOne({
        where: {
          id: userId,
          status: { [Op.ne]: 0 }

        },
        include: ['role']
      })
      userResponse.password = null
    } else return userNotExist(res, userId)

    return res.json({
      message: 'Usuario editado con éxito',
      data: userResponse
    })
  } catch (error) {
    catchError(error, res)
  }
}

export async function generateNewPassword(req, res) {
  try {
    const { userId } = req.params

    const user = await models.User.findOne({
      where: { id: userId, status: { [Op.ne]: 0 } }
    })
    const randomPassword = Math.random().toString(36).slice(-8)
    if (user) {
      await user.update({
        password: await models.User.encryptPassword(randomPassword)
      })
    } else {
      return userNotExist(res, userId)
    }
    user.password = randomPassword
    return res.json({
      message: 'Contraseña nueva actualizada',
      data: user
    })
  } catch (error) {
    catchError(error, res)
  }
}

export async function changePassword(req, res) {
  try {
    const { userId } = req
    const { oldPassword, newPassword, confirmPassword } = req.body
    const userFound = await models.User.findOne({
      where: { id: userId, status: 1 }
    })
    if (userFound) {
      const matchPassword = await models.User.comparePassword(
        oldPassword,
        userFound.password
      )
      if (!matchPassword) return returnError(res, 'Contraseña incorrecta')
      if (!(newPassword.length >= 8))
        return returnError(
          res,
          'La nueva contraseña tiene que tener almenos 8 caracteres'
        )
      if (newPassword !== confirmPassword)
        return returnError(res, 'La nueva contraseña no coincide')
      await userFound.update({
        password: await models.User.encryptPassword(newPassword)
      })
    } else {
      return userNotExist(res, userId)
    }
    userFound.password = null
    return res.json({
      message: 'Contraseña nueva actualizada',
      data: userFound
    })
  } catch (error) {
    catchError(error, res)
  }
}

export async function changeStatus(req, res) {
  try {
    const { userId } = req.params
    const userFound = await models.User.findOne({
      where: { id: userId, status: { [Op.ne]: 0 } }
    })
    if (userFound) {
      let newStatus = 2
      if (userFound.status === 2) {
        newStatus = 1
      }
      await userFound.update({ status: newStatus })

      return res.json({
        message: `Usuario con id ${userFound.id} actualizado con éxito`,
        userStatus: newStatus
      })
    } else {
      return userNotExist(res, userId)
    }
  } catch (error) {
    catchError(error, res)
  }
}

function userNotExist(res, userId) {
  return res.status(500).json({
    message: `El usuario con id: ${userId} no existe`
  })
}

function returnError(res, message) {
  return res.status(500).json({
    message
  })
}

function catchError(error, res) {
  res.status(500).json({
    message: 'Algo no salio bien',
    data: {}
  })
}

async function createUserName(name, lastName, userID = null) {
  let noMatchIndex = 0
  let userName = ''
  let foundUser = null
  do {
    userName = `${name[0]}${lastName}${noMatchIndex !== 0 ? noMatchIndex : ''
      }`.toLowerCase()
    foundUser = await models.User.findOne({
      where: { userName }
    })
    if (userID == foundUser?.id) {
      foundUser = null
    }
    noMatchIndex++
  } while (foundUser !== null)
  return userName
}
