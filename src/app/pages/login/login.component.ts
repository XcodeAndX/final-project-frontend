import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule, RouterModule, CommonModule]
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
  
          const decoded: any = jwtDecode(res.token);
          const role = decoded.role;
  
          if (role === 'admin') {
            this.router.navigate(['/usuarios']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        error: err => {
          this.errorMsg = err.error?.mensaje || 'Error de autenticación';
        }
      });
    }
  }
}