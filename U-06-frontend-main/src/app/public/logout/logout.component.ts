import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    // Remove token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('id');

    // Reload the page to reflect the changes
    this.router.navigate(['/']);
  }
}
