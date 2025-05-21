import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private storage: Storage) {}

  async uploadFile(path: string, file: File): Promise<string> {
    const fileRef = ref(this.storage, path);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  }

  async uploadMultiple(pathPrefix: string, files: File[]): Promise<string[]> {
    const uploads = files.map((file, index) =>
      this.uploadFile(`${pathPrefix}/img_${index}_${file.name}`, file)
    );
    return await Promise.all(uploads);
  }
}
