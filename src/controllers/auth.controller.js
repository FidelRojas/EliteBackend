const models = require('../database/models/index')
import { getUserToken } from '../services/token.service'

export async function login(req, res) {
  const { userName, password } = req.body
  try {
    const userFound = await models.User.findOne({
      where: { userName, status: 1 },
      include: 'role'
    })


    if (!userFound) return loginFailed(res)

    const matchPassword = await models.User.comparePassword(
      password,
      userFound.password
    )
    if (!matchPassword) return loginFailed(res)

    const token = getUserToken(userFound)

    res.json({ token })
  } catch (error) {
    catchError(error, res)
  }
}
function catchError(error, res) {
  res.status(500).json({
    message: 'Algo no salio bien'
  })
}

function loginFailed(res) {
  return res.status(401).json({
    message: 'Usuario o contraseña invalida'
  })
}
