import { ObjectId } from 'mongodb'
import { UserRoles } from '~/constant/enum'

interface LocationType {
  _id?: ObjectId
  user_id: string
  location_name: string
  location: string
  price: string
  description: string
  location_img: string
  total_person: number
  number_person?: number
  created_at?: Date
  updated_at?: Date
}
export class Location {
  _id: ObjectId
  user_id: ObjectId
  location_name: string
  location: string
  price: string
  description: string
  location_img: string
  total_person: number
  number_person: number
  created_at: Date
  updated_at: Date
  constructor(location: LocationType) {
    this._id = location._id || new ObjectId()
    this.user_id = new ObjectId(location.user_id)
    this.location_name = location.location_name
    this.description = location.description
    this.location = location.location
    this.location_img = location.location_img
    this.price = location.price
    this.total_person = location.total_person
    this.number_person = location.number_person || 0
    this.created_at = location.created_at || new Date()
    this.updated_at = location.updated_at || new Date()
  }
}
