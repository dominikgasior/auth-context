import { FileId } from './file-id';
import { DownloaderId } from './downloader-id';

export class File {
  private downloadCounter = 0;

  constructor(readonly id: FileId, readonly downloaderId: DownloaderId) {}

  download(): void {
    if (this.downloadCounter === 5) {
      throw new Error('Too many downloads');
    }

    this.downloadCounter++;
  }
}
