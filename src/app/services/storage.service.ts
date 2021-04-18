import { Injectable } from '@angular/core';
import { note } from 'src/app/models/note.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  public getStorage(storageKey: string) {
    const myArrayFromLocalStorage = localStorage.getItem(storageKey);
    if (myArrayFromLocalStorage && myArrayFromLocalStorage.length) {
      return JSON.parse(myArrayFromLocalStorage)
    }
    return [];
  }

  public setStorage(storageKey: string, value: note[]) {
    return localStorage.setItem(storageKey, JSON.stringify(value));
  }

  public get(storageKey: string) {
    return localStorage.getItem(storageKey);
  }

  public set(storageKey: string, value: any) {
    return localStorage.setItem(storageKey, value);
  }
  public removeStorage(storageKey: string) {
    localStorage.removeItem(storageKey);
  }

}
