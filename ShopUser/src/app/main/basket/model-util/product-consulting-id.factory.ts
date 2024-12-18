import { v4 as uuidv4 } from 'uuid';

export class ProductConsultingIdFactory {
  static generateId(): string {
    return uuidv4();
  }
}
