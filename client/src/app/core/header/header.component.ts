import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  homeClick = () => {
    this.router.navigate(['/'], {
      relativeTo: this.route,
    });
  };
}
