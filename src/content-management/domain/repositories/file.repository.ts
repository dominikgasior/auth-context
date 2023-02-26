import { Injectable } from '@nestjs/common';
import { File } from '../file';
import { FileId } from '../file-id';

@Injectable()
export class FileRepository {
  private readonly files: Map<string, File> = new Map();

  async save(file: File): Promise<void> {
    this.files.set(file.id.toString(), file);
  }

  async get(id: FileId): Promise<File> {
    return this.files.get(id.toString());
  }

  async exists(id: FileId): Promise<boolean> {
    return this.files.has(id.toString());
  }
}
