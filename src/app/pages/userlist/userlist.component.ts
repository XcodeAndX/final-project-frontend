import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userlist',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent implements OnInit{
  usuarios: any[] = [];
  errorMsg = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.obtenerUsuarios().subscribe({
      next: (res) => this.usuarios = res,
      error: (err) => this.errorMsg = err.error?.message || 'Error al cargar usuarios.'
    });
  }

}
