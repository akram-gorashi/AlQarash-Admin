import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getMasterTableData() {
    return this.http.get<any>('http://localhost:5000/api/MasterTable');
  }

  public createVehicle(vehicleFormData: FormData): Observable<any> {
   console.log(vehicleFormData);

    return this.http.post(this.apiUrl + 'vehicle', vehicleFormData);
  }
}
