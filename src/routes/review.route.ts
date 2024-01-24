import { Router } from 'express'
import { getReviewController, reviewController, searchController } from '~/controllers/review.controller'
import { accessTokenValidator } from '~/middlewares/user.middleware'
import { wrapRequestHandler } from '~/utills/handlers'
const reviewRouter = Router()
reviewRouter.post('/', accessTokenValidator, wrapRequestHandler(reviewController))
reviewRouter.get('/:key', wrapRequestHandler(searchController))
reviewRouter.get('/search/:id', wrapRequestHandler(getReviewController))
export default reviewRouter
