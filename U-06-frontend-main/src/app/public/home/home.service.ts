import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Food } from 'src/app/interface/food';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private baseUrl = 'https://api.edamam.com/api/recipes/v2?type=public';
  private appId = '7a7fdba1';
  private appKey = 'fd153761c3140208eed6488f20ad26e9';

  constructor(private httpClient: HttpClient) {}

  getFood(searchTerm: string, selectFilter: string): Observable<Food[]> {
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const encodedSelectFilter = encodeURIComponent(selectFilter);
    let url = `${this.baseUrl}&q=${encodedSearchTerm}&app_id=${this.appId}&app_key=${this.appKey}`;

    if (selectFilter) {
      url += `&health=${encodedSelectFilter}`;
    }

    return this.httpClient
      .get<any>(url)
      .pipe(
        tap((response: any) => {
          console.log('API response:', response);
        }),
        map((response: any) => {
          return response.hits.map((hit: any) => hit.recipe);
        }),
        catchError(this.errorHandler)
      );
  }

  find(id: string | number): Observable<Food> {
    const url = `${this.baseUrl}/${id}`;

    return this.httpClient.get<Food>(url).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
