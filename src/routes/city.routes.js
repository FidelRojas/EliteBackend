import { Router } from 'express'
import * as cityCtrl from '../controllers/city.controller'
import { HasRoles } from '../middlewares/authJwt'

const router = Router()

router.get(
    '/',
    HasRoles(['admin']),
    cityCtrl.getCities
)
router.get('/:cityId', HasRoles(['admin']), cityCtrl.getCity)
router.post('/', HasRoles(['admin']), cityCtrl.createCity)
router.delete('/:cityId', HasRoles(['admin']), cityCtrl.deleteCity)
router.put('/:cityId', HasRoles(['admin']), cityCtrl.updateCity)

export default router
