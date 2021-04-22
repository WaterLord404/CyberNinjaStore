import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.confirmAccount(this.route.snapshot.paramMap.get('token')).pipe(finalize(
      () => this.router.navigate(['/account/login'])
    )).subscribe(
      () => this.snackBarService.popup(212)
    );
  }

}
