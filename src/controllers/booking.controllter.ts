import { NextFunction, Request, Response } from 'express'
import { TokenPayLoad } from '~/models/request/User.request'
import { bookingService } from '~/services/booking.service'

export const createBookingController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_access_token as TokenPayLoad
  const result = await bookingService.createBooking({ ...req.body, user_id })
  return res.json({ message: 'Create booking success', result })
}

export const getAllUserBookingController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_access_token as TokenPayLoad
  const result = await bookingService.getAllUserBooking(user_id)
  return res.json({ message: 'Get all booking success', result })
}

export const getAllPartnerBookingController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_access_token as TokenPayLoad
  const { key } = req.params
  const result = await bookingService.getAllPartnerBooking(user_id, key)
  return res.json({ message: 'Get all booking success', result })
}

export const updateBookingController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const result = await bookingService.updateBooking(req.body.status, id)
  return res.json({ message: 'Update booking success', result })
}
export const updateStatusBookingController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const result = await bookingService.updateStatusBooking(id, req.body.status)
  return res.json({ message: 'Update booking success', result })
}
