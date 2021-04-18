import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { titleNote } from 'src/app/models/titleNote.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService,
  ) { }

  create_note(postData: titleNote): Observable<any> {
    return this.httpService.post('notes', postData);
  }

  get_notes(): Observable<any> {
    return this.httpService.get('notes');
  }
  
  get_note(status: String): Observable<any> {
    return this.httpService.get('notes/'+status);
  }
  
  update_note(tittle: titleNote): Observable<any> {
    return this.httpService.post('notes/update', tittle);
  }

  delete_notes(): Observable<any> {
    return this.httpService.get('notes/delete');
  }

}
