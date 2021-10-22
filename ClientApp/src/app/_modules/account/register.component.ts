import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '../../_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { 
        this.form = this.formBuilder.group({});
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            login: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
        });
    }


    onSubmit() {
        this.submitted = true;
        this.alertService.clear();
        
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success(
                            'Registration successful', { keepAfterRouteChange: true }
                        );
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}