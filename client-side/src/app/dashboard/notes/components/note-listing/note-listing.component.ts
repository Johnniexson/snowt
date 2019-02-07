import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { remove } from 'lodash';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-note-listing',
  templateUrl: './note-listing.component.html',
  styleUrls: ['./note-listing.component.scss']
})
export class NoteListingComponent implements OnInit {
  constructor(
    private noteService: NoteService,
              private router: Router,
              private snackBar: MatSnackBar
  ) {}
  dataSource: Note[] = [];

  saveBtnHandler(){
    this.router.navigate(['dashboard', 'notes', 'new']);
  }
  ngOnInit() {
    this.noteService.getNotes().subscribe(
      data => {
        this.dataSource = data;
        console.log(data);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login'])
          } else {
            // calling the snackbar errorhandler
          this.errorHandler(err, 'Failed to load notes')
          }
        }
      }
    );
  }
  editBtnHandler(id){
    this.router.navigate(['dashboard', 'contacts', id]);
  }
  deleteBtnHandler(id){
    this.noteService.deleteNote(id).subscribe(
      data => {
       // implementing lodash to update datasource
        const removedItems = remove(this.dataSource,(name) => {
          return name._id === data._id
        })
        this.dataSource = [...this.dataSource];
        // snackBar
        this.snackBar.open('Note deleted', 'Success', {
          duration: 2000
        });
      },
       // calling the snackbar errorhandler
      err => this.errorHandler(err, 'Failed to delete note')
    );
  }
  // error handling with snackbar
  private errorHandler(error, message) {
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
