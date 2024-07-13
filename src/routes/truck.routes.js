import { Router } from 'express'
import * as truckCtrl from '../controllers/truck.controller'
import { HasRoles } from '../middlewares/authJwt'

const router = Router()

router.get(
  '/',
  HasRoles(['admin']),
  truckCtrl.getTrucks
)
router.get('/:truckId', HasRoles(['admin']), truckCtrl.getTruck)
router.post('/', HasRoles(['admin']), truckCtrl.createTruck)
router.delete('/:truckId', HasRoles(['admin']), truckCtrl.deleteTruck)
router.put('/:truckId', HasRoles(['admin']), truckCtrl.updateTruck)

export default router
