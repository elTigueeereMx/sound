import { Component } from '@angular/core';
import { ANIMALES } from "../../data/data.animales";
import {Animal} from "../../interfaces/animal.interface";
import { Refresher, reorderArray } from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal[] = [];
  audio = new Audio;
  audioTiempo: any;
  ordenando:boolean=false;
  constructor() {
    this.animales = ANIMALES.slice(0);
    //this.animales[0].audio
  }
  //funcion del click
  reproducir( animal:Animal){
    this.pausarAudio( animal );
    if(animal.reproduciendo == true ){
      animal.reproduciendo=false;
      return;
    }
    console.log( animal );
    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();
    animal.reproduciendo = true;
    this.audioTiempo = setTimeout( ()=> animal.reproduciendo = false, animal.duracion * 1000 );
  }
  private pausarAudio( animalSeleccionado:Animal){
    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime=0;
    for( let animal of this.animales ){
      if ( animal.nombre != animalSeleccionado.nombre){
        animal.reproduciendo=false;
      }
    }
  }
  eliminarAnimal( index:number ){
    console.log(index);
    this.animales.splice( index, 1);
  }
  doRefresh( refresher ){
    console.log("refrescando", refresher);
    setTimeout( () => {
      console.log("tiempó terminado");
      this.animales = ANIMALES.slice(0);
      refresher.complete();
      
    },2000 )
  }
  reordenarAnimales( indices:any ){
    console.log("indices", indices);
    this.animales = reorderArray(
      this.animales, indices);

  }

}
