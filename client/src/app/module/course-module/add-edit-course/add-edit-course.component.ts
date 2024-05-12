import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/model/category.model';
import { CourseService } from '../course.service';
import { CategoryService } from '../category.service';
import { Course } from 'src/model/course.model';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from 'src/app/state.service';
import Swal from 'sweetalert2';
import { User } from 'src/model/user.model';
import { UserService } from '../../user-module/user.service';

@Component({
  selector: 'add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.css'],
})
export class AddEditCourseComponent {
  course: Course;
  courseForm: FormGroup;
  categories: Category[];
  lecturers: User[];
  isEdit: boolean = false;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url.join('/').includes('edit')) {
      this.route.queryParams.subscribe((params) => {
        this.id = params['courseId'];
        this.isEdit = true;

        this.courseService.getCourseById(+this.id).subscribe((course) => {
          this.course = course;
          this.initForm();
        });
      });
    } else {
      this.initForm();
    }
  }

  initForm(): void {
    this.courseForm = this.fb.group({
      name: [this.course?.name || '', Validators.required],
      description: [this.course?.description || '', Validators.required],
      categoryId: [this.course?.categoryId || '', Validators.required],
      lecturerId: [this.course?.lecturerId || '', Validators.required],
      amount: [this.course?.amount || '', [Validators.required, Validators.min(1)]],
      beginDate: [this.course?.beginDate || '', Validators.required],
      syllabus: this.fb.array(
        (this.course?.syllabus || []).map((item) => this.fb.control(item))
      ),
      learningType: [this.course?.learningType || '', Validators.required],
      image: [
        this.course?.image || '',
        [Validators.required, Validators.pattern('(https?://.{5,})')],
      ],
    });

    this.loadAdditionalData();
  }

  loadAdditionalData(): void {
    this.userService.getLecturers().subscribe((lecturers) => {
      this.lecturers = lecturers;
    });

    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit() {
    const id = this.course?.id;
    this.course = this.courseForm.value;
    this.course.id = id;
    if (this.isEdit) {
      this.courseService.updateCourse(this.course).subscribe(
        () => {
          Swal.fire({
            text: 'Course updated successfully',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['course/all']);
        },
        () => {
          Swal.fire({
            title: 'Oops...',
            text: 'Something went wrong...',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
    } else {
      const newCourse = this.courseForm.value;
      console.log('course', this.course);
      this.courseService.addCourse(newCourse).subscribe(
        () => {
          Swal.fire({
            text: 'Course added successfully',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['course/all']);
        },
        () => {
          Swal.fire({
            title: 'Oops...',
            text: 'Something went wrong...',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
    }
  }

  onCancel() {
    this.stateService.setData('');
    this.router.navigate(['course/all']);
  }

  get syllabusForms() {
    return this.courseForm.get('syllabus') as FormArray;
  }

  addSyllabus() {
    this.syllabusForms.push(this.fb.control(''));
  }

  removeSyllabus(index: number) {
    this.syllabusForms.removeAt(index);
  }

  onInputDelete(event: Event, index: number) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    if (!value && this.syllabusForms.at(index).dirty)
      this.removeSyllabus(index);
  }

  onSyllabusKeyPress(event: KeyboardEvent, index: number) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const lastSyllabusIndex =
      (this.courseForm.get('syllabus') as FormArray).length - 1;
    console.log(event.key);
    if (value && event.key === 'Enter') {
      if (index == lastSyllabusIndex) this.addSyllabus();
      const nextSyllabusControl = this.syllabusForms.at(index + 1);
      nextSyllabusControl.markAsTouched();
      setTimeout(() => {
        const nextInput: HTMLElement = document.querySelector(
          `.form-field-syl:nth-child(${index + 2}) input`
        );
        nextInput.focus();
      });
    }
  }
}

