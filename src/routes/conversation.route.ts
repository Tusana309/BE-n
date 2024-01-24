import { Router } from 'express'
import { getAllMembersController, getConversationsController } from '~/controllers/conversation.controller'
import { accessTokenValidator } from '~/middlewares/user.middleware'

const conversationsRouter = Router()

conversationsRouter.get('/receivers/:receiver_id', accessTokenValidator, getConversationsController)
conversationsRouter.get('/', accessTokenValidator, getAllMembersController)
export default conversationsRouter
