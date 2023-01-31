import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //angular eleva este servicio globalmente en la aplicacion
})
export class GifsService {
   
  private _historial: string[]=[];
  get historial(){

    return [...this._historial];
  }

  buscarGifs(query: string){
   
    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
    }
    console.log(this._historial)
    this._historial = this._historial.splice(0,10);
  }
  constructor() { }
}
