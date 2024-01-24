import { NextFunction, Request, Response } from 'express'
import { TokenPayLoad } from '~/models/request/User.request'
import { locationService } from '~/services/location.service'

export const createLocationController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_access_token as TokenPayLoad
  const result = await locationService.createLocation({ ...req.body, user_id })
  return res.json({ message: 'Create location success', result })
}

export const getAllLocationController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await locationService.getAllLocation(req.params.id)
  return res.json({ message: 'Get all location success', result })
}

export const updateLocationController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  console.log(id)
  const result = await locationService.updateLocation(id, req.body)
  return res.json({ message: 'Update location success', result })
}
export const searchLocationController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await locationService.searchHotel(req.params.key)
  return res.json({ message: 'Search location success', result })
}
