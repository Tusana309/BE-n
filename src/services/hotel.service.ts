import { Hotel } from '~/models/schemas/Hotel.schema'
import { databaseService } from './databases.service'
import { HotelBody } from '~/models/request/Hotel.request'
import { ObjectId } from 'mongodb'
import { ErrorWithMessage } from '~/models/Error'

class HotelsService {
  async createHotel(payload: HotelBody) {
    const {
      description,
      hotel_facilities,
      hotel_img,
      hotel_name,
      location,
      number_of_room,
      price,
      total_of_room,
      user_id
    } = payload
    const user = await databaseService.user.findOne({ _id: new ObjectId(user_id) })
    if (!user) {
      throw new ErrorWithMessage({ message: 'User not found', status: 404 })
    }
    if (user.hotel_id) {
      throw new ErrorWithMessage({ message: 'User already have a hotel', status: 400 })
    }
    const result = await databaseService.hotel.insertOne(
      new Hotel({
        description,
        hotel_facilities,
        hotel_img,
        hotel_name,
        location,
        number_of_room,
        price,
        total_of_room: +payload.total_of_room,
        user_id
      })
    )
    databaseService.user.findOneAndUpdate(
      { _id: new ObjectId(user_id) },
      { $set: { hotel_id: String(result.insertedId) } }
    )
    return result
  }

  async getAllHotel(id: string) {
    const result = await databaseService.hotel
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id)
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $addFields: {
            user: {
              $arrayElemAt: ['$user', 0]
            }
          }
        }
      ])
      .toArray()
    return result
  }

  async updateHotel(id: string, payload: Omit<HotelBody, 'user_id'>) {
    const result = await databaseService.hotel.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...payload,
          total_of_room: +payload.total_of_room
        }
      }
    )
    return result
  }

  async deleteHotel(id: string) {
    const result = await databaseService.hotel.deleteOne({ _id: new ObjectId(id) })
    return result
  }

  async searchHotel(key: string) {
    const regexSearch = String(new RegExp(key))
    const result = await databaseService.hotel
      .find({
        $text: { $search: regexSearch }
      })
      .toArray()
    return result
  }
}

export const hotelsService = new HotelsService()
