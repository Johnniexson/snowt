import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Note } from '../../models/note';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {
  private note: Note;
  noteForm: FormGroup;
  author: String = null;
  authorId: String = null;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    public noteService: NoteService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getUser();
    this.createForm();
    this.setContactToForm();
  }
  getUser() {
    this.authService.getCurrentUser().subscribe(
      data => {
        console.log(data);
        this.author = data.firstname;
        this.authorId = data._id;
      }
    )
  }

  onSubmit() {
    // user wants to update note
    if (this.note) {
      this.noteService.updateNote(this.note._id, this.noteForm.value).subscribe(
        data => {
          this.snackBar.open('Note Updated', 'Success', {
            duration: 2000
          });
          this.router.navigate(['dashboard', 'notes']);
          console.log(data);
        },
        // calling the snackbar errorhandler
        err => this.errorHandler(err, 'Failed to update note')
      );
    }
    else{
      this.noteService.createNote(this.noteForm.value).subscribe(
        data => {
          this.snackBar.open('Note created', 'Success', {
            duration: 2000
          });
          this.router.navigate(['dashboard', 'notes']);
          console.log(data);
        },
        // calling the snackbar errorhandler
        err => this.errorHandler(err, 'Failed to create note')
      );
    }
  }
  private setContactToForm(){
    //getting active route id
    this.route.params.subscribe(params => {
      let id = params['id'];
      if(!id){
        return;
      }
      this.noteService.getNote(id).subscribe(note => {
        this.note = note;
        this.noteForm.patchValue(this.note);
      },
      // calling the snackbar errorhandler
      err => this.errorHandler(err, 'Failed to get note'));
    })
  } 
  // form builder model
  private createForm() {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      knowt: ['', Validators.required],
      author: this.author,
      authorId: this.authorId,
      dateCreated: new Date(),
    });
  }
  // error handling with snackbar
  private errorHandler(error, message) {
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
