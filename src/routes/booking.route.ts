import { Router } from 'express'
import {
  createBookingController,
  getAllPartnerBookingController,
  getAllUserBookingController,
  updateBookingController,
  updateStatusBookingController
} from '~/controllers/booking.controllter'
import { accessTokenValidator, accessTokenValidatorPost } from '~/middlewares/user.middleware'
import { wrapRequestHandler } from '~/utills/handlers'

const bookingRouter = Router()

bookingRouter.post('/', accessTokenValidatorPost, wrapRequestHandler(createBookingController))
bookingRouter.get('/', accessTokenValidator, wrapRequestHandler(getAllUserBookingController))
bookingRouter.get('/partner/:key', accessTokenValidator, wrapRequestHandler(getAllPartnerBookingController))
bookingRouter.put('/:id', accessTokenValidator, wrapRequestHandler(updateBookingController))
bookingRouter.put('/status/:id', wrapRequestHandler(updateStatusBookingController))
export default bookingRouter
