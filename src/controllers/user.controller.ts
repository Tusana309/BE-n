import { NextFunction, Request, Response } from 'express'
import { User } from '~/models/schemas/User.schema'
import { usersService } from '~/services/user.service'
import { ParamsDictionary } from 'express-serve-static-core'
import { TokenPayLoad } from '~/models/request/User.request'

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await usersService.register(req.body)
  return res.json({ message: 'Register success', result })
}

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User
  const user_id = user._id
  const result = await usersService.login({ user_id: user_id.toString() as string })
  return res.json({ message: 'Login success', result })
}
export const getMeController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_access_token as TokenPayLoad
  const result = await usersService.getMe(user_id)
  return res.json({ message: 'Get me success', result })
}
export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  console.log(id)
  const result = await usersService.getUser(id)
  return res.json({ message: 'Get me success', result })
}
export const getAllUserController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await usersService.getAllUser()
  return res.json({ message: 'Get all user success', result })
}

export const getUserByIdController = async (req: Request<ParamsDictionary>, res: Response, next: NextFunction) => {
  const result = await usersService.getUserById(req.params.id)
  return res.json({ message: 'Get user success', result })
}

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await usersService.updateUser(req.params.id, req.body)
  return res.json({ message: 'Edit user success', result })
}

export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await usersService.deleteUser(req.params.id)
  return res.json({ message: 'Delete user success', result })
}
