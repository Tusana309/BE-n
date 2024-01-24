import { Bus } from '~/models/schemas/Bus.schema'
import { databaseService } from './databases.service'
import { BusBody } from '~/models/request/Bus.request'
import { ObjectId } from 'mongodb'
import { ErrorWithMessage } from '~/models/Error'

class BusService {
  async createBus(payload: BusBody) {
    const { user_id } = payload
    const user = await databaseService.user.findOne({ _id: new ObjectId(user_id) })
    if (!user) {
      throw new ErrorWithMessage({ message: 'User not found', status: 404 })
    }
    if (user.car_id) {
      throw new ErrorWithMessage({ message: 'User already have a car', status: 400 })
    }
    const result = await databaseService.bus.insertOne(
      new Bus({
        ...payload
      })
    )
    databaseService.user.findOneAndUpdate(
      { _id: new ObjectId(user_id) },
      { $set: { car_id: String(result.insertedId) } }
    )
    return result
  }

  async getAllBus(id: string) {
    const result = await databaseService.bus
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

  async updateBus(id: string, payload: Omit<BusBody, 'user_id'>) {
    const result = await databaseService.bus.findOneAndUpdate(
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
  async searchBus(key: string, seater_number: string) {
    const regexSearch = String(new RegExp(key))
    const result = await databaseService.bus
      .find({
        $text: { $search: regexSearch },
        // seater_number: { $eq: Number(seater_number) },
        seater_number: { $elemMatch: { $eq: Number(seater_number) } }
      })
      .toArray()
    // const results = result.filter((item) => item.seater_number === seater_number)
    return result
  }
}

export const busService = new BusService()
