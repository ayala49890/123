// import { Component } from '@angular/core';
// import { FormControl, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { User } from 'src/model/user.model';
// import Swal from 'sweetalert2';
// import { UserService } from './../user.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   userName: string;
//   userPassword: string;
//   users: User[];
//   hide = true;
//   formSubmitted = false;
//   showCourseField: boolean = false;
//   course: string;

//   userNameFormControl = new FormControl('', [Validators.required]);
//   userPasswordFormControl = new FormControl('', [Validators.required]);

//   constructor(private _userService: UserService, private _router: Router) {}

//   ngOnInit(): void {
//     this._userService.getUsers().subscribe((users) => (this.users = users));
//   }
//   enter() {
//     this._userService.getUsers().subscribe((data) => {
//       let currentUser = data.find((x) => x.userName == this.userName);
//       console.log('currentUser', currentUser);
//       if (currentUser) {
//         if (currentUser?.password != this.userPassword)
//           Swal.fire({
//             title: `Wrong Password!!!`,
//             icon: 'error',
//             timer: 1000,
//           });
//         else {
//           Swal.fire({
//             title: `Welcome! ${this.userName}`,
//             text: "You've logged in successfully!",
//             icon: 'success',
//           });
//           sessionStorage.setItem(
//             'isLecturer',
//             JSON.stringify(currentUser?.isLecturer)
//           );
//           sessionStorage.setItem('userName', JSON.stringify(currentUser));
//           this._router.navigate(['course/all']);
//         }
//       } else {
//         Swal.fire({
//           title: 'oops... you need to register',
//           icon: 'warning',
//         });
//         this._router.navigate(['user/register'], {
//           queryParams: { userName: this.userName },
//         });
//       }
//     });
//   }
//   toggleCourseField() {
//     this.showCourseField = !this.showCourseField;
//   }
// }







import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/model/user.model';
import Swal from 'sweetalert2';
import { UserService } from './../user.service';
import { Course } from 'src/model/course.model';
import { CourseService } from '../../course-module/course.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userName: string;
  userPassword: string;
  users: User[];
  courses: Course[];
  hide = true;
  formSubmitted = false;
  showCourseField: boolean = false;
  selectedCourse: string;
  course: string;

  userNameFormControl = new FormControl('', [Validators.required]);
  userPasswordFormControl = new FormControl('', [Validators.required]);
  courseFormControl = new FormControl('', [Validators.required]);

  constructor(
    private _userService: UserService,
    private _courseService: CourseService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._userService.getUsers().subscribe((users) => (this.users = users));
    this._courseService
      .getCourses()
      .subscribe((courses) => (this.courses = courses));
  }

  enter() {
    if (!this.userName || !this.userPassword) {
      Swal.fire({
        title: 'Missing Credentials!',
        text: 'Please enter both username and password.',
        icon: 'error',
      });
      return;
    }

    // Check if the user is a lecturer
    this._userService.getLecturers().subscribe((lecturers: User[]) => {
      const lecturer: User = lecturers.find(
        (x: User) => x.userName === this.userName
      );
      if (lecturer) {
        if (lecturer.password === this.userPassword) {
          Swal.fire({
            title: `Welcome! ${this.userName}`,
            text: "You've logged in successfully as lecturer!",
            icon: 'success',
          });
          sessionStorage.setItem('isLecturer', JSON.stringify(true));
          sessionStorage.setItem('userName', JSON.stringify(lecturer));
          this._router.navigate(['course/all']);
        } else {
          Swal.fire({
            title: `Wrong Password!!!`,
            text: `Incorrect password for lecturer account.`,
            icon: 'error',
            timer: 1000,
          });
        }
      } else {
        // Check if the user is a regular user
        const currentUser: User = this.users.find(
          (x: User) => x.userName === this.userName
        );
        if (currentUser) {
          if (currentUser.password === this.userPassword) {
            Swal.fire({
              title: `Welcome! ${this.userName}`,
              text: "You've logged in successfully!",
              icon: 'success',
            });
            sessionStorage.setItem('isLecturer', JSON.stringify(false));
            sessionStorage.setItem('userName', JSON.stringify(currentUser));
            this._router.navigate(['course/all']);
          } else {
            Swal.fire({
              title: `Wrong Password!!!`,
              icon: 'error',
              timer: 1000,
            });
          }
        } else {
          Swal.fire({
            title: 'Oops... User not found!',
            text: 'Please check your username or register if you are a new user.',
            icon: 'error',
          });
          this._router.navigate(['user/register'], {
            queryParams: { userName: this.userName },
          });
        }
      }
    });
  }

  toggleCourseField() {
    this.showCourseField = !this.showCourseField;
  }
}
