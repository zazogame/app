import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { timer } from 'rxjs';

@Component({
  selector: 'app-finaltest',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './finaltest.component.html',
  styleUrl: './finaltest.component.css'
})
export class FinaltestComponent implements OnInit{
  imageUrl: string | undefined;
  enteredPokemonName: string | undefined;
  isChecking: boolean = false;
  currentPokemonName: string | undefined;
  mostrarMensajeError = false;
  cuentaAtras = 10;
  formatoCuentaAtras = '00:10.0';

  constructor(private pokeApiService: PokemonService) {}

  ngOnInit(): void {
    this.getRandomPokemonImage();
  }

  getRandomPokemonImage(): void {
    this.pokeApiService.getRandomPokemon().subscribe(
      (response) => {
        this.imageUrl = response.data.sprites.front_default;
        this.currentPokemonName = response.data.name;
      },
      (error) => {
        console.error('Error fetching random Pokémon:', error);
      }
    );
  }

  checkPokemon(): void {
    if (this.enteredPokemonName && this.enteredPokemonName.toLowerCase() === this.currentPokemonName) {
      alert('¡Correcto! ¡Ese es el Pokémon correcto!');
    } else {
      alert('Incorrecto. ¡Inténtalo de nuevo!');
      console.log(this.currentPokemonName);
    }
  }

  resetPokemon(): void {
    
    this.isChecking = true;
    this.mostrarMensajeError=true;
    this.iniciarCuentaAtras();
    // timer(1).subscribe(() => {
    //   this.isChecking = false;
    //   this.getRandomPokemonImage();
    // });
    setTimeout(() => {
      this.mostrarMensajeError = false;
      this.isChecking = false;
      this.getRandomPokemonImage();
    }, 10000);
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
        this.formatoCuentaAtras = '00:10.0'; // Reiniciar el formato
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
