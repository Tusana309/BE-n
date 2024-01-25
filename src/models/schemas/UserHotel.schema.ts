import { ObjectId } from 'mongodb'
import { HotelStatus, UserRoles } from '~/constant/enum'

interface BookingType {
  _id?: ObjectId
  user_id: ObjectId
  hotel_id?: string
  car_id?: string
  location_id?: string
  transportation_id?: string
  date_pick: number
  time_start?: number
  code: string
  timeOrder?: number
  timeBack?: number
  numberRoom?: number
  status?: HotelStatus
  auto_drive?: boolean
  seater?: string
  location?: string
  tour_day?: number
  amount_human?: number
  name?: string
  created_at?: Date
  updated_at?: Date
}
export class Booking {
  _id: ObjectId
  user_id: ObjectId
  hotel_id: string
  car_id: string
  location_id: string
  time_start: number
  transportation_id: string
  date_pick: number
  status: HotelStatus
  auto_drive: boolean
  seater: string
  timeOrder: number
  timeBack: number
  numberRoom?: number
  location: string
  tour_day: number
  name: string
  amount_human: number
  code: string
  created_at: Date
  updated_at: Date
  constructor(booking: BookingType) {
    this._id = booking._id || new ObjectId()
    this.user_id = booking.user_id
    this.hotel_id = booking.hotel_id || ''
    this.car_id = booking.car_id || ''
    this.code = booking.code
    this.time_start = booking.time_start || 0
    this.location_id = booking.location_id || ''
    this.transportation_id = booking.transportation_id || ''
    this.date_pick = booking.date_pick
    this.timeOrder = booking.timeOrder || 0
    this.timeBack = booking.timeBack || 0
    this.numberRoom = booking.numberRoom || 0
    this.name = booking.name || ''
    this.location = booking.location || ''
    this.tour_day = booking.tour_day || 0
    this.amount_human = booking.amount_human || 0
    this.auto_drive = booking.auto_drive || false
    this.seater = booking.seater || '0'
    this.status = HotelStatus.default
    this.created_at = booking.created_at || new Date()
    this.updated_at = booking.updated_at || new Date()
  }
}
