import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../features/auth/services/auth.service";
import {User} from "../../../features/user/models/user.model";
import {StorageService} from "../../../features/storage/services/storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {first} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  loading = false;
  submitted = false;
  error = '';
  constructor(private authService: AuthService, private storageService: StorageService,private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    // if (this.authService.userValue) {
    //   this.router.navigate(['/']);
    // }
  }

  // login() {
  //   this.authService.logIn(this.username, this.password).subscribe(response => {
  //     console.log(this.username);
  //     console.log(this.password);
  //       const user: User = {
  //         id: response.user.id,
  //         username: response.user.username,
  //         email: response.user.email,
  //         password: response.user.password,
  //         firstName: response.user.firstName,
  //         lastName: response.user.lastName,
  //         role: response.user.role,
  //         token: response.token
  //       };
  //       localStorage.setItem('user', JSON.stringify(user));
  //       localStorage.setItem('authToken', user.token);
  //       this.authService.isAuthenticated = true;
  //       this.authService.userSubject.next(user);
  //       console.table(user);
  //       return user;
  //   });
  // }

  onSubmit() {
    this.submitted = true;

    this.error = '';
    this.loading = true;
    this.authService.login(this.username, this.password)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from route parameters or default to '/'
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }



}
