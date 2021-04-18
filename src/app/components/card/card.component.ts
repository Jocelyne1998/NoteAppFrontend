import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { AuthDataConstants } from 'src/app/config/authDataConstants';
import { StorageService } from 'src/app/services/storage.service';
import { titleNote } from 'src/app/models/titleNote.model';
import { note } from 'src/app/models/note.model';
import { MatListOption } from '@angular/material/list'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  notes: note[] = [];
  noteList: note[] = [];
  opcionSeleccionado: string = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) { }


  ngOnInit() {
    if(this.storageService.get(AuthDataConstants.AUTH_SERVICES) == '1'){
      this.getFullNotes();
    } else {
      this.notes = this.storageService.getStorage(AuthDataConstants.AUTH_DATA);
    }
  }

  onGroupsChange(options: MatListOption[]) {
    // map these MatListOptions to their values
    this.noteList = options.map(o => o.value);
    const titleNote: titleNote = {
      title: this.noteList[this.noteList.length - 1].title
    }
    this.authService.update_note(titleNote).subscribe();
  }

  addNote(newNote: string) {
    this.storageService.set(AuthDataConstants.AUTH_SERVICES, '1');
    if (newNote) {
      const titleNote: titleNote = { title: newNote }
      this.authService.create_note(titleNote).subscribe(
        (res: boolean) => {
          if(res) { this.getFullNotes(); }
        }
      );
    }
  }

  getFullNotes(){
    this.storageService.set(AuthDataConstants.AUTH_SERVICES, '1');
    this.authService.get_notes().subscribe(
      (note: note[]) => {
        this.notes = note;
      }
    )
  }

  getNoteByState(status: String) {
    this.storageService.set(AuthDataConstants.AUTH_SERVICES, '2');
    this.authService.get_note(status).subscribe(
      (note: note[]) => {
        this.storageService.setStorage(AuthDataConstants.AUTH_DATA, note);
      }
    )
  }

  deleteCompletedNote() {
    this.storageService.set(AuthDataConstants.AUTH_SERVICES, '1');
    this.authService.delete_notes().subscribe(
      (res: boolean) => {
        if(res) { this.getFullNotes(); }
      }
    )
  }

}
