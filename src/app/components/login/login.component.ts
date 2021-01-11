import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = '';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {

    if (this.loginForm.invalid) {
      return;
    }

    const formUserObj = this.loginForm.value;
    this.loginService.login(formUserObj)
      .subscribe(
        data => {
          if (data.ok) {
            const user: User = new User();
            user.authdata = this.loginService.encodeAuthHeader(this.loginForm.value.email, this.loginForm.value.password);
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.loginService.userBehaviorSubject.next(user);
            this.router.navigate(['/']);
          }
        },
        error => {
          this.error = error;
        });
  }
}
