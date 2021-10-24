import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap, throwIfEmpty } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertService, AccountService } from '.';
import { User, Account } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {

    private readonly _userRole = "user";    
    private userSubject: BehaviorSubject<User | undefined>;
    public user: Observable<User | undefined>;
    // public readonly guest: User = 
    //         {   name : "guest",
    //             login : "guest",
    //             password : "",
    //             phoneNumber : "" 
    //         }

    private currentApi = 'api/users/';    

    constructor(
        private router: Router,
        private http: HttpClient,
        private alertSerivce: AlertService,
        private accountService : AccountService 
    )
    {
        // if(localStorage.getItem('login') !== null){
        //     // let temp = JSON.parse(localStorage.getItem('login') ?? "{}");
        //     this.userSubject = new BehaviorSubject<User | undefined>(temp);
        //     this.user = this.userSubject.asObservable();
        // }    
        // else{
        //     this.userSubject = new BehaviorSubject<User | undefined>(undefined);
        //     this.user = this.userSubject.asObservable();
        // }  
        this.userSubject = new BehaviorSubject<User | undefined>(undefined);
        this.user = this.userSubject.asObservable();  
    }

    public get webApi(){
        return 'api/users/';
    }

    public get userValue(): Observable<User | undefined> {        
        this.getUserInfo().subscribe(x =>             
            this.userSubject.next(x ?? undefined),
        );      
        return this.user;
    }

    public get lastUserValue(): User | undefined { 
        return this.userSubject.value;
    }

    login(login: string, password: string) { 
        localStorage.setItem('login', login);   
        return this.accountService.login(this._userRole, login, password, 'api/users/').pipe(            
            tap((_user: User) => 
            {   
                this.userSubject.next(_user);                
            })
        );
    }

    logout() {      
        localStorage.removeItem('login');   
        this.userSubject.next(undefined);
        return this.accountService.logout('api/users/').pipe(            
            tap(() => this.alertSerivce.success(`logged out`))
        );
    }

    register(user: Account) {
        return this.accountService.register(user).pipe(
            tap((newUser: User) => 
            {
                this.alertSerivce.success((`Registration successful`));   
                this.userSubject.next(newUser);          
            })
        );
    }

    getUserInfo(){       
        if (this.userSubject.value != undefined){
            return this.accountService.getAccountInfo("api/users/" + this.userSubject.value.login);    
        }  
        else{
            // this.alertSerivce.error("Unauthenticated");
            // throw Error("Unauthenticated");
            return of(undefined);
        }
    }

    update(user: Account): Observable<any>{
        return this.accountService.update(user).pipe(
            tap((newUser: User) => 
            {
                if(user.login == this.userSubject.value?.login){
                    this.alertSerivce.success((`Registration successful`));   
                    this.userSubject.next(newUser);          
                }
            })
        );
    }

    delete(login: string) {
        return this.accountService.delete(login).pipe(map(x => {
                if (login == this.userSubject.value?.login) {
                    this.logout();
                }
                return x;
            }));
    }
}