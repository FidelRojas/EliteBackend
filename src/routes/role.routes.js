import { Router } from 'express'

import * as rolesController from '../controllers/roles.controller'
const router = Router()

router.get('/', rolesController.getRoles)

export default router
