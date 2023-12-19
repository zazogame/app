import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { SongtestComponent } from '../songtest/songtest.component';
import { FormsModule } from '@angular/forms';
import { FinaltestComponent } from '../finaltest/finaltest.component';
@Component({
  selector: 'app-chooser',
  standalone: true,
  imports: [CommonModule, CdkDropList,CdkDrag, SongtestComponent, FormsModule, FinaltestComponent],
  templateUrl: './chooser.component.html',
  styleUrl: './chooser.component.css'
})
export class ChooserComponent implements OnInit{
  events = ['Salida Animal Crossing 1','Estreno Harry Potter 1', 'Estreno Attack On Titan', 'Aitana entra a OT', 'Confinamiento Covid'];
  correctOrder = ['Salida Animal Crossing 1','Estreno Harry Potter 1', 'Estreno Attack On Titan', 'Aitana entra a OT', 'Confinamiento Covid'];
  mostrarMensajeError = false;
  cuentaAtras = 10;
  formatoCuentaAtras = '00:10';
  showPuzzle: boolean = false;
  mostrarCorrecto = false;
  ultimopuzzle: boolean = false;

  ngOnInit() {
    this.shuffleEvents();
  }
  cambiarUltimoPuzzle(valor: boolean) {
    this.ultimopuzzle = valor;
    if(this.ultimopuzzle){
      this.showPuzzle=false;
    }
  }
  private shuffleEvents(): void {
    for (let i = this.events.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.events[i], this.events[j]] = [this.events[j], this.events[i]];
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.events, event.previousIndex, event.currentIndex);
  }
  
  
  validarOrden(): void {
    const ordenCorrecto = JSON.stringify(this.events) === JSON.stringify(this.correctOrder);
    if (ordenCorrecto) {
      alert("CORRECTO! Siguiente prueba...")
      this.showPuzzle = true;
    
    } else {
      this.mostrarMensajeError = true;
      this.iniciarCuentaAtras();

            // Después de 10 segundos, ocultar el mensaje de error y reordenar aleatoriamente los eventos
            setTimeout(() => {
              this.mostrarMensajeError = false;
              this.shuffleEvents();
            }, 10000);
    }
  }

  iniciarCuentaAtras(): void {
    const intervalId = setInterval(() => {
      this.cuentaAtras -=0.1;
      this.cuentaAtras = Math.round(this.cuentaAtras * 10) / 10;

      this.formatoCuentaAtras = this.formatoTiempo(this.cuentaAtras);

      // Si la cuenta atrás llega a 0, detener el intervalo
      if (this.cuentaAtras <= 0) {
        clearInterval(intervalId);
        this.cuentaAtras = 10; // Reiniciar la cuenta atrás para la próxima vez
        this.formatoCuentaAtras = '00:10'; // Reiniciar el formato
      }
    }, 100);
  }

  formatoTiempo(segundos: number): string {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60);

    return `${this.agregarCeros(minutos)}:${this.agregarCeros(segundosRestantes)}`;
  }
  agregarCeros(valor: number): string {
    return valor < 10 ? `0${valor}` : valor.toString();
  }
}
