import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoingService {

  constructor(private http:HttpClient, @Inject('apiUrl') private apiUrl) { }

  addDoings(obj){
    return this.http.post( this.apiUrl + '/doings',obj);
  }

  getAllDoings(){
    return this.http.get( this.apiUrl +'/doings');
  }

  updateDoing(obj){
    return this.http.patch( this.apiUrl +'/doings',obj);
  }

  removeDoings(id){
    return this.http.delete( this.apiUrl +'/doings/' + id);
  }
}
