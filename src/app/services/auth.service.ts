import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService,
  ) { }

  create_note(postData: any): Observable<any> {
    return this.httpService.post('notes', postData);
  }

  get_notes(): Observable<any> {
    return this.httpService.get('notes');
  }
  
  update_note(postData: any): Observable<any> {
    return this.httpService.post('notes/update', postData);
  }

}
