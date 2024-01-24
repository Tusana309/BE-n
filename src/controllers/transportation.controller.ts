import { NextFunction, Request, Response } from 'express'
import { TokenPayLoad } from '~/models/request/User.request'
import { transportationService } from '~/services/transportation.service'

export const createtransportatitionController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_access_token as TokenPayLoad
  const result = await transportationService.createTransportation({ ...req.body, user_id })
  return res.json({ message: 'Create transportation success', result })
}

export const getAlltransportatitionController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await transportationService.getAllTransportation(req.params.id)
  return res.json({ message: 'Get all transportation success', result })
}

export const updatetransportatitionController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const result = await transportationService.updateTransportation(id, req.body)
  return res.json({ message: 'Update transportation success', result })
}

export const searchTransportationController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await transportationService.searchTransportation(req.params.key)
  return res.json({ message: 'Search transportation success', result })
}
