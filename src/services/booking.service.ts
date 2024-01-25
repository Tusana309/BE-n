import { BookingBody } from '~/models/request/Booking.request'
import { Booking } from '~/models/schemas/UserHotel.schema'
import { databaseService } from './databases.service'
import { ObjectId } from 'mongodb'
import { HotelStatus } from '~/constant/enum'
import { makeid } from '~/utills/utill'

class BookingService {
  async createBooking(payload: BookingBody) {
    const code = makeid(8)
    const result = await databaseService.booking.insertOne(
      new Booking({
        ...payload,
        user_id: new ObjectId(payload.user_id),
        code
      })
    )
    const booking = await databaseService.booking.findOne({
      _id: new ObjectId(result.insertedId)
    })
    return booking
  }

  async getAllUserBooking(id: string) {
    const result = await databaseService.booking
      .aggregate([
        {
          $match: {
            user_id: new ObjectId(id)
          }
        },
        {
          $addFields: {
            hotel_id: {
              $cond: {
                if: {
                  $ne: ['$hotel_id', '']
                },
                then: {
                  $toObjectId: '$hotel_id'
                },
                else: '$hotel_id'
              }
            },
            location_id: {
              $cond: {
                if: {
                  $ne: ['$location_id', '']
                },
                then: {
                  $toObjectId: '$location_id'
                },
                else: '$location_id'
              }
            },
            car_id: {
              $cond: {
                if: {
                  $ne: ['$car_id', '']
                },
                then: {
                  $toObjectId: '$car_id'
                },
                else: '$car_id'
              }
            },
            transportation_id: {
              $cond: {
                if: {
                  $ne: ['$transportation_id', '']
                },
                then: {
                  $toObjectId: '$transportation_id'
                },
                else: '$transportation_id'
              }
            }
          }
        },
        {
          $lookup: {
            from: 'hotels',
            localField: 'hotel_id',
            foreignField: '_id',
            as: 'hotels'
          }
        },
        {
          $lookup: {
            from: 'locations',
            localField: 'location_id',
            foreignField: '_id',
            as: 'locations'
          }
        },
        {
          $lookup: {
            from: 'transportations',
            localField: 'transportation_id',
            foreignField: '_id',
            as: 'transportations'
          }
        },
        {
          $lookup: {
            from: 'buses',
            localField: 'car_id',
            foreignField: '_id',
            as: 'cars'
          }
        },
        {
          $project: {
            _id: 1,
            user_id: 1,
            hotel_id: 1,
            car_id: 1,
            location_id: 1,
            transportation_id: 1,
            date_pick: 1,
            status: 1,
            created_at: 1,
            updated_at: 1,
            auto_drive: 1,
            numberRoom: 1,
            seater: 1,
            location: 1,
            tour_day: 1,
            amount_human: 1,
            code: 1,
            time_start: 1,
            timeBack: 1,
            timeOrder: 1,
            hotels: {
              $arrayElemAt: ['$hotels', 0]
            },
            locations: {
              $arrayElemAt: ['$locations', 0]
            },
            transportations: {
              $arrayElemAt: ['$transportations', 0]
            },
            cars: {
              $arrayElemAt: ['$cars', 0]
            }
          }
        }
      ])
      .toArray()
    return result
  }

  async getAllPartnerBooking(id: string, key: string) {
    if (key === 'hotels') {
      const result = await databaseService.booking
        .aggregate([
          {
            $addFields: {
              hotel_id: {
                $cond: {
                  if: {
                    $ne: ['$hotel_id', '']
                  },
                  then: {
                    $toObjectId: '$hotel_id'
                  },
                  else: '$hotel_id'
                }
              },
              location_id: {
                $cond: {
                  if: {
                    $ne: ['$location_id', '']
                  },
                  then: {
                    $toObjectId: '$location_id'
                  },
                  else: '$location_id'
                }
              },
              car_id: {
                $cond: {
                  if: {
                    $ne: ['$car_id', '']
                  },
                  then: {
                    $toObjectId: '$car_id'
                  },
                  else: '$car_id'
                }
              },
              transportation_id: {
                $cond: {
                  if: {
                    $ne: ['$transportation_id', '']
                  },
                  then: {
                    $toObjectId: '$transportation_id'
                  },
                  else: '$transportation_id'
                }
              }
            }
          },
          {
            $lookup: {
              from: 'hotels',
              localField: 'hotel_id',
              foreignField: '_id',
              as: 'hotels'
            }
          },
          {
            $lookup: {
              from: 'locations',
              localField: 'location_id',
              foreignField: '_id',
              as: 'locations'
            }
          },
          {
            $lookup: {
              from: 'transportations',
              localField: 'transportation_id',
              foreignField: '_id',
              as: 'transportations'
            }
          },
          {
            $lookup: {
              from: 'buses',
              localField: 'car_id',
              foreignField: '_id',
              as: 'cars'
            }
          },
          {
            $project: {
              _id: 1,
              user_id: 1,
              hotel_id: 1,
              car_id: 1,
              location_id: 1,
              transportation_id: 1,
              date_pick: 1,
              status: 1,
              name: 1,
              created_at: 1,
              updated_at: 1,
              auto_drive: 1,
              numberRoom: 1,
              seater: 1,
              time_start: 1,
              location: 1,
              tour_day: 1,
              amount_human: 1,
              code: 1,
              timeBack: 1,
              timeOrder: 1,
              hotels: {
                $arrayElemAt: ['$hotels', 0]
              },
              locations: {
                $arrayElemAt: ['$locations', 0]
              },
              transportations: {
                $arrayElemAt: ['$transportations', 0]
              },
              cars: {
                $arrayElemAt: ['$cars', 0]
              }
            }
          },
          {
            $match: {
              'hotels.user_id': new ObjectId(id)
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
            $project: {
              user: {
                $arrayElemAt: ['$user', 0]
              },
              _id: 1,
              user_id: 1,
              hotel_id: 1,
              car_id: 1,
              location_id: 1,
              transportation_id: 1,
              date_pick: 1,
              status: 1,
              created_at: 1,
              updated_at: 1,
              auto_drive: 1,
              numberRoom: 1,
              seater: 1,
              location: 1,
              tour_day: 1,
              amount_human: 1,
              code: 1,
              name: 1,
              timeBack: 1,
              timeOrder: 1,
              time_start: 1,
              hotels: 1,
              locations: 1,
              cars: 1,
              transportations: 1
            }
          }
        ])
        .toArray()
      return result
    } else if (key === 'locations') {
      const result = await databaseService.booking
        .aggregate([
          {
            $addFields: {
              hotel_id: {
                $cond: {
                  if: {
                    $ne: ['$hotel_id', '']
                  },
                  then: {
                    $toObjectId: '$hotel_id'
                  },
                  else: '$hotel_id'
                }
              },
              location_id: {
                $cond: {
                  if: {
                    $ne: ['$location_id', '']
                  },
                  then: {
                    $toObjectId: '$location_id'
                  },
                  else: '$location_id'
                }
              },
              car_id: {
                $cond: {
                  if: {
                    $ne: ['$car_id', '']
                  },
                  then: {
                    $toObjectId: '$car_id'
                  },
                  else: '$car_id'
                }
              },
              transportation_id: {
                $cond: {
                  if: {
                    $ne: ['$transportation_id', '']
                  },
                  then: {
                    $toObjectId: '$transportation_id'
                  },
                  else: '$transportation_id'
                }
              }
            }
          },
          {
            $lookup: {
              from: 'hotels',
              localField: 'hotel_id',
              foreignField: '_id',
              as: 'hotels'
            }
          },
          {
            $lookup: {
              from: 'locations',
              localField: 'location_id',
              foreignField: '_id',
              as: 'locations'
            }
          },
          {
            $lookup: {
              from: 'transportations',
              localField: 'transportation_id',
              foreignField: '_id',
              as: 'transportations'
            }
          },
          {
            $lookup: {
              from: 'buses',
              localField: 'car_id',
              foreignField: '_id',
              as: 'cars'
            }
          },
          {
            $project: {
              _id: 1,
              user_id: 1,
              hotel_id: 1,
              car_id: 1,
              location_id: 1,
              transportation_id: 1,
              date_pick: 1,
              status: 1,
              name: 1,
              created_at: 1,
              updated_at: 1,
              auto_drive: 1,
              numberRoom: 1,
              seater: 1,
              time_start: 1,
              location: 1,
              tour_day: 1,
              amount_human: 1,
              code: 1,
              timeBack: 1,
              timeOrder: 1,
              hotels: {
                $arrayElemAt: ['$hotels', 0]
              },
              locations: {
                $arrayElemAt: ['$locations', 0]
              },
              transportations: {
                $arrayElemAt: ['$transportations', 0]
              },
              cars: {
                $arrayElemAt: ['$cars', 0]
              }
            }
          },
          {
            $match: {
              'locations.user_id': new ObjectId(id)
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
            $project: {
              user: {
                $arrayElemAt: ['$user', 0]
              },
              _id: 1,
              user_id: 1,
              hotel_id: 1,
              car_id: 1,
              location_id: 1,
              transportation_id: 1,
              date_pick: 1,
              status: 1,
              created_at: 1,
              updated_at: 1,
              auto_drive: 1,
              numberRoom: 1,
              seater: 1,
              location: 1,
              tour_day: 1,
              amount_human: 1,
              code: 1,
              timeBack: 1,
              timeOrder: 1,
              time_start: 1,
              name: 1,
              hotels: 1,
              locations: 1,
              cars: 1,
              transportations: 1
            }
          }
        ])
        .toArray()
      return result
    } else if (key === 'cars') {
      const result = await databaseService.booking
        .aggregate([
          {
            $addFields: {
              hotel_id: {
                $cond: {
                  if: {
                    $ne: ['$hotel_id', '']
                  },
                  then: {
                    $toObjectId: '$hotel_id'
                  },
                  else: '$hotel_id'
                }
              },
              location_id: {
                $cond: {
                  if: {
                    $ne: ['$location_id', '']
                  },
                  then: {
                    $toObjectId: '$location_id'
                  },
                  else: '$location_id'
                }
              },
              car_id: {
                $cond: {
                  if: {
                    $ne: ['$car_id', '']
                  },
                  then: {
                    $toObjectId: '$car_id'
                  },
                  else: '$car_id'
                }
              },
              transportation_id: {
                $cond: {
                  if: {
                    $ne: ['$transportation_id', '']
                  },
                  then: {
                    $toObjectId: '$transportation_id'
                  },
                  else: '$transportation_id'
                }
              }
            }
          },
          {
            $lookup: {
              from: 'hotels',
              localField: 'hotel_id',
              foreignField: '_id',
              as: 'hotels'
            }
          },
          {
            $lookup: {
              from: 'locations',
              localField: 'location_id',
              foreignField: '_id',
              as: 'locations'
            }
          },
          {
            $lookup: {
              from: 'transportations',
              localField: 'transportation_id',
              foreignField: '_id',
              as: 'transportations'
            }
          },
          {
            $lookup: {
              from: 'buses',
              localField: 'car_id',
              foreignField: '_id',
              as: 'cars'
            }
          },
          {
            $project: {
              _id: 1,
              user_id: 1,
              hotel_id: 1,
              car_id: 1,
              location_id: 1,
              transportation_id: 1,
              date_pick: 1,
              status: 1,
              created_at: 1,
              name: 1,
              updated_at: 1,
              auto_drive: 1,
              numberRoom: 1,
              seater: 1,
              location: 1,
              time_start: 1,
              tour_day: 1,
              amount_human: 1,
              code: 1,
              timeBack: 1,
              timeOrder: 1,
              hotels: {
                $arrayElemAt: ['$hotels', 0]
              },
              locations: {
                $arrayElemAt: ['$locations', 0]
              },
              transportations: {
                $arrayElemAt: ['$transportations', 0]
              },
              cars: {
                $arrayElemAt: ['$cars', 0]
              }
            }
          },
          {
            $match: {
              'cars.user_id': new ObjectId(id)
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
            $project: {
              user: {
                $arrayElemAt: ['$user', 0]
              },
              _id: 1,
              user_id: 1,
              hotel_id: 1,
              car_id: 1,
              location_id: 1,
              transportation_id: 1,
              date_pick: 1,
              status: 1,
              created_at: 1,
              updated_at: 1,
              name: 1,
              auto_drive: 1,
              numberRoom: 1,
              seater:1,
              location: 1,
              tour_day: 1,
              amount_human: 1,
              code: 1,
              timeBack: 1,
              timeOrder: 1,
              hotels: 1,
              locations: 1,
              time_start: 1,
              cars: 1,
              transportations: 1
            }
          }
        ])
        .toArray()
      return result
    } else if (key === 'transportations') {
      const result = await databaseService.booking
        .aggregate([
          {
            $addFields: {
              hotel_id: {
                $cond: {
                  if: {
                    $ne: ['$hotel_id', '']
                  },
                  then: {
                    $toObjectId: '$hotel_id'
                  },
                  else: '$hotel_id'
                }
              },
              location_id: {
                $cond: {
                  if: {
                    $ne: ['$location_id', '']
                  },
                  then: {
                    $toObjectId: '$location_id'
                  },
                  else: '$location_id'
                }
              },
              car_id: {
                $cond: {
                  if: {
                    $ne: ['$car_id', '']
                  },
                  then: {
                    $toObjectId: '$car_id'
                  },
                  else: '$car_id'
                }
              },
              transportation_id: {
                $cond: {
                  if: {
                    $ne: ['$transportation_id', '']
                  },
                  then: {
                    $toObjectId: '$transportation_id'
                  },
                  else: '$transportation_id'
                }
              }
            }
          },
          {
            $lookup: {
              from: 'hotels',
              localField: 'hotel_id',
              foreignField: '_id',
              as: 'hotels'
            }
          },
          {
            $lookup: {
              from: 'locations',
              localField: 'location_id',
              foreignField: '_id',
              as: 'locations'
            }
          },
          {
            $lookup: {
              from: 'transportations',
              localField: 'transportation_id',
              foreignField: '_id',
              as: 'transportations'
            }
          },
          {
            $lookup: {
              from: 'buses',
              localField: 'car_id',
              foreignField: '_id',
              as: 'cars'
            }
          },
          {
            $project: {
              _id: 1,
              user_id: 1,
              hotel_id: 1,
              car_id: 1,
              location_id: 1,
              transportation_id: 1,
              date_pick: 1,
              status: 1,
              created_at: 1,
              updated_at: 1,
              auto_drive: 1,
              numberRoom: 1,
              seater: 1,
              time_start: 1,
              location: 1,
              tour_day: 1,
              amount_human: 1,
              name: 1,
              code: 1,
              timeBack: 1,
              timeOrder: 1,
              hotels: {
                $arrayElemAt: ['$hotels', 0]
              },
              locations: {
                $arrayElemAt: ['$locations', 0]
              },
              transportations: {
                $arrayElemAt: ['$transportations', 0]
              },
              cars: {
                $arrayElemAt: ['$cars', 0]
              }
            }
          },
          {
            $match: {
              'transportations.user_id': new ObjectId(id)
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
            $project: {
              user: {
                $arrayElemAt: ['$user', 0]
              },
              _id: 1,
              user_id: 1,
              hotel_id: 1,
              name: 1,
              car_id: 1,
              location_id: 1,
              transportation_id: 1,
              date_pick: 1,
              status: 1,
              time_start: 1,
              created_at: 1,
              updated_at: 1,
              auto_drive: 1,
              numberRoom: 1,
              seater: 1,
              location: 1,
              tour_day: 1,
              amount_human: 1,
              code: 1,
              timeBack: 1,
              timeOrder: 1,
              hotels: 1,
              locations: 1,
              cars: 1,
              transportations: 1
            }
          }
        ])
        .toArray()
      return result
    }
  }

  async updateBooking(status: HotelStatus, _id: string) {
    const result = await databaseService.booking.updateOne(
      {
        _id: new ObjectId(_id)
      },
      {
        $set: {
          status
        }
      }
    )
    return result
  }
  async updateStatusBooking(_id: string, status: string) {
    const result = await databaseService.booking.findOneAndUpdate(
      { _id: new ObjectId(_id) },
      {
        $set: { status: +status }
      }
    )
  }
}
export const bookingService = new BookingService()
