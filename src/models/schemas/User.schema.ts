import { ObjectId } from 'mongodb'
import { UserField, UserRoles } from '~/constant/enum'

interface UserType {
  _id?: ObjectId
  username: string
  email: string
  password: string
  full_name: string
  phone: string
  address: string
  role?: UserRoles
  field?: UserField
  account_number?: string
  account_name?: string
  bank_name?: string
  qr_img?: string
  hotel_id?: string
  location_id?: string
  car_id?: string
  transportation_id?: string
  created_at?: Date
  updated_at?: Date
}
export class User {
  _id: ObjectId
  username: string
  email: string
  full_name: string
  phone: string
  address: string
  password: string
  role: UserRoles
  field: UserField
  account_number: string
  account_name: string
  bank_name: string
  qr_img: string
  hotel_id: string
  location_id: string
  car_id: string
  transportation_id: string
  created_at: Date
  updated_at: Date
  constructor(user: UserType) {
    this._id = user._id || new ObjectId()
    this.username = user.username
    this.full_name = user.full_name
    this.phone = user.phone
    this.address = user.address
    this.email = user.email
    this.password = user.password
    this.role = user.role || UserRoles.User
    this.field = user.field || UserField.default
    this.account_number = user.account_number || ''
    this.account_name = user.account_name || ''
    this.bank_name = user.bank_name || ''
    this.qr_img = user.qr_img || ''
    this.hotel_id = ''
    this.location_id = ''
    this.car_id = ''
    this.transportation_id = ''
    this.created_at = user.created_at || new Date()
    this.updated_at = user.updated_at || new Date()
  }
}
