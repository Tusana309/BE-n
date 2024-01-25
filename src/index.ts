import express, { NextFunction, Request, Response } from 'express'
import { databaseService } from './services/databases.service'
import usersRouter from './routes/user.route'
import { ErrorWithMessage } from './models/Error'
import cors from 'cors'
import hotelsRouter from './routes/hotel.route'
import mediaRouter from './routes/media.route'
import { initFolder, upload_dir } from './utills/file'
import bookingRouter from './routes/booking.route'
import locationRouter from './routes/location.route'
import transportatitionRouter from './routes/transportation.route'
import bussRouter from './routes/bus.route'
import reviewRouter from './routes/review.route'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { ObjectId } from 'mongodb'
import Conversation from './models/schemas/Conversation.schema'
import conversationsRouter from './routes/conversation.route'
const app = express()
const httpServer = createServer(app)
const port = process.env.PORT || 8080
databaseService.connect().catch(console.dir)
app.use(
  cors({
    origin: '*'
  })
)
app.use(express.json())
app.use('/users', usersRouter)
app.use('/hotels', hotelsRouter)
app.use('/location', locationRouter)
app.use('/medias', mediaRouter)
app.use('/transportation', transportatitionRouter)
app.use('/booking', bookingRouter)
app.use('/car', bussRouter)
app.use('/review', reviewRouter)
app.use('/conversations', conversationsRouter)
app.use('/static', express.static(upload_dir))
// app.use('/invoices', invoiceRoute)
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

initFolder()
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorWithMessage) {
    return res.status(err.status).json(err)
  }
  res.status(500).json({
    message: err.message,
    errorInfo: err
  })
})
const users: {
  [key: string]: {
    socket_id: string
  }
} = {}
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log(`user ${socket.id} connected`)
  const user_id = socket.handshake.auth._id
  users[user_id] = {
    socket_id: socket.id
  }
  console.log(users)
  socket.on('send_message', async (data) => {
    const { receiver_id, sender_id, content } = data.payload
    const receiver_socket_id = users[receiver_id]?.socket_id
    if (!receiver_socket_id) {
      return
    }
    const conversation = new Conversation({
      sender_id: new ObjectId(sender_id),
      receiver_id: new ObjectId(receiver_id),
      content: content
    })
    console.log(conversation, 'conversation')
    const result = await databaseService.conversations.insertOne(conversation)
    conversation._id = result.insertedId
    socket.to(receiver_socket_id).emit('receive_message', {
      payload: conversation
    })
  })
  socket.on('disconnect', () => {
    delete users[user_id]
    console.log(`user ${socket.id} disconnected`)
    console.log(users)
  })
})
httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
