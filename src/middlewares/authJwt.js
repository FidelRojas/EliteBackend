const models = require('../database/models/index')
import { validateToken } from '../services/token.service'

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    try {
      const { decoded } = validateToken(bearerToken)
      const user = await models.User.findOne({
        where: { userName: decoded.userName, status: 1 }
      })
      if (!user)
        return res.status(403).json({ message: 'Usuario no encontrado.' })
      req.userName = decoded.userName
      req.userRole = decoded.role
      req.userId = user.id
      next()
    } catch (error) {
      return res.status(403).json({ message: 'No autorizado.' })
    }
  } else {
    return res
      .status(403)
      .json({ message: 'No se ha proporcionado ningún token.' })
  }
}

export function HasRoles(roles) {
  return function (req, res, next) {
    verifyToken(req, res, function () {
      if (roles.includes(req.userRole)) next()
      else
        return res
          .status(401)
          .json({ message: 'No cuenta con los permisos necesarios.' })
    })
  }
}
