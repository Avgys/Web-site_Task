import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, UserService} from '@app/services';
import { AppComponent } from '@app/app.component';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private userService: UserService
    ) { 
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.form = this.formBuilder.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();

        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.userService.login(this.form.controls.login.value, this.form.controls.password.value)
            .pipe(first())
            .subscribe(                  
                data => {
                    this.alertService.success(`logged by login=${data.login}`);
                    this.router.navigate([this.returnUrl]);                    
                },              
                error => {
                    this.loading = false;                    
                    this.alertService.error(error);
                    this.submitted = false;
                }
        )
    }
}