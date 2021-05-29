import {Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'front-app';
  isSigned: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!sessionStorage.getItem('token'));

  isLog(event: boolean) {
    this.isSigned.next(event);
  }
}
