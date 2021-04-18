import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { titleNote } from 'src/app/models/titleNote.model';
import { note } from 'src/app/models/note.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  notes: note[] = [];

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
