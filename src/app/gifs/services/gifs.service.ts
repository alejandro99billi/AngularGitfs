import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' //angular eleva este servicio globalmente en la aplicacion
})
export class GifsService {
  private apiKey: string ='1rDJI7UbxEqv9gvUCJSlM4sO8MLaIVui'
  private _historial: string[]=[];
  //TODO cambiar any
  public resultados: Gif[]= [];
  get historial(){

    return [...this._historial];
  }

  buscarGifs(query: string){
   
    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }


    this.htpp.get<SearchGifsResponse>(`http://api.giphy.com/v1/gifs/search?api_key=1rDJI7UbxEqv9gvUCJSlM4sO8MLaIVui&q=${ query }&limit=10`)
     .subscribe(resp  =>{
      console.log(resp.data)
      this.resultados = resp.data
     })
   
 
  }
  constructor(private htpp:HttpClient) {
   if (localStorage.getItem('historial')) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []; 
   }
   }
}
