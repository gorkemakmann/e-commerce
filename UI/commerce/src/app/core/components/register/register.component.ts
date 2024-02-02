import { Component } from '@angular/core';
import {AuthService} from "../../../features/auth/services/auth.service";
import {StorageService} from "../../../features/storage/services/storage.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = "";
  password: string = "";
  email: string = "";
  firstName: string = "";
  lastName: string = "";
  loading = false;
  submitted = false;
  error = '';
  message: any = null;

  constructor(private authService: AuthService, private storageService: StorageService,private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {  }


  register() {
    this.submitted = true;

    this.error = '';
    this.loading = true;
    this.authService.register(this.username, this.password,this.email,this.firstName,this.lastName)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from route parameters or default to '/'
          this.message = 'You are successfully registered.'
          //const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate(['login']);
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }


}
