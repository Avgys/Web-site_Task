import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { UsersModule } from '../_models/users/users.module';

@Injectable({ providedIn: 'root' })
export class AccountService {

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    private environmetUrl = `${environment.apiUrl}` + '/api/users/';
    private usersRegisterUrl = this.environmetUrl + 'register';
    private usersLoginUrl = this.environmetUrl + 'login';    
    private usersLogoutUrl = this.environmetUrl + 'logout';


    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    public guest: User = {  name : "guest",
                            login : "guest",
                            password : "guest",
                            confirmPassword : "guest",
                            phoneNumber : ""
                        }

    constructor(
        private router: Router,
        private http: HttpClient
    )
     {
        if(localStorage.getItem('user') !== null){
            let temp = JSON.parse(localStorage.getItem('user') ?? "{}");
            this.userSubject = new BehaviorSubject<User>(temp);
            this.user = this.userSubject.asObservable();
        }    
        else{
            this.userSubject = new BehaviorSubject<User>(this.guest);
            this.user = this.userSubject.asObservable();
        }    
    }

    public get userValue(): User {
        this.updateLocalUserValue().subscribe(x => this.userSubject.next(x ?? this.guest));
        return this.userSubject.value;
    }

    login(login: string, password: string) {
        // return this.http.post<User>(`${environment.apiUrl}/users/login`, { username, password })
        //     .pipe(map(user => {
        //         // store user details and jwt token in local storage to keep user logged in between page refreshes
        //         localStorage.setItem('user', JSON.stringify(user));
        //         this.userSubject.next(user);
        //         return user;
        //     }));
         return this.http.post<User>(this.usersLoginUrl, { login, password }, this.httpOptions).pipe(
            tap(() => this.log(`logged in`)),
            catchError(this.handleError<User>(`add hero`))
          );

    }

    logout() {
        // remove user from local storage and set current user to guest
        // localStorage.removeItem('user');
        this.userSubject.next(this.guest);
        this.router.navigate(['/account/login']);
        return this.http.post<User>(this.usersLogoutUrl, null, this.httpOptions).pipe(
            tap((newUser: User) => this.log(`logged out`)),
            catchError(this.handleError<User>(`logout`))
        );
    }

    register(user: User) {
        // let user = {  Name : newRegUser.Name,
        //                 login : newRegUser.login,
        //                 password : newRegUser.password,
        //                 confirmPassword : newRegUser.confirmPassword,
        //                 phoneNumber : ""
        //             }
        // return this.http.post(`${environment.apiUrl}/users/register`, user);
       return this.http.post<User>(this.usersRegisterUrl, user, this.httpOptions).pipe(
            tap((newUser: User) => this.log(`Added user login=${newUser.login}`)),
            catchError(this.handleError<User>(`register`))
        );
    }

    updateLocalUserValue(){
       let temp;
       return this.http.get<User>(this.environmetUrl, this.httpOptions).pipe(
            tap(() => this.log(`Gog user info`)),            
            );        
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
         // TODO: send the error to remote logging infrastructure
         console.error(error); // log to console instead
         // TODO: better job of transforming error for user consumption
        //  this.log(`${operation} failed: ${error.message}`);
         // Let the app keep running by returning an empty result.
         return of(result as T);
       };
    }

    private log(message: string) {
        // this.messageService.add(`HeroService: ${message}`);
    }

    update(id: number, params: string) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                // if (id == this.userValue.id) {
                //     // update local storage
                //     const user = { ...this.userValue, ...params };
                //     localStorage.setItem('user', JSON.stringify(user));

                //     // publish updated user to subscribers
                //     this.userSubject.next(user);
                // }
                return x;
            }));
    }

    delete(login: string) {
        return this.http.delete(`${environment.apiUrl}/users/${login}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (login == this.userValue.login) {
                    this.logout();
                }
                return x;
            }));
    }
}