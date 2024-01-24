import { Review } from '~/models/schemas/Review.schema'
import { databaseService } from './databases.service'
import { ObjectId } from 'mongodb'

class ReviewService {
  async review({ comment, user_id, post_id }: { comment: string; user_id: string; post_id: string }) {
    const review = await databaseService.review.insertOne(new Review({ user_id, comment, post_id }))
    return review
  }
  async search(key: string) {
    const regexSearch = String(new RegExp(key))
    const result1 = databaseService.transportation
      .find({
        $text: { $search: regexSearch }
      })
      .toArray()
    const result2 = databaseService.location
      .find({
        $text: { $search: regexSearch }
      })
      .toArray()
    const result3 = databaseService.hotel
      .find({
        $text: { $search: regexSearch }
      })
      .toArray()
    const result4 = databaseService.bus
      .find({
        $text: { $search: regexSearch }
      })
      .toArray()
    const result = await Promise.all([result1, result2, result3, result4])
    return result
  }
  async getReview(id: string) {
    const review = await databaseService.review
      .aggregate([
        {
          $match: {
            post_id: new ObjectId(id)
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
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
    return review
  }
}
export const reviewService = new ReviewService()
