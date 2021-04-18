import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
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
  opcionSeleccionado: string  = '';
  constructor(
    private authService: AuthService
  ) { }
  

  ngOnInit(){
    this.authService.get_notes().subscribe(
      (note: any) => {
        this.notes = note;
      }
    )
  }

  onGroupsChange(options: MatListOption[]) {
    // map these MatListOptions to their values
    this.noteList = options.map(o => o.value);
    const titleNote: titleNote = {
      title: this.noteList[this.noteList.length-1].title
    }
    this.authService.update_note(titleNote).subscribe(
      (res: any) => {
        console.log(res);
      }
    );
  }
  
  addNote(newNote: string) {
    if (newNote) {
      const titleNote: titleNote = {
        title: newNote
      }
      this.authService.create_note(titleNote).subscribe(
        (res: any) => {
          console.log(res)
          this.authService.get_notes().subscribe(
            (note: any) => {
              this.notes = note;
            }
          )
        }
      );
    }
  }
}
