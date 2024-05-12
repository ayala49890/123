import { Course } from 'src/model/course.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/model/user.model';

@Injectable()
export class UserService {
  //     login(user: User): Observable<User> {
  //         return of(user);
  //     }

  //     register(user:User):Observable<User>  {
  //         return of(user);
  //     }

  //     private currentUserSubject = new BehaviorSubject<User>(null);
  //     currentUser$ = this.currentUserSubject.asObservable();

  constructor(private _http: HttpClient) {}
  getUsers(): Observable<User[]> {
    // return of(USERS);
    return this._http.get<User[]>('/api/User');
  }

  getLecturers(): Observable<User[]> {
    return this._http.get<User[]>('/api/Lecturer');
 }
 getLecturerByID(id: number | null):Observable<User>{
  return this._http.get<User>(`/api/Lecturer/${id}`);
}
  addUser(user: User | null): Observable<boolean> {
    if (user) {
      return this._http.post<boolean>('/api/User', user);
    } else {
      return of(false);
    }
  }
  addLecturer(userL: User | null): Observable<boolean> {
    if (userL) {
      return this._http.post<boolean>('/api/Lecturer', userL);
    } else {
      return of(false);
    }
  }
}
