export interface BusBody {
  user_id: string
  car_name: string
  description: string
  location: string
  price: string
  number_of_car?: number
  total_of_car: number
  // list_seater: number[]
  car_img: string
  seater_number: number[]
}
