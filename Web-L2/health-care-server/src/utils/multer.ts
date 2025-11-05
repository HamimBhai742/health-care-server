import multer from 'multer';
import path from 'path';
import { cloudinary } from '../config/cloudinary';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd() + '/uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (file: Express.Multer.File) => {
  console.log(file);
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      public_id: file.filename,
    });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
