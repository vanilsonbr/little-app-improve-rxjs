import { Component } from '@angular/core';
import { StudentsService, Student } from '../students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [StudentsService]
})
export class StudentsComponent {
  students: Student[];
  loading: boolean;
  
  constructor(private studentsService: StudentsService) {}

  // esse metodo é chamado quando o click do botão "search students" é clicado
  getStudents() {
    // mostrará um texto "loading" na pagina
    this.loading = true;
    this.students = null;

    this.studentsService.getStudents().subscribe(students => {
      // armazenar na lista que vai ser exibida em uma tabela na minha pagina
      this.students = students;

      this.loading = false;
    },
    error => {
      this.loading = false;

      // um erro aconteceu ao recuperar os estudantes
      alert(error);
    });
  }
}