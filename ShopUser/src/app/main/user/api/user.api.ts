import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environments";
import {SignUpRequest} from "../model/request/sign-up.request";

@Injectable({
  providedIn: 'root'
})
export class UserApi {

  constructor(private http: HttpClient) { }

  public signUp(request: SignUpRequest) : Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.REST_API_ADDR}/users/signup`, request)
        .subscribe({
          next: (result) => {
            resolve();
          },
          error: (error) => {
            reject(error);
          },
        });
    });
  }
}
