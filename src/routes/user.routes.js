import { Router } from 'express'
import * as userCtrl from '../controllers/user.controller'
import { HasRoles } from '../middlewares/authJwt'

const router = Router()

router.get('/', HasRoles(['admin']), userCtrl.getUsers)
router.post('/', HasRoles(['admin']), userCtrl.createUser)
router.post(
  '/:userId/newPassword',
  HasRoles(['admin']),
  userCtrl.generateNewPassword
)
router.get(
  '/:userId',
  HasRoles(['admin']),
  userCtrl.getUser
)
router.delete('/:userId', HasRoles(['admin']), userCtrl.deleteUser)
router.put('/:userId', HasRoles(['admin']), userCtrl.updateUser)
router.post(
  '/changePassword',
  HasRoles(['admin']),
  userCtrl.changePassword
)
router.post(
  '/changeStatus/:userId',
  HasRoles(['admin']),
  userCtrl.changeStatus
)

export default router
