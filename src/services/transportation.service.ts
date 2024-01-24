import { TransportationBody } from '~/models/request/transportation.request'
import { databaseService } from './databases.service'
import { Transportation } from '~/models/schemas/Transportation.schema'
import { ObjectId } from 'mongodb'
import { ErrorWithMessage } from '~/models/Error'

class TransportationService {
  async createTransportation(payload: TransportationBody) {
    const { user_id } = payload
    const user = await databaseService.user.findOne({ _id: new ObjectId(user_id) })
    if (!user) {
      throw new ErrorWithMessage({ message: 'User not found', status: 404 })
    }
    if (user.transportation_id) {
      throw new ErrorWithMessage({ message: 'User already have a transportation', status: 400 })
    }
    const result = await databaseService.transportation.insertOne(
      new Transportation({
        ...payload
      })
    )
    databaseService.user.findOneAndUpdate(
      { _id: new ObjectId(user_id) },
      { $set: { transportation_id: String(result.insertedId) } }
    )
    return result
  }
  async getAllTransportation(id: string) {
    const result = await databaseService.transportation
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
  async updateTransportation(id: string, payload: Omit<TransportationBody, 'user_id'>) {
    const result = await databaseService.transportation.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...payload
        }
      },
      {
        returnDocument: 'after'
      }
    )
    return result
  }
  async searchTransportation(key: string) {
    const regexSearch = String(new RegExp(key))
    const result = await databaseService.transportation
      .find({
        $text: { $search: regexSearch }
      })
      .toArray()
    return result
  }
}
export const transportationService = new TransportationService()
