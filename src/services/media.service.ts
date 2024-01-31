import { TokenPayLoad } from '~/models/request/User.request'
import { databaseService } from './databases.service'
import { Request } from 'express'
import sharp from 'sharp'
import { getName, uploadFile, upload_dir } from '~/utills/file'
import { ObjectId } from 'mongodb'
import fs from 'fs'
import { BlobServiceClient } from '@azure/storage-blob';
// import multer from 'multer'

// Thiết lập Azure Blob Storage
const connectionString = "DefaultEndpointsProtocol=https;AccountName=imagejoy;AccountKey=Cp7+SgO57eITJ+hgYDqTTduYO08KR/tr9jWYpXH56o6wjXsYE3peniS5BxQi9bXN3cQ8PH2dpXyg+ASt8mdilg==;EndpointSuffix=core.windows.net";
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerName = "image";
const containerClient = blobServiceClient.getContainerClient(containerName);
// Thiết lập Multer để xử lý upload file
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
class MediaService {
  async handleUploadFile(req: Request) {
    // const { user_id } = req.decoded_access_token as TokenPayLoad

    const files = await uploadFile(req)
    const total = files.map(async (file) => {
      const newName = getName(file.newFilename)
      sharp.cache({ files: 0 })
      // await sharp(file.filepath).jpeg().toFile(`${upload_dir}/${newName}.jpg`)
      const imageBuffer = await sharp(file.filepath).toBuffer();
      const blockBlobClient = containerClient.getBlockBlobClient(`${newName}.jpg`);
      await blockBlobClient.upload(imageBuffer, file.size);

      const fileUrl = blockBlobClient.url;
      databaseService.medias.insertOne({
        url: newName
      })

      return {
        url: fileUrl,
        name: newName
      }
    })
    const result = await Promise.all(total)
    return result
  }
}

export const mediaServices = new MediaService()
