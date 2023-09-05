import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Archivio } from '../archivio';
import { ArchivioService } from '../archivio.service';
import { Volume } from '../volume';
import { AjaxResponse } from 'rxjs/ajax';

@Component({
  selector: 'add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AcquisizioneComponent {
  @Input() view: string = '';
  @Input() archivioAttuale = new Archivio([]);

  costruisciArchivio() {
    this.ar.getArchivio().subscribe({
      next: (data: AjaxResponse<any>) => console.log(data.response),
      error: (e) =>
        console.error(
          "Errore di acquisizione dell'archivio: " + JSON.stringify(e)
        ),
    });
  }

  acquisisciDati() {
    var titolo: HTMLInputElement = document.getElementById(
      'titolo'
    ) as HTMLInputElement;
    var autore: HTMLInputElement = document.getElementById(
      'autore'
    ) as HTMLInputElement;
    var posizione: HTMLInputElement = document.getElementById(
      'posizione'
    ) as HTMLInputElement;
    const nuovoLibro = new Volume(
      titolo.value,
      autore.value,
      posizione.value,
      'undefined'
    );
    this.archivioAttuale.aggiungiLibro(nuovoLibro);

    titolo.value = '';
    autore.value = '';
    posizione.value = '';
  }

  constructor(private ar: ArchivioService) {}

  ngOnInit() {}
}
