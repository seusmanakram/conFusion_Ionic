import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http ,Response} from '@angular/http';
import {Dish} from '../../shared/dish';
import {baseURL} from '../../shared/baseurl';
import {ProcessHttpmsgProvider} from '../process-httpmsg/process-httpmsg';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';



/*
  Generated class for the DishProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DishProvider {

  constructor(public http: Http,
    private processHttpmsgService:ProcessHttpmsgProvider ) {
    console.log('Hello DishProvider Provider');


  }



  getDishes(): Observable<Dish[]>{

    return this.http.get(baseURL + 'dishes')
      .map(res => {return this.processHttpmsgService.extractData(res);})
      .catch(error => {return this.processHttpmsgService.handleError(error);});

  }


  getDish(id:number):Observable<Dish>{


    return this.http.get(baseURL + 'dishes/' + id)
    .map(res => {return this.processHttpmsgService.extractData(res);})
    .catch(error => {return this.processHttpmsgService.handleError(error);});




  }

  getFeaturedDish():Observable<Dish>{

    
    return this.http.get(baseURL + 'dishes?featured=true')
    .map(res => {return this.processHttpmsgService.extractData(res)[0];})
    .catch(error => {return this.processHttpmsgService.handleError(error);});
    
  }




}
