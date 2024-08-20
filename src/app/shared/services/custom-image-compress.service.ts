import { Injectable } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

export enum DOC_ORIENTATION {
  Up = 1,
  Down = 3,
  Right = 6,
  Left = 8,
  UpMirrored = 2,
  DownMirrored = 4,
  LeftMirrored = 5,
  RightMirrored = 7,
  Default = 0,
  NotJpeg = -1,
  NotDefined = -2
}

export type DataUrl = string;

export interface UploadResponse {
  image: DataUrl;
  orientation: DOC_ORIENTATION;
  fileName: string;
}

@Injectable({ providedIn: 'root' })
export class CustomImageCompressService {

  constructor(private imageCompressService: NgxImageCompressService) { }

  // Compress single image
  compressFile(): Promise<UploadResponse> {
    return this.imageCompressService.uploadFile()
      .then(({ image, orientation, fileName }: UploadResponse) => {
        const byteCount = this.imageCompressService.byteCount(image);
        if (byteCount > 800000) {
          return this.imageCompressor({ image, orientation, fileName })
            .then(url => ({
              image: url ?? "",
              orientation,
              fileName
            }));
        } else {
          return Promise.resolve({ image, orientation, fileName });
        }
      })
      .catch(error => {
        console.error('Error compressing file:', error.message);
        throw error;  // Rethrow the error after logging it
      });
  }

  // Compress multiple files
  compressMultipleFiles(): Promise<UploadResponse[]> {
    return this.imageCompressService.uploadMultipleFiles()
      .then((multipleOrientedFiles: UploadResponse[]) => {
        const compressImagesData: UploadResponse[] = [...multipleOrientedFiles];
        const allImagesPromises = multipleOrientedFiles.map(file => {
          const byteCount = this.imageCompressService.byteCount(file.image);
          if (byteCount > 800000) {
            return this.imageCompressor(file);
          } else {
            return Promise.resolve(file.image);
          }
        });

        return Promise.all(allImagesPromises)
          .then((compressedImages) => {
            compressedImages.forEach((item, index) => {
              compressImagesData[index].image = item;
            });
            return compressImagesData;
          })
          .catch(error => {
            console.error('Error compressing multiple files:', error.message);
            throw error;  // Rethrow the error after logging it
          });
      });
  }

  // Images compressor method
  imageCompressor(file: UploadResponse): Promise<DataUrl> {
    return this.imageCompressService.compressFile(file.image, file.orientation);
  }
}
