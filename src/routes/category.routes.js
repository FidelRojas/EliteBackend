import { Router } from 'express'
import * as categoryCtrl from '../controllers/category.controller'
import { HasRoles } from '../middlewares/authJwt'

const router = Router()

router.get(
    '/',
    HasRoles(['admin']),
    categoryCtrl.getCategories
)
router.get('/:categoryId', HasRoles(['admin']), categoryCtrl.getCategory)
router.post('/', HasRoles(['admin']), categoryCtrl.createCategory)
router.delete('/:categoryId', HasRoles(['admin']), categoryCtrl.deleteCategory)
router.put('/:categoryId', HasRoles(['admin']), categoryCtrl.updateCategory)

export default router
