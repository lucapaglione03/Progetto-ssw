import {Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjaxResponse } from 'rxjs/ajax';
import { Volume } from '../volume';
import { Archivio } from '../archivio';
import { ArchivioService } from '../archivio.service';
import { RimozioneComponent } from './rimozione/rimozione.component';
import { PrestitoComponent } from './prestito/prestito.component';

@Component({
  selector: 'app-ricerca',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [CommonModule, RimozioneComponent, PrestitoComponent],
})
export class RicercaComponent implements OnInit, OnChanges {
  @Input() search: number;
  @Input() archivioAttuale = new Archivio(this.ar);

  costruisciArchivio() {
    this.ar.getArchivio().subscribe({
      next: (data: AjaxResponse<any>) => console.log(data.response),
      error: (e) =>
        console.error(
          "Errore di acquisizione dell'archivio: " + JSON.stringify(e)
        ),
    });
  }

  libroSelezionato: Volume = new Volume('', '', '', '');
  trovati: number;

  titolo: string;
  autore: string;
  posizione: string;
  prestatario: string;

  eseguiRicerca() {
    this.libroSelezionato = undefined;
    this.trovati = 0;
    let libri = this.archivioAttuale.archivio;
    let nodoRicerca: HTMLInputElement = document.getElementById(
      'ricerca'
    ) as HTMLInputElement;
    let stringa = nodoRicerca.value;
    const libriTrovati = libri.filter((libro) =>
      (libro.titolo + libro.autore).toLowerCase().includes(stringa)
    );
    if (stringa !== '') {
      if (libriTrovati.length === 1) {
        this.trovati = 1;
        this.libroSelezionato = libriTrovati[0];
        this.titolo = this.libroSelezionato.titolo;
        this.autore = this.libroSelezionato.autore;
        this.posizione = this.libroSelezionato.posizione;
        this.prestatario = this.libroSelezionato.prestatario;
      } else {
        this.trovati = libriTrovati.length;
      }
    }
  }

  resetRicercaComponent() {
    this.libroSelezionato = undefined;
    this.trovati = 0;
  }

  constructor(private ar: ArchivioService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if ('ricerca' in changes && this.ricerca === 0) {
      this.resetRicercaComponent();
    }
  }
}
