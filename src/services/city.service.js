const models = require('../database/models/index')
const { Op } = require('sequelize')

export async function getCities(query) {
    const { order = 'ASC', orderBy = 'id', page = 0, rowsPerPage = 10, search = '', searchBy = '' } = query;
    const options = {
        where: {
            status: { [Op.ne]: 0 },
        },
        order: orderBy ? [[orderBy, order.toUpperCase()]] : [['id', 'ASC']],
        limit: parseInt(rowsPerPage, 10),
        offset: parseInt(page, 10) * parseInt(rowsPerPage, 10)
    }
    if (searchBy) {
        options.where = {
            ...options.where, [searchBy]: {
                [Op.iLike]: `%${search}%`
            }
        }
    }
    const cities = await models.City.findAndCountAll(options)
    return {
        data: cities.rows,
        total: cities.count,
    }
}

export async function getCity(cityId) {
    const city = await models.City.findOne({
        where: {
            id: cityId,
            status: { [Op.ne]: 0 }
        }
    })
    if (!city) cityNotExist(cityId)
    return city
}

export async function createCity({
    name,
}, updatedBy) {
    const newCity = await models.City.create({
        name,
        updatedBy
    })

    if (!newCity) throw new Error('Error al crear la ciudad')
    return newCity
}

export async function deleteCity(cityId, updatedBy) {
    const city = await models.City.findOne({
        where: {
            id: cityId,
            status: { [Op.ne]: 0 }
        }
    })
    if (!city) cityNotExist(cityId)

    await city.update({
        status: 0,
        updatedBy
    })

    return 'Ciudad eliminada con éxito'
}

export async function updateCity(cityId, city, updatedBy) {
    let cityResponse
    const {
        name,
    } = city
    const cityDB = await models.City.findOne({
        where: {
            id: cityId,
            status: {
                [Op.ne]: 0
            }
        }
    })
    if (!cityDB) return cityNotExist(cityId)

    await cityDB.update({
        name,
        updatedBy
    })

    cityResponse = await models.City.findOne({
        where: {
            id: cityId,
            status: { [Op.ne]: 0 }
        }
    })

    return cityResponse
}


export const findCity = async (cityId) => {
    const city = await models.City.findOne({
        where: {
            id: cityId,
            status: { [Op.ne]: 0 }
        }
    })

    if (!city) {
        cityNotExist(cityId)
    }

    return city
}


function cityNotExist(cityId) {
    throw new Error(`La ciudad con id: ${cityId} no existe`)
}
