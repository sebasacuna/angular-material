import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstants} from '../../../util/app-constants';
import {PeriodicElement} from '../models/element.model';

@Injectable({
  providedIn: 'root'
})
export class ElementService {

  private baseUrl: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
    this.baseUrl = AppConstants.baseURL;
  }

  getElements() {
    return this.http.get<PeriodicElement[]>(this.baseUrl + '/element');
  }

  createElements(data) {
    return this.http.post<PeriodicElement[]>(this.baseUrl + '/element', {
      number: data.number,
      name: data.name,
      weight: data.weight,
      symbol: data.symbol
    });
  }

  updateElements(data) {
    return this.http.patch<PeriodicElement[]>(this.baseUrl + '/element', {
      number: data.number,
      name: data.name,
      weight: data.weight,
      symbol: data.symbol
    });
  }

  deleteElement(numberId) {
    console.log('delete Element');
    console.log(numberId);
    return this.http.delete(this.baseUrl + '/element', {params: {id: numberId.id}});
  }

}
