import { Injectable } from '@angular/core';
import { PictureStore } from "../stores/picture.store";
import { Picture } from "../model/picture.model";

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private pictureStore: PictureStore) { }

  getPictures(): Picture[] {
    return this.pictureStore.getPictures();
  }
}
