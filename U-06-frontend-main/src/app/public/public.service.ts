import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class PublicService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PUT',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  };

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Return true if token exists, false otherwise
  }

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    const url = 'http://localhost:8000/api/login'; // Update the URL with your actual endpoint
    return this.http.post(url, data);
  }

  register(data: any): Observable<any> {
    const url = 'http://localhost:8000/api/register'; // Update the URL with your actual endpoint
    return this.http.post(url, data, this.httpOptions);
  }
}
