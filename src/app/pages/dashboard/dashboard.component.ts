import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  today: Date = new Date();

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.cerrarSesion(); // Asegúrate que AuthService tenga esta función
    this.router.navigate(['/login']);
  }
}
