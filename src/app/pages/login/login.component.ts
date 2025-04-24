import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  form: FormGroup;
  errorMsg = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe({
        next: (res: any) => {
          this.auth.guardarToken(res.token);
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          this.errorMsg = err.error?.mensaje || 'Error de autenticación';
        }
      });
    }
  }
}
