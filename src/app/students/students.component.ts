import { Component, OnInit } from '@angular/core';
import { StudentsService, Student } from '../students.service';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { Subject, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [StudentsService]
})
export class StudentsComponent implements OnInit {
  studentsSearchInput$ = new Subject<string>();
  subscriptions$ = new Subscription();
  students: Student[];
  loading: boolean;

  constructor(private studentsService: StudentsService) { }

  ngOnInit(): void {
    let sub$ = this.studentsSearchInput$.pipe(
      tap(() => {
        this.students = null;
        this.loading = true;
      }),
      switchMap(_ => this.studentsService.getStudents().pipe(
        catchError(error => {
          alert(error);
          return of([] as Student[]);
        })
      )),
      tap(() => {
        this.loading = false;
      })
    ).subscribe(students => {
      this.students = students;
    });

    this.subscriptions$.add(sub$);
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
    this.studentsSearchInput$.complete();
  }

  getStudents() {
    // se o filtro for diferente
      this.studentsSearchInput$.next(new Date().toString());
  }

}