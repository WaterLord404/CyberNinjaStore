import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor() { }

  /**
   * Parsea de byte[] a una imagen
   * @param data: Byte[]
   * @param type: string
   */
  dataToImg(data: Byte[], type: string): string {
    return 'data:' + type + ';base64,' + data;
  }
}
