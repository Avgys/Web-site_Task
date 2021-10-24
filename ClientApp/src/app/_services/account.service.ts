import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertService } from '.';
import { Account } from '../_models';

@Injectable({ providedIn: 'root' })
export class AccountService {

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    private isHttpAvailable = true;

    constructor(
        private router: Router,
        private http: HttpClient,
        private alertSerivce: AlertService
    )
    {          
    }    

    login(role: string, login: string, password: string, currentApi: string) {   
        let url = `${environment.apiUrl}/` + currentApi + 'login'; 
        return this.http.post<Account>(url, {role, login, password }, this.httpOptions).pipe(            
            catchError(err => {
                this.handleError<Account>(`login`);
                throw 'Wrong login or password';
            })
        );
    }

    logout(currentApi: string) {
        this.isHttpAvailable = false;
        setTimeout(() => this.isHttpAvailable = true, 150);  
        let url = `${environment.apiUrl}/` + currentApi + 'logout';        
        return this.http.post(url, null, this.httpOptions).pipe(            
            tap(() => this.alertSerivce.success(`logged out`)),
            catchError(err => {
                this.handleError(`logout`);
                throw err;
            })
        );
    }

    register(account: Account, currentApi: string) {  
        if (account.password == account.confirmPassword){      
            let url = `${environment.apiUrl}/` + currentApi + 'register';  
            return this.http.post<Account>(url, account, this.httpOptions).pipe(
                catchError(this.handleError<Account>(`register`))
            );
        }
        throw Error("password not equal to confirmPassword");
    }

    getAccountInfo(currentApi: string, login: string, isCurrent : boolean ): Observable<Account[] | undefined>{
        if (this.isHttpAvailable){            
            setTimeout(() => this.isHttpAvailable = true, 150);  
            let url = `${environment.apiUrl}/` + currentApi + login + `?isCurrent=${isCurrent}`;        
            return this.http.get<Account[]>(url, this.httpOptions).pipe(              
                catchError(this.handleError<Account[]>(`getAccountInfo`))
            );    
        } 
        return of(undefined);  
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {         
        //  this.alertSerivce.error(error);
         return of(result as T);
        };
    }

    update(account: Account, currentApi: string): Observable<any>{
        let url = `${environment.apiUrl}/` + currentApi + account.login;  
        return this.http.put<Account>(url, account, this.httpOptions).pipe(            
            catchError(this.handleError<any>('update Info'))
        );
    }

    delete(login: string, currentApi: string) {
        let url = `${environment.apiUrl}/` + currentApi + login;  
        return this.http.delete(url);
    }
}