import { HttpClient } from '@angular/common/http';
import to from '@angular/common/locales/to';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Convert {
  
  constructor(private http: HttpClient) {}
  
  getConversion(from: string, to: string, amount: number) {
    const apiUrl = `http://localhost:5000/convert?from=${from}&to=${to}&amount=${amount}`; // Your backend endpoint

    return this.http.get<{ result: string }>(apiUrl);
  }
}