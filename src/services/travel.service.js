import { findCity } from './city.service';
import { findTruck } from './truck.service';

const models = require('../database/models/index')
const { Op } = require('sequelize')

export async function getTravels(query) {
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
        model: models.City,
        as: 'toCity',

        attributes: ['id', 'name']
      }, {
        model: models.City,
        as: 'fromCity',

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

  const travels = await models.Travel.findAndCountAll(options)
  return {
    data: travels.rows,
    total: travels.count,
  }
}


export async function getTravel(travelId) {
  const travel = await models.Travel.findOne({
    where: {
      id: travelId,
      status: { [Op.ne]: 0 }
    }
  })
  if (!travel) travelNotExist(travelId)
  return travel
}

export async function createTravel({
  truckId,
  from,
  to,
  notes,
  departureDate,
  arrivalDate
},
  updatedBy
) {

  if (truckId) findTruck(truckId)
  if (from) findCity(from)
  if (to) findCity(to)

  const newTravel = await models.Travel.create({
    truckId,
    from,
    to,
    notes,
    departureDate,
    arrivalDate,
    updatedBy
  })

  if (!newTravel) throw new Error('Error al crear el viaje')

  const travel = await models.Travel.findByPk(
    newTravel.id,
    {
      include: [
        {
          model: models.Truck,
          as: 'truck',
          attributes: ['id', 'plate']
        },
        {
          model: models.City,
          as: 'toCity',

          attributes: ['id', 'name']
        }, {
          model: models.City,
          as: 'fromCity',

          attributes: ['id', 'name']
        }],
    }
  )
  return travel
}

export async function deleteTravel(travelId, updatedBy) {
  const travel = await models.Travel.findOne({
    where: {
      id: travelId,
      status: { [Op.ne]: 0 }
    }
  })
  if (!travel) travelNotExist(travelId)

  await travel.update({
    status: 0,
    updatedBy
  })

  return 'Viaje eliminado con éxito'
}

export async function updateTravel(travelId, travel, updatedBy,) {
  let travelResponse
  const {
    truckId,
    from,
    to,
    departureDate,
    arrivalDate,
    notes,
  } = travel
  const travelDB = await models.Travel.findOne({
    where: {
      id: travelId,
      status: {
        [Op.ne]: 0
      }
    }
  })

  if (truckId) findTruck(truckId)
  if (from) findCity(from)
  if (to) findCity(to)

  if (!travelDB) return travelNotExist(travelId)

  await travelDB.update({
    truckId,
    from,
    to,
    departureDate,
    arrivalDate,
    notes,
    updatedBy

  })

  travelResponse = await models.Travel.findOne({
    where: {
      id: travelId,
      status: { [Op.ne]: 0 }
    },
    include: [
      {
        model: models.Truck,
        as: 'truck',
        attributes: ['id', 'plate']
      },
      {
        model: models.City,
        as: 'toCity',

        attributes: ['id', 'name']
      }, {
        model: models.City,
        as: 'fromCity',

        attributes: ['id', 'name']
      }],
  })

  return travelResponse
}

function travelNotExist(travelId) {
  throw new Error(`El viaje con id: ${travelId} no existe`)
}
