import { ObjectId } from 'mongodb'
import { UserRoles } from '~/constant/enum'

interface BusType {
  _id?: ObjectId
  user_id: string
  car_name: string
  description: string
  location: string
  price: string
  number_of_car?: number
  total_of_car: number
  car_img: string
  // list_seater: number[]
  seater_number: number[]
  created_at?: Date
  updated_at?: Date
}
export class Bus {
  _id: ObjectId
  user_id: ObjectId
  car_name: string
  description: string
  location: string
  // list_seater: number[]
  price: string
  number_of_car: number
  total_of_car: number
  seater_number: number[]
  car_img: string
  created_at: Date
  updated_at: Date
  constructor(bus: BusType) {
    this._id = bus._id || new ObjectId()
    this.user_id = new ObjectId(bus.user_id)
    this.car_name = bus.car_name
    this.description = bus.description
    this.location = bus.location
    this.number_of_car = bus.number_of_car || 0
    this.price = bus.price
    this.seater_number = bus.seater_number
    // this.list_seater = bus.list_seater
    this.total_of_car = bus.total_of_car
    this.car_img = bus.car_img
    this.created_at = bus.created_at || new Date()
    this.updated_at = bus.updated_at || new Date()
  }
}
