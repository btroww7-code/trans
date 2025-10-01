import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { uploadToMinio, generateThumbnails } from './utils';

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) cb(null, true);
  else cb(new Error('Invalid file type'), false);
};

@Controller('uploads')
export class UploadsController {
  @Post('listing-images')
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter,
  }))
  async uploadListingImages(@UploadedFiles() files: Express.Multer.File[]) {
    const urls = [];
    for (const file of files) {
      const { originalUrl, thumbnailUrl, previewUrl } = await uploadToMinio(file);
      await generateThumbnails(file); // 200x200, 800x600
      urls.push({ originalUrl, thumbnailUrl, previewUrl });
    }
    return urls;
  }
}
}
