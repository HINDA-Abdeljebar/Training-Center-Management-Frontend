import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }



  login() {

    this.service.login(this.loginForm.value).subscribe((response) => {
      console.log(response);

      if (response.token) {
        const jwtToken = response.token;
        const role = response.role;

        localStorage.setItem('ROLE', role);
        localStorage.setItem('JWT', jwtToken);
        this.router.navigateByUrl('/dashboard');
        this.toast.showInfo(`Welcome back ${role}`)
      }
    });
  }
}
