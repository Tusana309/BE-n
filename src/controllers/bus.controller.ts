import { NextFunction, Request, Response } from 'express'
import { TokenPayLoad } from '~/models/request/User.request'
import { busService } from '~/services/bus.service'

export const createBusController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_access_token as TokenPayLoad
  const result = await busService.createBus({ ...req.body, user_id })
  return res.json({ message: 'Create bus success', result })
}

export const getAllBusController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await busService.getAllBus(req.params.id)
  return res.json({ message: 'Get all bus success', result })
}

export const updateBusController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await busService.updateBus(req.params.id, req.body)
  return res.json({ message: 'Edit bus success', result })
}
export const searchCarController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await busService.searchBus(req.params.key, req.body.seater_number)
  return res.json({ message: 'Search bus success', result })
}
