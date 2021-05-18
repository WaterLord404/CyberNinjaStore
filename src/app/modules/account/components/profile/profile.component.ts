import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserI } from '../../interfaces/userI';

@Component({
  selector: 'app-user',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserI;

  constructor(
    private authService: AuthService
  ) {  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

}
