import * as travelService from '../services/travel.service'
import { getUpdatedByFromReq } from '../utils/user'

export async function getTravels(req, res, next) {
  try {
    const { query } = req
    const resp = await travelService.getTravels(query)
    res.json(resp)
  } catch (error) {
    catchError(next, error)
  }
}

export async function getTravel(req, res, next) {
  try {
    const { travelId } = req.params
    res.json({
      data: await travelService.getTravel(travelId)
    })
  } catch (error) {
    catchError(next, error)
  }
}

export async function createTravel(req, res, next) {
  try {
    return res.json({
      message: 'Viaje creado con éxito',
      data: await travelService.createTravel(req.body, getUpdatedByFromReq(req))
    })
  } catch (error) {
    catchError(next, error)
  }
}

export async function deleteTravel(req, res, next) {
  try {
    const { travelId } = req.params
    return res.json({
      message: await travelService.deleteTravel(travelId, getUpdatedByFromReq(req))
    })
  } catch (error) {
    catchError(next, error)
  }
}

export async function updateTravel(req, res, next) {
  try {
    const { travelId } = req.params
    const travel = await travelService.updateTravel(travelId, req.body, getUpdatedByFromReq(req))
    return res.json({
      message: 'Viaje editado con éxito',
      data: travel
    })
  } catch (error) {
    catchError(next, error)
  }
}

function catchError(next, error) {
  next(error)
}
