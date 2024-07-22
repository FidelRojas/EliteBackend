import { Router } from 'express'
import * as travelCtrl from '../controllers/travel.controller'
import { HasRoles } from '../middlewares/authJwt'

const router = Router()

router.get(
  '/',
  HasRoles(['admin']),
  travelCtrl.getTravels
)
router.get('/:travelId', HasRoles(['admin']), travelCtrl.getTravel)
router.post('/', HasRoles(['admin']), travelCtrl.createTravel)
router.delete('/:travelId', HasRoles(['admin']), travelCtrl.deleteTravel)
router.put('/:travelId', HasRoles(['admin']), travelCtrl.updateTravel)

export default router
