import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap, throwIfEmpty } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertService, AccountService } from '.';
import { User, Account, RemoteAccount, RoleType } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {  
    private userSubject: BehaviorSubject<Account | undefined>;
    public user: Observable<Account | undefined>;
    public users: Account[] | undefined;
    private roleType : RoleType;
    private currentApi: string;    

    constructor(
        private router: Router,
        private http: HttpClient,
        private alertSerivce: AlertService,
        private accountService : AccountService
    )
    {   
        this.users = undefined;
        this.userSubject = new BehaviorSubject<Account | undefined>(undefined);
        this.user = this.userSubject.asObservable();     
        this.roleType = RoleType.User;   
        this.currentApi = 'api/accounts/';
        if (localStorage.getItem('user') !== null){
            let user: Account = JSON.parse(localStorage.getItem('user') ?? 'undefined');
            this.roleType = user.role;
            this.getUserInfo(user.login ?? '').subscribe(x => {
                if(x !== undefined)   {
                        this.userSubject.next(x[0]);
                    }   
                    else{     
                        this.userSubject.next(undefined);
                    }
            })
        }
    }

    roleTypeToString(roleType: RoleType = this.roleType): string {
        if (roleType == RoleType.Admin){
            return 'admin';
        }else if(roleType == RoleType.User){            
            return 'user';
        }else{
            return 'No role'
        }
    }

    public set currRoleType(roleType: RoleType){        
        this.roleType = roleType;
    }

    public get currRole(): RoleType{
        return this.userSubject.value?.role ?? this.roleType ?? RoleType.User;
    }

    public get webApi(){
        return this.currentApi;
    }

    public get userValue(): Observable<Account | undefined> { 
        if (null !== (this.userSubject.value?.login ?? localStorage.getItem('user'))){               
            this.getUserInfo(this.userSubject.value?.login ?? JSON.parse(localStorage.getItem('user') ?? '').login).subscribe(x =>  {
                if(x !== undefined)   {
                this.userSubject.next(x[0]);
                }   
                else{     
                    this.userSubject.next(undefined);
                }
            });                
            return this.user;
        }else{
            return of(undefined);
        } 
    }

    public get lastUserValue(): Account | undefined { 
        return this.userSubject.value;
    }

    login(login: string, password: string) { 
        return this.accountService.login(this.roleTypeToString(), login, password, this.currentApi).pipe(            
            tap((_user: Account) => 
            {   
                this.userSubject.next(_user);                
            })
        );
    }

    logout() {      
        localStorage.removeItem('user');     
        this.userSubject.next(undefined);
        return this.accountService.logout(this.currentApi).pipe(            
            tap(() => this.alertSerivce.success(`logged out`))
        );
    }

    register(user: RemoteAccount) {
        return this.accountService.register(user, this.currentApi).pipe(
            tap((newUser: Account) => 
            {
                this.alertSerivce.success((`Registration successful`));   
                this.userSubject.next(newUser);          
            })
        );
    }

    getUserInfo(login: string = this.userSubject.value?.login ?? ""){       
        if (login == ""){
            return this.accountService.getAccountInfo(this.currentApi, login).pipe(            
                tap((_user) => 
                {   if (_user !== undefined)
                    this.userSubject.next(_user[0]);                
                }));    
        }  
        else if(login.length > 0){
            return this.accountService.getAccountInfo(this.currentApi, login).pipe(            
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
            tap((newUser: Account) => 
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
        let options = `?count=${count}&offset=${offset}`;
        return this.accountService.getAccountInfo(`${this.currentApi}users`, "", options).pipe(tap(x => {
            this.users = x;
            return x;
        }));  
    }
}