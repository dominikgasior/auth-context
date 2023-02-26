import { Injectable } from '@nestjs/common';
import { FileId } from '../file-id';
import { UuidGenerator } from '../../../shared/uuid/uuid-generator';
import { FileDetails } from '../file-details';

@Injectable()
export class FileDetailsRepository {
  private readonly filesDetails: Map<string, FileDetails> = new Map();

  async save(fileDetails: FileDetails): Promise<void> {
    this.filesDetails.set(fileDetails.id.toString(), fileDetails);
  }

  async get(id: FileId): Promise<FileDetails> {
    return this.filesDetails.get(id.toString());
  }

  async nextId(): Promise<FileId> {
    return new FileId(UuidGenerator.generate());
  }
}
