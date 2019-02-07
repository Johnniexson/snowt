import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { Category } from '../models/category';

const BASE_URL = 'http://localhost:3000/api';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private httpClient: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(`${BASE_URL}/contacts`);
  }
  createContact(body: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(`${BASE_URL}/contacts`, body);
  }
  updateContact(id: string, body: Contact): Observable<Contact> {
    return this.httpClient.put<Contact>(`${BASE_URL}/contacts/${id}`, body);
  }
  deleteContact(id: string): Observable<Contact> {
    return this.httpClient.delete<Contact>(`${BASE_URL}/contacts/${id}`);
  }
  //get by id for editing
  getContact(id: string): Observable<Contact> {
    return this.httpClient.get<Contact>(`${BASE_URL}/contacts/${id}`);
  }
  getLabel(id: string): Observable<Category> {
    return this.httpClient.get<Category>(`${BASE_URL}/categories/${id}`);
  }
  // category
  getLabels(id: string): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${BASE_URL}/categories/${id}`);
  }
  createLabel(body: Category): Observable<Category> {
    return this.httpClient.post<Category>(`${BASE_URL}/categories`, body);
  }
  updateLabel(id: string, body: Category): Observable<Category> {
    return this.httpClient.put<Category>(`${BASE_URL}/categories/${id}`, body);
  }
  deleteLabel(id: string): Observable<Category> {
    return this.httpClient.delete<Category>(`${BASE_URL}/categories/${id}`);
  }
}
