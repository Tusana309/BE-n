import { Router } from 'express'
import { createBusController, getAllBusController, updateBusController } from '~/controllers/bus.controller'
import {
  createtransportatitionController,
  getAlltransportatitionController,
  searchTransportationController,
  updatetransportatitionController
} from '~/controllers/transportation.controller'
import { accessTokenValidator } from '~/middlewares/user.middleware'
import { wrapRequestHandler } from '~/utills/handlers'

const transportatitionRouter = Router()

// create ticket bus
transportatitionRouter.post('/', accessTokenValidator, wrapRequestHandler(createtransportatitionController))
transportatitionRouter.get('/:id', wrapRequestHandler(getAlltransportatitionController))
transportatitionRouter.put('/:id', accessTokenValidator, wrapRequestHandler(updatetransportatitionController))
transportatitionRouter.get('/search/:key', wrapRequestHandler(searchTransportationController))
// transportatitionRouter.delete('/:id', wrapRequestHandler(deleteHotelController))s
export default transportatitionRouter
