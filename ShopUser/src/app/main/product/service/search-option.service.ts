import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchOptionGroup } from '../model/search-option.model';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SearchOptionService {

  constructor(private http: HttpClient) { }

  getSearchOptionByCategoryIds(categoryIds: string[]): Promise<SearchOptionGroup> {
    return new Promise((resolve, reject) => {
      // 카테고리 ID들을 쿼리 스트링으로 변환
      const queryString = categoryIds.map(id => `categoryIds=${id}`).join('&');
      // 최종 URL 생성
      const url = `${environment.REST_API_ADDR}/search-option-groups/by-category-ids?${queryString}`;

      // HTTP GET 요청
      this.http.get<{ result: SearchOptionGroup }>(url)
        .subscribe({
          next: (res) => {
            resolve(res.result as SearchOptionGroup);
          },
          error: (error) => {
            reject(error);
          }
        });
    });
  }

  getSearchOption(): Promise<SearchOptionGroup> {
    return new Promise((resolve, reject) => {
      this.http.get<{ result: any }>(`${environment.REST_API_ADDR}/search-option-groups`)
        .subscribe({
          next: (res) => {
            resolve(res.result as SearchOptionGroup)
          },
          error: (error) => {
            reject(error);
          }
        })
    })
  }


}
