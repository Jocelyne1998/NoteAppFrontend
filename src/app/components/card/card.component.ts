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
  clearButton: boolean = false;
  hiddenButton: boolean = true;

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) { }


  ngOnInit() {
    if (this.storageService.get(AuthDataConstants.AUTH_SERVICES) == '1') {
      this.getFullNotes();
    } else {
      this.notes = this.storageService.getStorage(AuthDataConstants.AUTH_DATA);
    }
  }

  settitleNote(text: string) {
    const titleNote: titleNote = { title: text }
    return titleNote
  }

  addNote(newNote: string) {
    this.storageService.set(AuthDataConstants.AUTH_SERVICES, '1');
    if (newNote) {
      const titleNote = this.settitleNote(newNote);
      this.authService.create_note(titleNote).subscribe(
        (res: boolean) => { return res; }
      );
    }
  }

  getFullNotes() {
    this.storageService.set(AuthDataConstants.AUTH_SERVICES, '1');
    this.authService.get_notes().subscribe(
      (note: note[]) => {
        this.notes = note;
        this.hiddenButton = this.buttonStateSwitch(this.notes);
      }
    )
  }

  buttonStateSwitch(note: note[]): boolean {
    return note.length > 0 ? true : false;
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
        return res;
      }
    )
  }

  updateNote(options: MatListOption[]) {
    this.noteList = options.map(o => o.value);
    let note = this.noteList[this.noteList.length - 1]
    note.status = this.noteStateSwitch(note.status);
    this.authService.update_note(note).subscribe(
      (res: boolean) => { return res; }
    );
  }

  noteStateSwitch(status: String): String {
    return status === '1' ? '0' : '1';
  }

}
