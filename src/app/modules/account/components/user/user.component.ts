import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserI } from '../../interfaces/userI';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: UserI;

  constructor(
    private authService: AuthService
  ) {  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

}
