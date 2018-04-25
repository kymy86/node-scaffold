import {Router} from 'express'
import * as controller from './test.controller'

const router = new Router()

router.get('/', controller.index)
router.get('/:id', controller.get)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.remove)


export default router;