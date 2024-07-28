import { Router } from 'express'
import * as expenseCtrl from '../controllers/expense.controller'
import { HasRoles } from '../middlewares/authJwt'

const router = Router()

router.get(
  '/',
  HasRoles(['admin']),
  expenseCtrl.getExpenses
)
router.get('/:expenseId', HasRoles(['admin']), expenseCtrl.getExpense)
router.post('/', HasRoles(['admin']), expenseCtrl.createExpense)
router.delete('/:expenseId', HasRoles(['admin']), expenseCtrl.deleteExpense)
router.put('/:expenseId', HasRoles(['admin']), expenseCtrl.updateExpense)

export default router
