import fs from 'fs';
import path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalFileStorage {
  store(fileName: string, buffer: Buffer): void {
    fs.writeFileSync(path.join(process.cwd(), 'storage', fileName), buffer);
  }

  get(fileName: string): Buffer {
    return fs.readFileSync(path.join(process.cwd(), 'storage', fileName));
  }
}
