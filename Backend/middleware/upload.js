import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const singleImageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'profiles',
    allowedFormats: ['jpeg', 'jpg', 'png', 'gif'],
  },
});

const multipleImageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'exercises',
    allowedFormats: ['jpeg', 'jpg', 'png', 'gif'],
  },
});

export const uploadSingle = multer({ storage: singleImageStorage });
export const uploadMultiple = multer({ storage: multipleImageStorage });
