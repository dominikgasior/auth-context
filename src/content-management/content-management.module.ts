import { Module } from '@nestjs/common';
import { UploadFileController } from './features/upload-file/upload-file.controller';
import { AuthModule } from '../shared/auth/auth.module';
import { FileStorageModule } from '../shared/file-storage/file-storage.module';
import { UploadFileUseCase } from './features/upload-file/upload-file.use-case';
import { FileRepository } from './domain/repositories/file.repository';
import { DownloadFileController } from './features/download-file/download-file.controller';
import { DownloadFileUseCase } from './features/download-file/download-file.use-case';
import { FileDetailsRepository } from './domain/repositories/file-details.repository';

@Module({
  imports: [AuthModule, FileStorageModule],
  controllers: [UploadFileController, DownloadFileController],
  providers: [
    UploadFileUseCase,
    FileRepository,
    FileDetailsRepository,
    DownloadFileUseCase,
  ],
})
export class ContentManagementModule {}
