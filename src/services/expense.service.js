import { findCategory } from './category.service';
import { findCity } from './city.service';
import { findTruck } from './truck.service';

const models = require('../database/models/index')
const { Op } = require('sequelize')

export async function getExpenses(query) {
  const { order = 'ASC', orderBy = 'id', page, rowsPerPage, search = '', searchBy = '' } = query;
  const options = {
    where: {
      status: { [Op.ne]: 0 },
    },
    order: orderBy ? [[orderBy, order.toUpperCase()]] : [['id', 'ASC']],
    include: [
      {
        model: models.Truck,
        as: 'truck',
        attributes: ['id', 'plate']
      },
      {
        model: models.Category,
        as: 'category',
        attributes: ['id', 'name']
      }]
  }
  if (rowsPerPage) {
    options.limit = parseInt(rowsPerPage, 10)
  }
  if (rowsPerPage) {
    options.offset = parseInt(page, 10) * parseInt(rowsPerPage, 10)
  }
  if (searchBy) {
    options.where = {
      ...options.where, [searchBy]: {
        [Op.iLike]: `%${search}%`
      }
    }
  }

  const expenses = await models.Expense.findAndCountAll(options)
  return {
    data: expenses.rows,
    total: expenses.count,
  }
}


export async function getExpense(expenseId) {
  const expense = await models.Expense.findOne({
    where: {
      id: expenseId,
      status: { [Op.ne]: 0 }
    }
  })
  if (!expense) expenseNotExist(expenseId)
  return expense
}

export async function createExpense({
  date,
  detail,
  from,
  to,
  amountBs,
  amountSus,
  notes,
  categoryId,
  truckId
},
  updatedBy
) {

  if (truckId) findTruck(truckId)
  if (categoryId) findCategory(categoryId)

  const newExpense = await models.Expense.create({
    date,
    detail,
    from,
    to,
    amountBs,
    amountSus,
    notes,
    categoryId,
    truckId,
    updatedBy
  })

  if (!newExpense) throw new Error('Error al crear el gasto')

  const expense = await models.Expense.findByPk(
    newExpense.id,
    {
      include: [
        {
          model: models.Truck,
          as: 'truck',
          attributes: ['id', 'plate']
        },
        {
          model: models.Category,
          as: 'category',
          attributes: ['id', 'name']
        }],
    }
  )
  return expense
}

export async function deleteExpense(expenseId, updatedBy) {
  const expense = await models.Expense.findOne({
    where: {
      id: expenseId,
      status: { [Op.ne]: 0 }
    }
  })
  if (!expense) expenseNotExist(expenseId)

  await expense.update({
    status: 0,
    updatedBy
  })

  return 'Gasto eliminado con éxito'
}

export async function updateExpense(expenseId, expense, updatedBy) {
  let expenseResponse
  const {
    date,
    detail,
    from,
    to,
    amountBs,
    amountSus,
    notes,
    categoryId,
    truckId
  } = expense
  const expenseDB = await models.Expense.findOne({
    where: {
      id: expenseId,
      status: {
        [Op.ne]: 0
      }
    }
  })

  if (truckId) findTruck(truckId)
  if (categoryId) findCategory(categoryIdfrom)

  if (!expenseDB) return expenseNotExist(expenseId)

  await expenseDB.update({
    date,
    detail,
    from,
    to,
    amountBs,
    amountSus,
    notes,
    categoryId,
    truckId,
    updatedBy

  })

  expenseResponse = await models.Expense.findOne({
    where: {
      id: expenseId,
      status: { [Op.ne]: 0 }
    },
    include: [
      {
        model: models.Truck,
        as: 'truck',
        attributes: ['id', 'plate']
      },
      {
        model: models.Category,
        as: 'category',
        attributes: ['id', 'name']
      }],
  })

  return expenseResponse
}

function expenseNotExist(expenseId) {
  throw new Error(`El gasto con id: ${expenseId} no existe`)
}
