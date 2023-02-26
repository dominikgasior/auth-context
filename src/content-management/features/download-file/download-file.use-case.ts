import { Injectable } from '@nestjs/common';
import { FileId } from '../../domain/file-id';
import { DownloaderId } from '../../domain/downloader-id';
import { FileRepository } from '../../domain/repositories/file.repository';
import { File } from '../../domain/file';
import { FileDetailsRepository } from '../../domain/repositories/file-details.repository';
import { LocalFileStorage } from '../../../shared/file-storage/local-file-storage';

export class DownloadFileCommand {
  constructor(readonly fileId: FileId, readonly downloaderId: DownloaderId) {}
}

@Injectable()
export class DownloadFileUseCase {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly fileDetailsRepository: FileDetailsRepository,
    private readonly fileStorage: LocalFileStorage,
  ) {}

  async execute(command: DownloadFileCommand): Promise<Buffer> {
    const { fileId, downloaderId } = command;

    const file = await this.getFile(fileId, downloaderId);

    file.download();

    await this.fileRepository.save(file);

    const fileDetails = await this.fileDetailsRepository.get(fileId);

    return this.fileStorage.get(fileDetails.path);
  }

  private async getFile(
    fileId: FileId,
    downloaderId: DownloaderId,
  ): Promise<File> {
    const fileExists = await this.fileRepository.exists(fileId);

    if (fileExists) {
      return this.fileRepository.get(fileId);
    }

    return new File(fileId, downloaderId);
  }
}
