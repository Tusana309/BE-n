import { Request, Response, Router } from 'express'
import { getMeController, getUserController, loginController, registerController } from '~/controllers/user.controller'
import { accessTokenValidator, loginValidator, registerValidator } from '~/middlewares/user.middleware'
import { wrapRequestHandler } from '~/utills/handlers'

const usersRouter = Router()

usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
usersRouter.get('/', accessTokenValidator, wrapRequestHandler(getMeController))
usersRouter.get('/:id', wrapRequestHandler(getUserController))
usersRouter.post('/logout', (req: Request, res: Response) => {
  res.json({ message: 'Log out success' })
})
export default usersRouter
