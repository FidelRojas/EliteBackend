import * as citieservice from '../services/city.service'

export async function getCities(req, res, next) {
    try {
        const { query } = req
        const resp = await citieservice.getCities(query)
        res.json(resp)
    } catch (error) {
        catchError(next, error)
    }
}

export async function getCity(req, res, next) {
    try {
        const { cityId } = req.params
        res.json({
            data: await citieservice.getCity(cityId)
        })
    } catch (error) {
        catchError(next, error)
    }
}

export async function createCity(req, res, next) {
    try {
        return res.json({
            message: 'Ciudad creada con éxito',
            data: await citieservice.createCity(req.body)
        })
    } catch (error) {
        catchError(next, error)
    }
}

export async function deleteCity(req, res, next) {
    try {
        const { cityId } = req.params
        return res.json({
            message: await citieservice.deleteCity(cityId)
        })
    } catch (error) {
        catchError(next, error)
    }
}

export async function updateCity(req, res, next) {
    try {
        const { cityId } = req.params
        const city = await citieservice.updateCity(cityId, req.body)
        return res.json({
            message: 'Ciudad editada con éxito',
            data: city
        })
    } catch (error) {
        catchError(next, error)
    }
}

function catchError(next, error) {
    next(error)
}
