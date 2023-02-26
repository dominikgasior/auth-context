import {
  Body,
  Controller,
  Get,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationGuard } from '../../../shared/auth/authentication.guard';
import { AuthorizationGuard } from '../../../shared/auth/authorization.guard';
import { Roles } from '../../../shared/auth/roles.decorator';
import { Role } from '../../../shared/auth/role';
import {
  DownloadFileCommand,
  DownloadFileUseCase,
} from './download-file.use-case';
import {
  AuthenticatedUser,
  AuthUser,
} from '../../../shared/auth/authenticated-user';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { FileId } from '../../domain/file-id';
import { Uuid } from '../../../shared/uuid/uuid';
import { DownloaderId } from '../../domain/downloader-id';

class DownloadFileRequestBody {
  @IsNotEmpty()
  @IsUUID()
  fileId: string;
}

@Controller()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class DownloadFileController {
  constructor(private readonly downloadFileUseCase: DownloadFileUseCase) {}

  @Get('content-management/file-download')
  @Roles(Role.Subscriber)
  async download(
    @AuthUser() authenticatedUser: AuthenticatedUser,
    @Body() requestBody: DownloadFileRequestBody,
  ): Promise<StreamableFile> {
    const buffer = await this.downloadFileUseCase.execute(
      new DownloadFileCommand(
        new FileId(new Uuid(requestBody.fileId)),
        new DownloaderId(new Uuid(authenticatedUser.id)),
      ),
    );

    return new StreamableFile(buffer);
  }
}
