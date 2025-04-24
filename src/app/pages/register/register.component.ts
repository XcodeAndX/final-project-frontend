import { Component } from '@angular/core';
import { FormBuilder, Validators,ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface RegisterData{
  username: string;
  email: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [ReactiveFormsModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user'] // puedes cambiarlo si hay más roles
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => this.router.navigate(['/login']),
        error: err => this.errorMessage = err.error?.message || 'Error al registrar.'
      });
    }
  }
}
