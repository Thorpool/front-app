import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {LoginPopupComponent} from '../login-popup/login-popup.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-nav-log',
  templateUrl: './nav-log.component.html',
  styleUrls: ['./nav-log.component.scss']
})
export class NavLogComponent implements OnInit {
  @Output() isLog = new EventEmitter<boolean>();
  isSigned: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!sessionStorage.getItem('token'));
  sub;
  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.isSigned.next(!!sessionStorage.getItem('token'));
    if (!this.isSigned.getValue()) {
      this.login();
    }
  }

  login() {
    const dialogRef = this.dialog.open(LoginPopupComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.isLog.emit(true);
      this.isSigned.next(true);
      this.router.navigate(['/']);
    });
  }

  logout() {
    sessionStorage.clear();
    this.isSigned.next(false);
    this.isLog.emit(false);
    this.router.navigate(['/']);
  }


}
