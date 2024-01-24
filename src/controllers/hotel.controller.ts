import { NextFunction, Request, Response } from 'express'
import { TokenPayLoad } from '~/models/request/User.request'
import { hotelsService } from '~/services/hotel.service'

export const createHotelController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_access_token as TokenPayLoad
  const result = await hotelsService.createHotel({ ...req.body, user_id })
  return res.json({ message: 'Create hotel success', result })
}

export const getAllHotelController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await hotelsService.getAllHotel(req.params.id)

  return res.json({ message: 'Get all hotel success', result })
}

export const updateHotelController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await hotelsService.updateHotel(req.params.id, req.body)
  return res.json({ message: 'Edit hotel success', result })
}

export const deleteHotelController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await hotelsService.deleteHotel(req.params.id)
  return res.json({ message: 'Delete hotel success', result })
}

export const searchHotelController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await hotelsService.searchHotel(req.params.key)
  return res.json({ message: 'Search hotel success', result })
}
