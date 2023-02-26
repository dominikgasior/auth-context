import { FileId } from './file-id';

export class FileDetails {
  constructor(readonly id: FileId, readonly path: string) {}
}
