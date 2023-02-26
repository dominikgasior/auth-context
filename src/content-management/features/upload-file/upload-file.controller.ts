import {
  Controller,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileCommand, UploadFileUseCase } from './upload-file.use-case';
import { AuthenticationGuard } from '../../../shared/auth/authentication.guard';
import { AuthorizationGuard } from '../../../shared/auth/authorization.guard';
import { Roles } from '../../../shared/auth/roles.decorator';
import { Role } from '../../../shared/auth/role';

@Controller()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class UploadFileController {
  constructor(private readonly uploadFileUseCase: UploadFileUseCase) {}

  @Post('content-management/file-upload')
  @UseInterceptors(FileInterceptor('file'))
  @Roles(Role.Admin)
  upload(
    @UploadedFile(new ParseFilePipeBuilder().build({ fileIsRequired: true }))
    file: Express.Multer.File,
  ): Promise<void> {
    return this.uploadFileUseCase.execute(
      new UploadFileCommand(file.buffer, file.originalname),
    );
  }
}
