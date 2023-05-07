import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { NavigationExtras, Router } from '@angular/router';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  city = '';

  constructor(private router: Router, protected themeService: ThemeService) {}

  getWeather() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        city: this.city
      }
    }

    this.router.navigate(['/search'], navigationExtras);
  }
}
