import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb'
import { Bus } from '~/models/schemas/Bus.schema'
import Conversation from '~/models/schemas/Conversation.schema'
import { Hotel } from '~/models/schemas/Hotel.schema'
import { Location } from '~/models/schemas/Location.schema'
import { Medias } from '~/models/schemas/Media.schema'
import { Review } from '~/models/schemas/Review.schema'
import { Transportation } from '~/models/schemas/Transportation.schema'
import { User } from '~/models/schemas/User.schema'
import { Booking } from '~/models/schemas/UserHotel.schema'

const uri = `mongodb+srv://Project:CGrNrPnL2DbF5QZ6@cluster0.vp0j8zy.mongodb.net/Travelocal`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db('traveloka-db')
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error)
    }
  }

  get user(): Collection<User> {
    return this.db.collection('users')
  }
  get hotel(): Collection<Hotel> {
    return this.db.collection('hotels')
  }
  get bus(): Collection<Bus> {
    return this.db.collection('buses')
  }
  get medias(): Collection<Medias> {
    return this.db.collection('medias')
  }
  get booking(): Collection<Booking> {
    return this.db.collection('bookings')
  }
  get location(): Collection<Location> {
    return this.db.collection('locations')
  }
  get transportation(): Collection<Transportation> {
    return this.db.collection('transportations')
  }
  get review(): Collection<Review> {
    return this.db.collection('review')
  }
  get conversations(): Collection<Conversation> {
    return this.db.collection('conversations')
  }
}
export const databaseService = new DatabaseService()
