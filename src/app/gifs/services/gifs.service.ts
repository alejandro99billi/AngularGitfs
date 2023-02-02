import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' //angular eleva este servicio globalmente en la aplicacion
})
export class GifsService {
  private apiKey: string ='1rDJI7UbxEqv9gvUCJSlM4sO8MLaIVui'
  private serviceUrl: string='http://api.giphy.com/v1/gifs'
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
    
    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','10')
    .set('q', query);
    console.log(params.toString())

    this.htpp.get<SearchGifsResponse>(`${this.serviceUrl}/search`,{ params })
     .subscribe(resp  =>{
      console.log(resp.data)
      this.resultados = resp.data
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
     })
   
 
  }
  constructor(private htpp:HttpClient) {
   if (localStorage.getItem('historial')) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []; 
   }
   this.resultados = JSON.parse(localStorage.getItem('resultados')!)
   }
}
