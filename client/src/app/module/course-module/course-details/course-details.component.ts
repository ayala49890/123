// import { Component, Input, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Category } from 'src/model/category.model';
// import { Course, LearningType } from 'src/model/course.model';
// import { User } from 'src/model/user.model';
// import { UserService } from '../../user-module/user.service';
// import { CategoryService } from '../category.service';

// @Component({
//   selector: 'app-course-detailes',
//   templateUrl: './course-details.component.html',
//   // styleUrl: './course-details.component.css'
// })
// export class CourseDetailesComponent implements OnInit {
//   constructor(
//     private _userService: UserService,
//     private _categoryService: CategoryService,
//     private _router: Router,
//     private _acr: ActivatedRoute
//   ) {}
//   course: Course;
//   category: Category;
//   learnType = LearningType;
//   lecturer: User = new User();
//   ngOnInit(): void {
//     // console.log("coursre",this.course)
//     let c: Course;
//     {
//       const course = sessionStorage.getItem('course');
//       c = JSON.parse(course);
//       this.course = c;
//       this._categoryService.getCategories().subscribe((d) => {
//         if (d) this.category = d.find((x) => x.id == this.course.categoryId);
//       });
//     }
//     this._userService.getUsers().subscribe((d) => {
//       this.lecturer = d.find((x) => x.id == this.course?.lecturerId);
//     });
//   }
//   print() {
//     window.print();
//   }

// }




import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/model/category.model';
import { Course, LearningType } from 'src/model/course.model';
import { User } from 'src/model/user.model';
import { UserService } from '../../user-module/user.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-course-detailes',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailesComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _router: Router,
    private _acr: ActivatedRoute
  ) {}
  course: Course;
  category: Category;
  learnType = LearningType;
  lecturer: User = new User();
  isLecturer: boolean = false;

  ngOnInit(): void {
    let c: Course;
    {
      const course = sessionStorage.getItem('course');
      c = JSON.parse(course);
      this.course = c;
      this._categoryService.getCategories().subscribe((d) => {
        if (d) this.category = d.find((x) => x.id == this.course.categoryId);
      });
    }
    this._userService.getUsers().subscribe((d) => {
      this.lecturer = d.find((x) => x.id == this.course?.lecturerId);
      this.isLecturer = d.some(user => user.id === this.course?.lecturerId && user.isLecturer);
    });
  }

  print() {
    window.print();
  }
  editCourse() {
    if (this.isLecturer) {
      this._router.navigate(['course/edit'], { queryParams: { courseId: this.course.id } });
    }
  }
}
