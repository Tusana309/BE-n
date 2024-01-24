import { ObjectId } from 'mongodb'
import { databaseService } from './databases.service'

class ConversationService {
  async getConversations({
    sender_id,
    receiver_id,
    limit,
    page
  }: {
    sender_id: string
    receiver_id: string
    limit: number
    page: number
  }) {
    const match = {
      $or: [
        {
          sender_id: new ObjectId(sender_id),
          receiver_id: new ObjectId(receiver_id)
        },
        {
          sender_id: new ObjectId(receiver_id),
          receiver_id: new ObjectId(sender_id)
        }
      ]
    }
    const conversations = await databaseService.conversations
      .find(match)
      .skip(limit * (page - 1))
      .limit(limit)
      .toArray()
    const total = await databaseService.conversations.countDocuments(match)
    return {
      conversations,
      total
    }
  }
  async getAllMembers(user_id: string) {
    const conversation = await databaseService.conversations
      .aggregate([
        {
          $match: {
            $or: [
              {
                sender_id: new ObjectId(user_id)
              },
              {
                receiver_id: new ObjectId(user_id)
              }
            ]
          }
        },
        {
          $sort: {
            created_at: -1 // Sắp xếp theo thứ tự giảm dần (tức là người gửi sau xuất hiện đầu tiên)
          }
        },
        {
          $group: {
            _id: null,
            users: {
              $addToSet: {
                $cond: {
                  if: {
                    $eq: ['$sender_id', new ObjectId(user_id)]
                  },
                  then: '$receiver_id',
                  else: '$sender_id'
                }
              }
            }
          }
        },
        {
          $unwind: '$users'
        },
        {
          $project: {
            _id: 0,
            userId: '$users'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'result'
          }
        },
        {
          $addFields: {
            result: {
              $arrayElemAt: ['$result', 0]
            }
          }
        }
      ])
      .toArray()
    return conversation
  }
}
const conversationService = new ConversationService()
export default conversationService
