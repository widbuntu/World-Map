import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule for basic Angular directives
import { RouterModule } from '@angular/router';  // Import RouterModule for routing

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,  // Make the component standalone
  imports: [CommonModule, RouterModule]  // Import necessary modules
})
export class NavbarComponent { }
