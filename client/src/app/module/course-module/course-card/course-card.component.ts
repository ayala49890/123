import { Component, Input, ViewChild } from '@angular/core';
import { Course,LearningType } from 'src/model/course.model';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent {
  @Input()
  course: Course;
  learnType = LearningType;

  checkDate(c: Course) {
    sessionStorage.setItem("course", JSON.stringify(c))
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextWeek = new Date;
    nextWeek.setDate(nextWeek.getDate() + 7);
    return this.course.beginDate >= today && this.course.beginDate <= nextWeek;
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('userName');
  }
}
