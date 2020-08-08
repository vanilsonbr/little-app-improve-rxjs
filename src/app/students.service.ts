import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

export interface Student {
  name: string;
  id: number;
}

@Injectable()
export class StudentsService {

  private students: Student[] = [
    { name: "van", id: 1 },
    { name: "joy", id: 2 },
    { name: "foo", id: 3 },
    { name: "bar", id: 4 },
    { name: "gen", id: 5 },
    { name: "jin", id: 6 },
    { name: "ken", id: 7 },
    { name: "gal", id: 8 },
    { name: "kim", id: 9 },
    { name: "han", id: 10 },
    { name: "kal", id: 11 },
  ];

  constructor(private http: HttpClient) { }

  getStudents = () =>
     of(this.students);
    // this.http.get<Student>('api/Students');
}
