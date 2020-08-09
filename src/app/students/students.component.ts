import { Component, OnInit } from '@angular/core';
import { StudentsService, Student } from '../students.service';
import { switchMap, catchError, tap,  } from 'rxjs/operators';
import { Subject, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [StudentsService]
})
export class StudentsComponent implements OnInit {
  studentsSearchInput$ = new Subject<void>();
  subscriptions$: Subscription[];
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

    this.subscriptions$ = [sub$];
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(sub => {
      if(!sub.closed)
        sub.unsubscribe();
    })
  }

  getStudents() {
    // se o filtro for diferente
      this.studentsSearchInput$.next();
  }

}