import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from '../model/common.response';
import { environment } from '../../../../environments/environments';
import { ProductConsultingRegistration } from '../model/product-consulting-registration';

@Injectable({
  providedIn: 'root'
})
export class ConsultingApi {
  constructor(private http: HttpClient) { }

    // 제품 등록하기
    async registerConsulting(consulting: ProductConsultingRegistration): Promise<CommonResponse> {
      console.log('보내질 값:', consulting);
      return new Promise((resolve, reject) => {
        this.http.post(`${environment.REST_API_ADDR}/consulting`, consulting)
          .subscribe({
            next: (response: any) => {
              resolve(response);
            },
            error: (error) => {
              reject(error);
            }
          });
      });
    }
}
