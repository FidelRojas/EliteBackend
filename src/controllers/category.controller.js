import * as categorieservice from '../services/category.service'
import { getUpdatedByFromReq } from '../utils/user'

export async function getCategories(req, res, next) {
    try {
        const { query } = req
        const resp = await categorieservice.getCategories(query)
        res.json(resp)
    } catch (error) {
        catchError(next, error)
    }
}

export async function getCategory(req, res, next) {
    try {
        const { categoryId } = req.params
        res.json({
            data: await categorieservice.getCategory(categoryId)
        })
    } catch (error) {
        catchError(next, error)
    }
}

export async function createCategory(req, res, next) {
    try {
        return res.json({
            message: 'Categoria creada con éxito',
            data: await categorieservice.createCategory(req.body, getUpdatedByFromReq(req))
        })
    } catch (error) {
        catchError(next, error)
    }
}

export async function deleteCategory(req, res, next) {
    try {
        const { categoryId } = req.params
        return res.json({
            message: await categorieservice.deleteCategory(categoryId, getUpdatedByFromReq(req))
        })
    } catch (error) {
        catchError(next, error)
    }
}

export async function updateCategory(req, res, next) {
    try {
        const { categoryId } = req.params
        const category = await categorieservice.updateCategory(categoryId, req.body, getUpdatedByFromReq(req))
        return res.json({
            message: 'Categoria editada con éxito',
            data: category
        })
    } catch (error) {
        catchError(next, error)
    }
}

function catchError(next, error) {
    next(error)
}
