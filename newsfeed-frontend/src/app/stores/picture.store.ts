import { Injectable } from "@angular/core";
import { Picture } from "../model/picture.model";

@Injectable({
  providedIn: 'root'
})
export class PictureStore {

  private pictures: Picture[] = [
    { name: 'Orange Clone Trooper', source: './assets/images/pic1.jpg' },
    { name: 'Captain Rex', source: './assets/images/pic2.jpg' },
    { name: 'Ashoka Tano', source: './assets/images/pic3.jpg' },
    { name: 'Bolla Ropal', source: './assets/images/pic4.jpg' },
    { name: 'Darth Maul', source: './assets/images/pic5.jpg' }
  ]

  constructor() {
  }

  getPictures(): Picture[] {
    return this.pictures;
  }

}
