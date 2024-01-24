import { ObjectId } from 'mongodb'
import { UserRoles } from '~/constant/enum'

interface ReviewType {
  _id?: ObjectId
  user_id: string
  comment: string
  post_id: string
  created_at?: Date
  updated_at?: Date
}
export class Review {
  _id: ObjectId
  user_id: ObjectId
  post_id: ObjectId
  comment: string
  created_at: Date
  updated_at: Date
  constructor(review: ReviewType) {
    this._id = review._id || new ObjectId()
    this.user_id = new ObjectId(review.user_id)
    this.post_id = new ObjectId(review.post_id)
    this.comment = review.comment
    this.created_at = review.created_at || new Date()
    this.updated_at = review.updated_at || new Date()
  }
}
