import { Component, OnInit } from '@angular/core';
import { CharacterServices } from '../../../core/services/CharacterServices';
import { finalize } from 'rxjs';
// Importamos la interfaz del modelo si la tienes, si no, usa 'any'
import { Characters } from '../../../core/models/characters';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css',
})
export class CharacterList implements OnInit {
  pagenumber: number = 1;
  isloading: boolean = true;
  
  // Se cambia de Characters[] a 'any' para que el HTML 
  // pueda acceder a la propiedad .results de la respuesta de la API
  characters: any;

  constructor(private characterService: CharacterServices) { }

  ngOnInit(): void {  
    this.getCharacters();
  }

  getCharacters(): void {
    this.isloading = true;
    this.characterService
      .getCharacters(this.pagenumber)
      .pipe(
        finalize(() => this.isloading = false)
      )
      .subscribe({
        next: (response: any) => {
          this.characters = response;
          // Si quieres que la siguiente llamada sea a la otra página:
          // this.pagenumber++; 
        },
        error: (err) => {
          console.error('Error al cargar personajes:', err);
        }
      });
  }
}