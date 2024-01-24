import { ObjectId } from 'mongodb'
import { UserRoles } from '~/constant/enum'

interface HotelType {
  _id?: ObjectId
  user_id: string
  hotel_name: string
  hotel_img: string
  location: string
  price: string
  number_of_room?: number
  total_of_room: number
  description: string
  hotel_facilities: string
  created_at?: Date
  updated_at?: Date
}
export class Hotel {
  _id: ObjectId
  user_id: ObjectId
  hotel_name: string
  hotel_img: string
  location: string
  price: string
  number_of_room: number
  total_of_room: number
  description: string
  hotel_facilities: string
  created_at: Date
  updated_at: Date
  constructor(hotel: HotelType) {
    this._id = hotel._id || new ObjectId()
    this.user_id = new ObjectId(hotel.user_id)
    this.hotel_name = hotel.hotel_name
    this.hotel_img = hotel.hotel_img
    this.location = hotel.location
    this.number_of_room = hotel.number_of_room || 0
    this.price = hotel.price
    this.total_of_room = hotel.total_of_room
    this.description = hotel.description
    this.hotel_facilities = hotel.hotel_facilities
    this.created_at = hotel.created_at || new Date()
    this.updated_at = hotel.updated_at || new Date()
  }
}
