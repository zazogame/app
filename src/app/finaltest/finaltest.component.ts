import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Subscription, timer } from 'rxjs';
import { TimerService } from '../timer.service';

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
  aciertos: number = 0;
  timerValue: number = 0;
  private timerSubscription: Subscription | undefined;
  constructor(private pokeApiService: PokemonService, private timerService: TimerService) {
    this.timerSubscription = this.timerService.getTimer().subscribe((value) => {
      this.timerValue = value;
    });
  }

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
        this.imageUrl = "/src/assets/img/vaporeon.png";
        this.currentPokemonName = "Vaporeon";
      }
    );
  }

  checkPokemon(): void {
    if (this.enteredPokemonName && this.enteredPokemonName.toLowerCase() === this.currentPokemonName) {
      alert('¡Correcto! ¡Ese es el Pokémon correcto!');
      this.aciertos++;
      if (this.aciertos < 3) {
        this.resetPokemon(1);
      }
      else{
        this.timerService.stopTimer();
        console.log(this.timerValue)
      }
    } else {
      alert('Incorrecto. ¡Inténtalo de nuevo!');
      console.log(this.currentPokemonName);
    }
  }

  resetPokemon(timeottime=10000): void {
    this.isChecking = true;
    this.mostrarMensajeError = true;
    this.iniciarCuentaAtras();
    setTimeout(() => {
      this.mostrarMensajeError = false;
      this.isChecking = false;
      this.getRandomPokemonImage();
    }, timeottime);
  }

  finalizarJuego(): void {
    // Lógica para finalizar el juego (recargar la página, por ejemplo)
    location.reload();
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
