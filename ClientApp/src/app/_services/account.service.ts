import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertService } from '.';
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
    private isHttpAvailable = true;
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    public guest: User = { name : "guest", login : "guest", password : "guest", confirmPassword : "guest", phoneNumber : "" }

    constructor(
        private router: Router,
        private http: HttpClient,
        private alertSerivce: AlertService
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

    public get userValue(): Observable<User> {
        if (this.isHttpAvailable){
            this.isHttpAvailable = false;
            this.getServerUserInfo().subscribe(x => 
            {
                this.userSubject.next(x ?? this.guest),
                setTimeout(() => this.isHttpAvailable = true, 150);
            });
        }
        
        return this.user;
    }

    login(login: string, password: string) {        
         return this.http.post<User>(this.usersLoginUrl, { login, password }, this.httpOptions).pipe(            
            tap((_user: User) => 
            {                
                this.userSubject.next(_user);                
            }),
            catchError(this.handleError<User>(`login`))
        );
    }

    logout() {   
        this.userSubject.next(this.guest);
        this.isHttpAvailable = false;
        setTimeout(() => this.isHttpAvailable = true, 150);         
        return this.http.post(this.usersLogoutUrl, null, this.httpOptions).pipe(            
            tap(() => this.alertSerivce.success(`logged out`)),
            catchError(err => {
                throw 'error in source. Details: ' + err;
              }),
            catchError(err => {
                this.handleError(`logout`);
                throw err;
            })
        );
    }

    register(user: User) {
       return this.http.post<User>(this.usersRegisterUrl, user, this.httpOptions).pipe(
            tap((newUser: User) => 
            {
                this.alertSerivce.success((`Registration successful`));                
            }),
            catchError(this.handleError<User>(`register`))
        );
    }

    getServerUserInfo(){       
       return this.http.get<User>(this.environmetUrl, this.httpOptions).pipe(              
            catchError(this.handleError<User>(`getUserInfo`)))        
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {         
        //  this.alertSerivce.error(error);
         return of(result as T);
        };
    }

    // update(id: number, params: string) {
    //     return this.http.put(`${environment.apiUrl}/users/${id}`, params)
    //         .pipe(map(x => {
    //             // update stored user if the logged in user updated their own record
    //             // if (id == this.userValue.id) {
    //             //     // update local storage
    //             //     const user = { ...this.userValue, ...params };
    //             //     localStorage.setItem('user', JSON.stringify(user));

    //             //     // publish updated user to subscribers
    //             //     this.userSubject.next(user);
    //             // }
    //             return x;
    //         }));
    // }

    // delete(login: string) {
    //     return this.http.delete(`${environment.apiUrl}/users/${login}`)
    //         .pipe(map(x => {
    //             // auto logout if the logged in user deleted their own record
    //             if (login == this.userValue.login) {
    //                 this.logout();
    //             }
    //             return x;
    //         }));
    // }
}