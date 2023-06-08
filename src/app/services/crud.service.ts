import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeleteElementCommand } from '../Model/DeleteElementCommand';
import { Observable } from 'rxjs';
import { elementDto } from '../Model/elementDto';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private baseUri = "http://localhost:5123/"

  public headers = new HttpHeaders();

  constructor(private http: HttpClient) { }

  async addElement(data: elementDto): Promise<Observable<any>> {
    console.log(data);
    return this.http.post(this.baseUri+'element', data)
  }

  getElements():Observable<elementDto []> {
    return this.http.get<elementDto []>(this.baseUri+'element')
  }

  deleteElement(id: DeleteElementCommand):Observable<any> {
    return this.http.delete<elementDto []>(this.baseUri+'element/', {body: id});
  }

 async updateElement(data: elementDto):Promise<Observable<any>> {
    console.log(data)
    return this.http.put(this.baseUri+'element', data)
  }

  getElement(id: number):Observable<any> {
    return this.http.get<elementDto>(this.baseUri+'element/single/'+id)
  }
}
