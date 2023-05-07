import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { WeatherData } from '../weather';
import { ThemeService } from '../theme.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  city!: string;
  data!: WeatherData;
  imgSrc!: string;
  searchLocation = '';
  isLoading = false;

  constructor(
    private apiService: ApiService,
    protected themeService: ThemeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.route.queryParams
    .pipe(
      switchMap((params) => {
        this.city = params['city'];
        return this.apiService.fetchData(this.city).pipe(
          catchError((error) => {
            if (error.status === 400) {
              // Redirect to homepage
              this.router.navigate(['/']);
            }
            return throwError(error);
          })
        );
      })
    )
    .subscribe(
      (data) => {
        this.data = data;
        this.imgSrc = data.current.condition.icon;
        console.log(data);
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  search() {
    const queryParams = { city: this.searchLocation }; // Specify the desired query parameters
    this.router.navigate([], { queryParams: queryParams });
  }
}
