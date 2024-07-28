const models = require('../database/models/index')
const { Op } = require('sequelize')

export async function getCategories(query) {
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
        options.where = {
            ...options.where, [searchBy]: {
                [Op.iLike]: `%${search}%`
            }
        }
    }
    const categories = await models.Category.findAndCountAll(options)
    return {
        data: categories.rows,
        total: categories.count,
    }
}

export async function getCategory(categoryId) {
    const category = await models.Category.findOne({
        where: {
            id: categoryId,
            status: { [Op.ne]: 0 }
        }
    })
    if (!category) categoryNotExist(categoryId)
    return category
}

export async function createCategory({
    name,
}, updatedBy) {
    const newCategory = await models.Category.create({
        name,
        updatedBy
    })

    if (!newCategory) throw new Error('Error al crear la categoria')
    return newCategory
}

export async function deleteCategory(categoryId, updatedBy) {
    const category = await models.Category.findOne({
        where: {
            id: categoryId,
            status: { [Op.ne]: 0 }
        }
    })
    if (!category) categoryNotExist(categoryId)

    await category.update({
        status: 0,
        updatedBy
    })

    return 'Categoria eliminada con éxito'
}

export async function updateCategory(categoryId, category, updatedBy) {
    let categoryResponse
    const {
        name,
    } = category
    const categoryDB = await models.Category.findOne({
        where: {
            id: categoryId,
            status: {
                [Op.ne]: 0
            }
        }
    })
    if (!categoryDB) return categoryNotExist(categoryId)

    await categoryDB.update({
        name,
        updatedBy
    })

    categoryResponse = await models.Category.findOne({
        where: {
            id: categoryId,
            status: { [Op.ne]: 0 }
        }
    })

    return categoryResponse
}


export const findCategory = async (categoryId) => {
    const category = await models.Category.findOne({
        where: {
            id: categoryId,
            status: { [Op.ne]: 0 }
        }
    })

    if (!category) {
        categoryNotExist(categoryId)
    }

    return category
}


function categoryNotExist(categoryId) {
    throw new Error(`La categoria con id: ${categoryId} no existe`)
}
