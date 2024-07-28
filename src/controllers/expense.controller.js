import * as expenseService from '../services/expense.service'
import { getUpdatedByFromReq } from '../utils/user'

export async function getExpenses(req, res, next) {
  try {
    const { query } = req
    const resp = await expenseService.getExpenses(query)
    res.json(resp)
  } catch (error) {
    catchError(next, error)
  }
}

export async function getExpense(req, res, next) {
  try {
    const { expenseId } = req.params
    res.json({
      data: await expenseService.getExpense(expenseId)
    })
  } catch (error) {
    catchError(next, error)
  }
}

export async function createExpense(req, res, next) {
  try {
    return res.json({
      message: 'Gasto creado con éxito',
      data: await expenseService.createExpense(req.body, getUpdatedByFromReq(req))
    })
  } catch (error) {
    catchError(next, error)
  }
}

export async function deleteExpense(req, res, next) {
  try {
    const { expenseId } = req.params
    return res.json({
      message: await expenseService.deleteExpense(expenseId, getUpdatedByFromReq(req))
    })
  } catch (error) {
    catchError(next, error)
  }
}

export async function updateExpense(req, res, next) {
  try {
    const { expenseId } = req.params
    const expense = await expenseService.updateExpense(expenseId, req.body, getUpdatedByFromReq(req))
    return res.json({
      message: 'Gasto editado con éxito',
      data: expense
    })
  } catch (error) {
    catchError(next, error)
  }
}

function catchError(next, error) {
  next(error)
}
