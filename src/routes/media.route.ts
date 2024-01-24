import { Router } from 'express'
import { uploadImagesController } from '~/controllers/media.controller'
import { accessTokenValidator } from '~/middlewares/user.middleware'
import { wrapRequestHandler } from '~/utills/handlers'
const mediaRouter = Router()
mediaRouter.post('/images', wrapRequestHandler(uploadImagesController))
export default mediaRouter
