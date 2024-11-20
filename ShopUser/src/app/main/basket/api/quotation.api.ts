import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotationApi {
  constructor(private http: HttpClient) { }

    postQuotationRequest(temp: any): Promise<any> {
      return new Promise((resolve, reject) => {
        this.http.post(`${environment.REST_API_ADDR}/quotation`, temp)
          .subscribe({
            next: (res: any) => {
              resolve(res)
            },
            error: (error) => {
              reject(error);
            }
          })
      })
    }

    downloadQuotation(): Observable<Blob> {
      return this.http.get(`${environment.REST_API_ADDR}/quotation`, { responseType: 'blob' });
    }
    
}
