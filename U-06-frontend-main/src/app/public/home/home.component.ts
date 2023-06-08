import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/interface/food';
import { HomeService } from './home.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pageTitle: string = 'Recipe App';
  food: Food[] = [];
  filteredFood: any[] = [];
  inputFilter: string = '';
  selectFilter: string = '';
  errMessage: string = '';

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    console.log('I am loading on ngOnInit');
    console.log('Initial food:', this.food);
    console.log('Initial filteredFood:', this.filteredFood);
  }

  updateFilteredFood(): void {
    console.log('Updating filteredFood');
    const filteredFoodRequest = this.homeService.getFood(this.inputFilter, this.selectFilter);

    filteredFoodRequest.subscribe({
      next: (filteredFood) => {
        this.filteredFood = filteredFood;
        console.log('Updated filteredFood:', this.filteredFood);

      },
      error: (err) => {
        this.errMessage = err;
        console.error('API error:', err);
      },
    });
  }

  searchRecipes(): void {
    if (!this.inputFilter) {
      return; // If search input is empty, do nothing
    }
  
    console.log('I am loading on searchRecipes');
    const searchTerm = this.inputFilter; // Get the search term from inputFilter
    const selectFilter = this.selectFilter; // Get the select filter
    this.homeService.getFood(searchTerm, selectFilter).subscribe({
      next: (food) => {
        this.food = food;
        console.log('Updated food:', this.food);
        this.filteredFood = [];
        this.updateFilteredFood(); // Update filteredFood after receiving new food data
      },
      error: (err) => {
        this.errMessage = err;
        console.error('API error:', err);
      },
      complete: () => {
        console.log('Search completed');
      },
    });
  
    console.log('Search recipes:', this.inputFilter);
    console.log('Search recipes:', this.selectFilter);
  }
  
  resetSelectFilter(): void {
    this.selectFilter = ''; // Reset the selectFilter value
  }
  
}
