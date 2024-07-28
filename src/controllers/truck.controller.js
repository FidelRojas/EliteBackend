import * as truckService from '../services/truck.service'
import { getUpdatedByFromReq } from '../utils/user'

export async function getTrucks(req, res, next) {
  try {
    const { query } = req
    const resp = await truckService.getTrucks(query)
    res.json(resp)
  } catch (error) {
    catchError(next, error)
  }
}

export async function getTruck(req, res, next) {
  try {
    const { truckId } = req.params
    res.json({
      data: await truckService.getTruck(truckId)
    })
  } catch (error) {
    catchError(next, error)
  }
}

export async function createTruck(req, res, next) {
  try {
    return res.json({
      message: 'Camión creado con éxito',
      data: await truckService.createTruck(req.body, getUpdatedByFromReq(req))
    })
  } catch (error) {
    catchError(next, error)
  }
}

export async function deleteTruck(req, res, next) {
  try {
    const { truckId } = req.params
    return res.json({
      message: await truckService.deleteTruck(truckId, getUpdatedByFromReq(req))
    })
  } catch (error) {
    catchError(next, error)
  }
}

export async function updateTruck(req, res, next) {
  try {
    const { truckId } = req.params
    const truck = await truckService.updateTruck(truckId, req.body, getUpdatedByFromReq(req))
    return res.json({
      message: 'Camión editado con éxito',
      data: truck
    })
  } catch (error) {
    catchError(next, error)
  }
}

function catchError(next, error) {
  next(error)
}
