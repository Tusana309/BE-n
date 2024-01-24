import { LocationBody } from '~/models/request/Location.request'
import { databaseService } from './databases.service'
import { Location } from '~/models/schemas/Location.schema'
import { ObjectId } from 'mongodb'
import { ErrorWithMessage } from '~/models/Error'

class LocationService {
  async createLocation(payload: LocationBody) {
    const { user_id } = payload
    const user = await databaseService.user.findOne({ _id: new ObjectId(user_id) })
    if (!user) {
      throw new ErrorWithMessage({ message: 'User not found', status: 404 })
    }
    if (user.location_id) {
      throw new ErrorWithMessage({ message: 'User already have a location', status: 400 })
    }
    const result = await databaseService.location.insertOne(
      new Location({
        ...payload
      })
    )
    databaseService.user.findOneAndUpdate(
      { _id: new ObjectId(user_id) },
      { $set: { location_id: String(result.insertedId) } }
    )
    return result
  }
  async getAllLocation(id: string) {
    const result = await databaseService.location
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
  async updateLocation(id: string, payload: Omit<LocationBody, 'user_id'>) {
    console.log(payload)
    const result = await databaseService.location.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...payload,
          total_person: +payload.total_person
        }
      }
    )
    console.log(result)
    return result
  }
  async searchHotel(key: string) {
    const regexSearch = String(new RegExp(key))
    const result = await databaseService.location
      .find({
        $text: { $search: regexSearch }
      })
      .toArray()
    return result
  }
}
export const locationService = new LocationService()
