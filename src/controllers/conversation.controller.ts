import { Request, Response } from 'express'
import { TokenPayLoad } from '~/models/request/User.request'
import conversationService from '~/services/conversation.service'

export const getConversationsController = async (req: Request, res: Response) => {
  const { receiver_id } = req.params
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const sender_id = req.decoded_access_token?.user_id as string
  const result = await conversationService.getConversations({
    sender_id,
    receiver_id,
    limit,
    page
  })
  return res.json({
    result: {
      limit,
      page,
      total_page: Math.ceil(result.total / limit),
      conversations: result.conversations
    },
    message: 'Get conversations successfully'
  })
}
export const getAllMembersController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_access_token as TokenPayLoad
  const result = await conversationService.getAllMembers(user_id)
  return res.json({
    message: 'Get conversations successfully',
    result
  })
}
