import { findCity } from './city.service';
import { findTruck } from './truck.service';

const models = require('../database/models/index')
const { Op } = require('sequelize')

export async function getTravels(query) {
  const { order = 'ASC', orderBy = 'id', page = 0, rowsPerPage = 10, search = '', searchBy = '' } = query;
  const options = {
    where: {
      status: { [Op.ne]: 0 },
    },
    order: orderBy ? [[orderBy, order.toUpperCase()]] : [['id', 'ASC']],
    limit: parseInt(rowsPerPage, 10),
    offset: parseInt(page, 10) * parseInt(rowsPerPage, 10),
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
}) {

  if (truckId) findTruck(truckId)
  if (from) findCity(from)
  if (to) findCity(to)

  const newTravel = await models.Travel.create({
    truckId,
    from,
    to,
    notes,
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

export async function deleteTravel(travelId) {
  const travel = await models.Travel.findOne({
    where: {
      id: travelId,
      status: { [Op.ne]: 0 }
    }
  })
  if (!travel) travelNotExist(travelId)

  await travel.update({
    status: 0
  })

  return 'Viaje eliminado con éxito'
}

export async function updateTravel(travelId, travel) {
  let travelResponse
  const {
    truckId,
    from,
    to,
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
    notes,
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
