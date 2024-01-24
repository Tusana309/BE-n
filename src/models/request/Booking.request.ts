export interface BookingBody {
  user_id: string
  hotel_id?: string
  car_id?: string
  location_id?: string
  transportation_id?: string
  date_pick: number
  timeOrder?: number
  timeBack?: number
}
