import { v4 as uuid } from 'uuid';
import { Uuid } from './uuid';

export class UuidGenerator {
  static generate(): Uuid {
    return new Uuid(uuid());
  }
}
