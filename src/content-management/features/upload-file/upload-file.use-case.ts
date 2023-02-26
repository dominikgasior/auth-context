import { Injectable } from '@nestjs/common';
import { LocalFileStorage } from '../../../shared/file-storage/local-file-storage';
import { FileDetails } from '../../domain/file-details';
import { FileDetailsRepository } from '../../domain/repositories/file-details.repository';

export class UploadFileCommand {
  constructor(readonly file: Buffer, readonly fileName: string) {}
}

@Injectable()
export class UploadFileUseCase {
  constructor(
    private readonly fileStorage: LocalFileStorage,
    private readonly fileDetailsRepository: FileDetailsRepository,
  ) {}

  async execute(command: UploadFileCommand): Promise<void> {
    this.fileStorage.store(command.fileName, command.file);

    const fileId = await this.fileDetailsRepository.nextId();

    const fileDetails = new FileDetails(fileId, command.fileName);

    await this.fileDetailsRepository.save(fileDetails);
  }
}
