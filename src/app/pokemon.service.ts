import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  getRandomPokemon(): Observable<any> {
    const randomId = Math.floor(Math.random() * 898) + 1; // There are 898 Pokémon in total
    return from(axios.get(`${this.apiUrl}/${randomId}`));
  }
}
