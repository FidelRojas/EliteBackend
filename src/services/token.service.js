import config from '../config'
import jwt from 'jsonwebtoken'
import * as path from 'path'
import * as fs from 'fs'

export function getUserToken(user) {
  const tokenExpiration = config.TOKEN_EXPIRATION_TIME
  const issuer = 'laboratorioclifford.com'
  const privateKey = getPrivateKey()
  const issuedAtTimestamp = Math.floor(Date.now() / 1000)
  const expirationTimestamp =
    Number(issuedAtTimestamp) + Number(tokenExpiration)
  const payload = {
    iss: issuer,
    iat: issuedAtTimestamp,
    exp: expirationTimestamp,
    id: user.id,
    userName: user.userName,
    role: user.role.name
  }
  return jwt.sign(payload, privateKey, { algorithm: 'RS256' })
}

export function validateToken(token) {
  return jwt.verify(
    token,
    getPublicKey(),
    { algorithms: ['RS256'] },
    function (err, decoded) {
      return { err, decoded }
    }
  )
}

function getPrivateKey() {
  try {
    if (process.env.PRIVATE_KEY) {
      return process.env.PRIVATE_KEY
    } else {
      const keyPath = path.resolve(
        path.dirname(path.dirname(__dirname)),
        './src/security/private.pem'
      )
      return fs.readFileSync(keyPath)
    }
  } catch (error) {
    throw error.message
  }
}

function getPublicKey() {
  try {
    if (process.env.PUBLIC_KEY) {
      return process.env.PUBLIC_KEY
    } else {
      const keyPath = path.resolve(
        path.dirname(path.dirname(__dirname)),
        './src/security/public.pem'
      )
      return fs.readFileSync(keyPath)
    }
  } catch (error) {
    throw error.message
  }
}
