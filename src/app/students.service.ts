import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

export interface Student {
  UserName: string;
  ID: number;
}

@Injectable()
export class StudentsService {
  constructor(private http: HttpClient) { }

  getStudents = () =>
    this.http.get<Student[]>('http://fakerestapii.azurewebsites.net/api/Users');
}