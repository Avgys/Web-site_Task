﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../../_services';

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
        // private alertService: AlertService
    ) { 
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            login: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
        });
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            login: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return  this.form.controls; }

    onSubmit() {
        this.submitted = true;
        // alert(this.form.value);
        // console.log(this.form.value);
        // reset alerts on submit
        // this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    // this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error => {
                    // this.alertService.error(error);
                    this.loading = false;
                });
    }
}