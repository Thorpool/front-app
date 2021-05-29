import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {of, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material';
import {catchError, tap} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit, OnDestroy {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  error: string;
  subs: Subscription[] = [];
  constructor(private userService: UserService,
              private router: Router,
              private dialogRef: MatDialogRef<LoginPopupComponent>,
              private fb: FormBuilder) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  onSubmit() {
    const data = this.loginForm.value;
    const loginSub = this.userService.login(data).pipe(
      tap((token: IToken) => {
        sessionStorage.setItem('token', token.accessToken);
        this.dialogRef.close(true);
      }),
      catchError((err) => {
        if (err.status === 400) {
          this.loginForm.get('password').setValue('');
          this.error = 'Mauvais login ou mot de passe';
        }
        return of();
      })).subscribe();
    this.subs.push(loginSub);
  }
}
