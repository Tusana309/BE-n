import { Router } from 'express'
import {
  createHotelController,
  deleteHotelController,
  getAllHotelController,
  searchHotelController,
  updateHotelController
} from '~/controllers/hotel.controller'
import { accessTokenValidator } from '~/middlewares/user.middleware'
import { wrapRequestHandler } from '~/utills/handlers'

const hotelsRouter = Router()

hotelsRouter.post('/', accessTokenValidator, wrapRequestHandler(createHotelController))
hotelsRouter.get('/:id', wrapRequestHandler(getAllHotelController))
hotelsRouter.put('/:id', accessTokenValidator, wrapRequestHandler(updateHotelController))
hotelsRouter.delete('/:id', wrapRequestHandler(deleteHotelController))
hotelsRouter.get('/search/:key', wrapRequestHandler(searchHotelController))
// usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
export default hotelsRouter
