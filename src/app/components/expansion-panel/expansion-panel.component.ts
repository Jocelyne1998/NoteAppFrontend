import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { titleNote } from 'src/app/models/titleNote.model';
import { note } from 'src/app/models/note.model';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.css']
})
export class ExpansionPanelComponent {
  data: boolean = false;
  notes: note[] = [];
  constructor(
    private authService: AuthService
  ) { }

  panelOpenState = false;
  addNote(newNote: string) {
    if (newNote) {
      const titleNote: titleNote = {
        title: newNote
      }
      this.authService.create_note(titleNote).subscribe(
        (res: any) => {
          this.data = res;
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
