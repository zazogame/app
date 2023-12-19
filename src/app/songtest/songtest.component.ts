import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-songtest',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './songtest.component.html',
  styleUrls: ["./songtest.component.css"]
})
export class SongtestComponent {   fraseCeslebre = '"Noche 1_________, toda la noche entera. Hay una 2____ que tela, pero, ven con quien quieras. Cógeme la 4______, que bailamos la 5_____ tú y yo"';
palabrasReemplazar: string[] = ['ochentera', 'cola', 'cadera', 'lenta']; 
palabrasIngresadas: string[] = ['','','',''];
resultado = '';
@Output() cambioUltimoPuzzle = new EventEmitter<boolean>();

constructor(private toast: NgToastService){

}
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
