import { Router } from 'express'
import {
  createBusController,
  getAllBusController,
  searchCarController,
  updateBusController
} from '~/controllers/bus.controller'
import { accessTokenValidator } from '~/middlewares/user.middleware'
import { wrapRequestHandler } from '~/utills/handlers'

const bussRouter = Router()

// create ticket bus
bussRouter.post('/', accessTokenValidator, wrapRequestHandler(createBusController))
bussRouter.get('/:id', wrapRequestHandler(getAllBusController))
bussRouter.put('/:id', accessTokenValidator, wrapRequestHandler(updateBusController))
bussRouter.post('/search/:key', wrapRequestHandler(searchCarController))

// bussRouter.delete('/:id', wrapRequestHandler(deleteHotelController))s
export default bussRouter
