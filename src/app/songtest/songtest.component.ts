import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-songtest',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './songtest.component.html',
  styleUrl: './songtest.component.css'
})
export class SongtestComponent {   fraseCeslebre = '"El 1_________ nunca cae lejos del árbol. El 2__________ tampoco."';
palabrasReemplazar: string[] = ['', '']; // Palabras que se deben reemplazar
palabrasIngresadas: string[] = ['', ''];
resultado = '';
@Output() cambioUltimoPuzzle = new EventEmitter<boolean>();

comprobarPalabras() {
  let todasCorrectas = true;

  for (let i = 0; i < this.palabrasReemplazar.length; i++) {
    const palabraCorrecta = this.palabrasReemplazar[i].toLowerCase();
    const palabraIngresada = this.palabrasIngresadas[i].toLowerCase();

    if (palabraIngresada !== palabraCorrecta) {
      todasCorrectas = false;
      break;
    }
  }

  if (todasCorrectas) {
    this.resultado = '¡Todas las palabras son correctas!';
    alert("CORRECTO! Prueba final...")
    this.cambioUltimoPuzzle.emit(true);

  } else {
    this.resultado = 'Al menos una palabra es incorrecta. Intenta de nuevo.';
  }
}
}
