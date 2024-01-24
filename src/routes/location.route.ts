import { Router } from 'express'
import { createBusController, getAllBusController, updateBusController } from '~/controllers/bus.controller'
import {
  createLocationController,
  getAllLocationController,
  searchLocationController,
  updateLocationController
} from '~/controllers/location.controller'
import { accessTokenValidator } from '~/middlewares/user.middleware'
import { wrapRequestHandler } from '~/utills/handlers'

const locationRouter = Router()

// create ticket bus
locationRouter.post('/', accessTokenValidator, wrapRequestHandler(createLocationController))
locationRouter.get('/:id', wrapRequestHandler(getAllLocationController))
locationRouter.put('/:id', accessTokenValidator, wrapRequestHandler(updateLocationController))
locationRouter.get('/search/:key', wrapRequestHandler(searchLocationController))
// locationRouter.delete('/:id', wrapRequestHandler(deleteHotelController))s
export default locationRouter
