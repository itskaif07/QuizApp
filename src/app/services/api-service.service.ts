import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor() { }

  http = inject(HttpClient)

  getQuestions(categoryId:string, difficulty:string){
   return this.http.get(`https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`)
  }

  getCategories(){
    return this.http.get(`https://opentdb.com/api_category.php`)
  }
}
