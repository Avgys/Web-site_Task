import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap, throwIfEmpty } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertService, AccountService } from '.';
import { User, Account, Role } from '../_models';
import { RoleType } from '@app/_models/role';

@Injectable({ providedIn: 'root' })
export class UserService {

    private roleName: string;    
    private userSubject: BehaviorSubject<User | undefined>;
    public user: Observable<User | undefined>;
    public users: User[] | undefined;

    private role : RoleType | undefined = undefined;
    private currentApi: string;    

    constructor(
        private router: Router,
        private http: HttpClient,
        private alertSerivce: AlertService,
        private accountService : AccountService 
    )
    {        
        this.users = undefined;
        this.userSubject = new BehaviorSubject<User | undefined>(undefined);
        this.user = this.userSubject.asObservable();
        // if (this.role === undefined){
        //     this.role = RoleType.User;     
        //     this.roleName = "user";       
        //     this.currentApi = 'api/accounts/';  
        // }        
            
        this.role = RoleType.User;  
        this.roleName = "user";      
        this.currentApi = 'api/accounts/';
    }

    public set currRole(role: RoleType){        
        this.role = role;
        if(this.role == RoleType.User){ 
            this.roleName = "user";
            this.currentApi = 'api/accounts/';  
        }
        else if(this.role == RoleType.Admin){ 
            this.roleName = "admin";                      
            this.currentApi = 'api/accounts/';
        }
    }

    public get currRole(){
        return this.currRole;
    }

    public get webApi(){
        return this.currentApi;
    }

    public get userValue(): Observable<User | undefined> {        
        this.getUserInfo().subscribe(x =>  {
            if(x !== undefined)   {
               this.userSubject.next(x[0]);
            }   
            else{     
                this.userSubject.next(undefined);
            }
        });      
        return this.user;
    }

    public get lastUserValue(): User | undefined { 
        return this.userSubject.value;
    }

    login(login: string, password: string) { 
        localStorage.setItem('login', login);   
        return this.accountService.login(this.roleName, login, password, this.currentApi).pipe(            
            tap((_user: User) => 
            {   
                this.userSubject.next(_user);                
            })
        );
    }

    logout() {      
        localStorage.removeItem('login');   
        this.userSubject.next(undefined);
        return this.accountService.logout(this.currentApi).pipe(            
            tap(() => this.alertSerivce.success(`logged out`))
        );
    }

    register(user: Account) {
        return this.accountService.register(user, this.currentApi).pipe(
            tap((newUser: User) => 
            {
                this.alertSerivce.success((`Registration successful`));   
                this.userSubject.next(newUser);          
            })
        );
    }

    getUserInfo(login: string = "", isCurrent : boolean = true){       
        if (login == ""){
            return this.accountService.getAccountInfo(this.currentApi, login, `?isCurrent=${isCurrent}`).pipe(            
                tap((_user) => 
                {   if (_user !== undefined)
                    this.userSubject.next(_user[0]);                
                }));    
        }  
        else if(login.length > 0){
            return this.accountService.getAccountInfo(this.currentApi, login,  `?isCurrent=false`).pipe(            
                tap((_user) => 
                {   if (_user !== undefined)
                    this.userSubject.next(_user[0]);                
                }));  
        }
        else{
            return of(undefined);
        }
    }

    update(user: Account): Observable<any>{
        return this.accountService.update(user, this.currentApi).pipe(
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
        return this.accountService.delete(login, this.currentApi).pipe(map(x => {
            if (login == this.userSubject.value?.login) {
                this.logout();
            }
            return x;
        }));
    }

    getUsers(count: number, offset: number){
        let options = `?isCurrent=false&count=${count}&offset=${offset}`;
        return this.accountService.getAccountInfo(this.currentApi, "", options).pipe(tap(x => {
            this.users = x;
            return x;
        }));  
    }
}