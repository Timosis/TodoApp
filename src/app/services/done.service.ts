import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoneService {

  constructor(private http:HttpClient, @Inject('apiUrl') private apiUrl) { }

  addDone(obj){
    return this.http.post( this.apiUrl + '/dones',obj);
  }

  getAllDones(){
    return this.http.get( this.apiUrl +'/dones');
  }

  updateDone(obj){
    return this.http.patch( this.apiUrl +'/dones',obj);
  }

  removeDone(id){
    return this.http.delete( this.apiUrl +'/dones/' + id);
  }
}
