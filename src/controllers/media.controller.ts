import { NextFunction, Request, Response } from 'express'
import { mediaServices } from '~/services/media.service'

export const uploadImagesController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediaServices.handleUploadFile(req)
  return res.json({
    result: url
  })
}
