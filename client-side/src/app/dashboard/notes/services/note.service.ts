import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note';

const BASE_URL = 'http://localhost:3000/api';
@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor(private httpClient: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(`${BASE_URL}/notes`);
  }
  createNote(body: Note): Observable<Note> {
    return this.httpClient.post<Note>(`${BASE_URL}/notes`, body);
  }
  updateNote(id: string, body: Note): Observable<Note> {
    return this.httpClient.put<Note>(`${BASE_URL}/notes/${id}`, body);
  }
  deleteNote(id: string): Observable<Note> {
    return this.httpClient.delete<Note>(`${BASE_URL}/notes/${id}`);
  }
  //get note by id for editing
  getNote(id: string): Observable<Note> {
    return this.httpClient.get<Note>(`${BASE_URL}/notes/${id}`);
  }
}
