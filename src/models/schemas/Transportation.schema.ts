import { ObjectId } from 'mongodb'
import { UserRoles } from '~/constant/enum'

interface TransportationType {
  _id?: ObjectId
  user_id: string
  tranportation_name: string
  description: string
  location: string
  price: string
  number_of_vehicle?: number
  total_of_vehicle: number
  car_vehicle: string
  created_at?: Date
  updated_at?: Date
}
export class Transportation {
  _id: ObjectId
  user_id: ObjectId
  tranportation_name: string
  description: string
  location: string
  price: string
  number_of_vehicle: number
  total_of_vehicle: number
  car_vehicle: string
  created_at: Date
  updated_at: Date
  constructor(tranportation: TransportationType) {
    this._id = tranportation._id || new ObjectId()
    this.user_id = new ObjectId(tranportation.user_id)
    this.tranportation_name = tranportation.tranportation_name
    this.description = tranportation.description
    this.location = tranportation.location
    this.number_of_vehicle = tranportation.number_of_vehicle || 0
    this.price = tranportation.price
    this.total_of_vehicle = tranportation.total_of_vehicle
    this.car_vehicle = tranportation.car_vehicle
    this.created_at = tranportation.created_at || new Date()
    this.updated_at = tranportation.updated_at || new Date()
  }
}
