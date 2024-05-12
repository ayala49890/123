import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../user.service';
import Swal from 'sweetalert2';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userName: string;
  address: string;
  email: string;
  password: string;
  isLecturer: boolean;
  formSubmitted = false;
  showCourseField: boolean = false;
  course: string;

  nameFormControl = new FormControl('', [Validators.required]);
  addressFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);
  passwordCourseControl = new FormControl('', [Validators.required]);

  constructor(
    private _userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userName = params['userName'];
    });
  }

  register() {
    this._userService.getUsers().subscribe((data) => {
      let currentUser = data.find((x) => x.userName == this.userName);
    let user: User;
    this._userService.getUsers().subscribe((users) => {
      const existingUser = users.find((user) => user.email === this.email);
      if (existingUser) {
        Swal.fire({
          title: 'Registration Failed!',
          text: 'User with the same email already exists.',
          icon: 'error',
        });
      } else {
        if (this.isLecturer) {
          if (!this.course) {
            Swal.fire({
              title: 'Registration Failed!',
              text: 'Please enter the course name.',
              icon: 'error',
            });
            return;
          }

          user = {
            id: 0,
            userName: this.userName,
            address: this.address,
            email: this.email,
            password: this.password,
            isLecturer: this.isLecturer,
          };

          this._userService.addLecturer(user).subscribe(
            () => {
              Swal.fire({
                title: 'Registration Successful!',
                text: 'You have successfully registered.',
                icon: 'success',
              });

              sessionStorage.setItem(
                'isLecturer',
                JSON.stringify(currentUser?.isLecturer)
              );
              sessionStorage.setItem('userName', JSON.stringify(currentUser));
              this.router.navigate(['course/all']);
            },
            (error) => {
              console.error('Error during registration:', error);
              Swal.fire({
                title: 'Registration Failed!',
                text: 'An error occurred during registration. Please try again later.',
                icon: 'error',
              });
            }
          );
        } else {
          user = {
            id: 0,
            userName: this.userName,
            address: this.address,
            email: this.email,
            password: this.password,
            isLecturer: this.isLecturer,
          };
        }
        this._userService.addUser(user).subscribe(
          () => {
            Swal.fire({
              title: 'Registration Successful!',
              text: 'You have successfully registered.',
              icon: 'success',
            });
            sessionStorage.setItem(
              'isLecturer',
              JSON.stringify(currentUser?.isLecturer)
            );
            sessionStorage.setItem('userName', JSON.stringify(currentUser));
            this.router.navigate(['course/all']);          },
          (error) => {
            console.error('Error during registration:', error);
            Swal.fire({
              title: 'Registration Failed!',
              text: 'An error occurred during registration. Please try again later.',
              icon: 'error',
            });
          }
            );
      }
       })   });
  }

  toggleCourseField() {
    this.showCourseField = !this.showCourseField;
  }
}
