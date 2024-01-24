import { ObjectId } from 'mongodb'

interface MediasType {
  _id?: ObjectId
  url: string
  created_at?: Date
}
export class Medias {
  _id?: ObjectId
  url: string
  created_at?: Date
  constructor(media: MediasType) {
    this._id = media._id || new ObjectId()
    this.url = media.url
    this.created_at = new Date()
  }
}
