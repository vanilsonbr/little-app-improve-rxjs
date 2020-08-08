import { Component, OnInit } from '@angular/core';
import { StudentsService, Student } from '../students.service';
import { switchMap, catchError, map, tap,  } from 'rxjs/operators';
import { Subject, of, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  studentsSearchInput$ = new Subject<void>();
  subscriptions: Subscription[];
  students: { name: string; id: number; selected: boolean; }[];
  loading: boolean = false;

  constructor(private studentsService: StudentsService) { }

  ngOnInit(): void {
    let sub$ = this.studentsSearchInput$.pipe(
      tap(() => {
        this.students = [];
        this.loading = true;
      }),
      switchMap(_ => this.studentsService.getStudents().pipe(catchError(e => of([] as Student[])))),
      map(students => students.map(stds => ({ name: stds.name, id: stds.id, selected: false }))),
      tap(() => this.loading = false)
    ).subscribe(studentsPlusSelected => {
      this.students = studentsPlusSelected;
    });

    this.subscriptions = [sub$];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      if(!sub.closed)
        sub.unsubscribe();
    })
  }

  getStudents() {
    // se o filtro for diferente
      this.studentsSearchInput$.next();
  }

}