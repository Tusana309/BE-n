import { NextFunction, Request, Response } from 'express'
import { TokenPayLoad } from '~/models/request/User.request'
import { reviewService } from '~/services/review.service'

export const reviewController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_access_token as TokenPayLoad
  const result = await reviewService.review({ comment: req.body.comment, user_id, post_id: req.body.post_id })
  return res.json({ message: 'Create review success', result })
}
export const searchController = async (req: Request, res: Response, next: NextFunction) => {
  const { key } = req.params
  const result = await reviewService.search(key)
  return res.json({ message: 'Search review success', result })
}
export const getReviewController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const result = await reviewService.getReview(id)
  return res.json({ message: 'Get review success', result })
}
