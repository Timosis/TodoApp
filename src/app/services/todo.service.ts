import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient, @Inject('apiUrl') private apiUrl) { }

  addToDo(obj){
    return this.http.post( this.apiUrl + '/posts',obj);
  }

  getAllToDos(){
    return this.http.get( this.apiUrl +'/posts');
  }

  updateToDo(obj){
    return this.http.patch( this.apiUrl +'/posts',obj);
  }

  removeToDo(id){
    return this.http.delete( this.apiUrl +'/posts/' + id);
  }
}
