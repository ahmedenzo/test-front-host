import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardHolder } from 'app/shared/models/Cardholder';
import { Observable } from 'rxjs';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { environment } from 'environments/environment.prod';
import { LocationService } from '../home/location-service.service';
@Injectable({
  providedIn: 'root'
})
export class PbfService {
  items: any[];
  private apiUrl :string;
  private apiUrlcard :string;
  

  constructor(
    private http: HttpClient,
    private JwtAuthService :JwtAuthService,
    private locationService: LocationService
  ) {
    const currentHost = this.locationService.getHost();
    this.apiUrl = `${currentHost}/api/auth/file`; 
    this.apiUrlcard = `${currentHost}/api/auth/card`; 

  }

  //******* Implement your APIs ********
  getItems(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.JwtAuthService.getJwtToken(),
    
    });
    return this.http.get<any[]>(`${this.apiUrl}/allPBF`,{ headers })
  }
  updatePBFRecord(pbfId: number, newRecord: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlcard}/pbf-record/${pbfId}`, newRecord);
  }

}
