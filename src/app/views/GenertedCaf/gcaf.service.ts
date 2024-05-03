import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CAFApplicationDataRecord } from 'app/shared/models/Cardholder';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'environments/environment.prod';
import { LocationService } from '../home/location-service.service';
@Injectable({
  providedIn: 'root'
})
export class GcafService {

  items: any[];
  private apiUrl :string;
  constructor(
    private http: HttpClient,
    private JwtAuthService :JwtAuthService,
    private locationService: LocationService
  ) {
    const currentHost = this.locationService.getHost();
    this.apiUrl = `${currentHost}/api/auth/file`; 
 
  }

  getItems(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.JwtAuthService.getJwtToken(),
    
    });
    return this.http.get<any[]>(`${this.apiUrl}/allCAF`,{ headers })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
    
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
   
    return throwError(
      'Something bad happened; please try again later.');
  }

  getnotgenerated(): Observable<CAFApplicationDataRecord[]> {
    return this.getItems().pipe(
      map((data: CAFApplicationDataRecord[]) => data.filter(holder => holder.cfagenerated == false))
    );
  }
  


  generateCafFile(customerIds: number[]): Observable<HttpResponse<string>> {
    const url = `${this.apiUrl}/generate-caf-file`;
    const params = new HttpParams().set('customerIds', customerIds.join(','));

    return this.http.get<string>(url, { params, observe: 'response', responseType: 'text' as 'json' });
  }

}
