const models = require('../database/models/index')
const { Op } = require('sequelize')

export async function getTrucks(query) {
  const { order = 'ASC', orderBy = 'id', page, rowsPerPage, search = '', searchBy = '' } = query;
  const options = {
    where: {
      status: { [Op.ne]: 0 },
    },
    order: orderBy ? [[orderBy, order.toUpperCase()]] : [['id', 'ASC']],
  }
  if (rowsPerPage) {
    options.limit = parseInt(rowsPerPage, 10)
  }
  if (rowsPerPage) {
    options.offset = parseInt(page, 10) * parseInt(rowsPerPage, 10)
  }
  if (searchBy) {
    if (searchBy === 'year') {
      options.where = {
        ...options.where, [searchBy]: {
          [Op.eq]: parseInt(search)
        }
      }
    } else {
      options.where = {
        ...options.where, [searchBy]: {
          [Op.iLike]: `%${search}%`
        }
      }
    }
  }
  const trucks = await models.Truck.findAndCountAll(options)
  return {
    data: trucks.rows,
    total: trucks.count,
  }
}

export async function getTruck(truckId) {
  const truck = await models.Truck.findOne({
    where: {
      id: truckId,
      status: { [Op.ne]: 0 }
    }
  })
  if (!truck) truckNotExist(truckId)
  return truck
}

export async function createTruck({
  plate,
  brand,
  year,
  type,
  notes
},
  updatedBy) {
  const newTruck = await models.Truck.create({
    plate,
    brand,
    year,
    type,
    notes,
    updatedBy
  })

  if (!newTruck) throw new Error('Error al crear el camión')
  return newTruck
}

export async function deleteTruck(truckId, updatedBy) {
  const truck = await models.Truck.findOne({
    where: {
      id: truckId,
      status: { [Op.ne]: 0 }
    }
  })
  if (!truck) truckNotExist(truckId)

  await truck.update({
    status: 0,
    updatedBy
  })

  return 'Camión eliminado con éxito'
}

export async function updateTruck(truckId, truck, updatedBy) {
  let truckResponse
  const {
    plate,
    brand,
    year,
    type,
    notes,
  } = truck
  const truckDB = await models.Truck.findOne({
    where: {
      id: truckId,
      status: {
        [Op.ne]: 0
      }
    }
  })
  if (!truckDB) return truckNotExist(truckId)

  await truckDB.update({
    plate,
    brand,
    year,
    type,
    notes,
    updatedBy

  })

  truckResponse = await models.Truck.findOne({
    where: {
      id: truckId,
      status: { [Op.ne]: 0 }
    }
  })

  return truckResponse
}

export const findTruck = async (truckId) => {
  const truck = await models.Truck.findOne({
    where: {
      id: truckId,
      status: { [Op.ne]: 0 }
    }
  })

  if (!truck) {
    truckNotExist(truckId)
  }

  return truck
}

function truckNotExist(truckId) {
  throw new Error(`El camión con id: ${truckId} no existe`)
}
