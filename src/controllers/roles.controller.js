const { Role } = require('../database/models/index')

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll()
    res.json(roles)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Algo no salio bien',
      data: {}
    })
  }
}
