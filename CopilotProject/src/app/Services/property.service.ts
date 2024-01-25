import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Property } from '../Models/Property';
import { PROPERTIES_API, PROPERTIES_LANDLORDID_API } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {


  constructor(private http: HttpClient) { }

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(PROPERTIES_API);
  }

  addProperty(property: Property): Observable<Property> {
    return this.http.post<Property>(PROPERTIES_API, property)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPropertyById(id: string): Observable<Property> {
  const url = `${PROPERTIES_API}/${id}`;
  return this.http.get<Property>(url)
    .pipe(
      catchError(this.handleError)
    );
}

getPropertiesByLandlordId(id: string): Observable<Property[]> {
  const url = (PROPERTIES_LANDLORDID_API + id);
  return this.http.get<Property[]>(url);
}
  private handleError(error: HttpErrorResponse) {
    // Handle the error based on its status code or show a generic error message
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
