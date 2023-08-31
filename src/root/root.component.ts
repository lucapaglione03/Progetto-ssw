import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RicercaComponent } from './search/search.component';
import { AcquisizioneComponent } from './add/add.component';
import { Archivio } from './archivio';
import { ArchivioService } from './archivio.service';

@Component({
  selector: 'root',
  standalone: true,
  imports: [CommonModule, InserimentoComponent, RicercaComponent],
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})

export class RootComponent implements OnInit {
  acquisizione: number = 0;
  ricerca: number = 0;
  archivioAttuale = new Archivio(this.ar);

  setRicerca(valore: number) {
    this.ricerca = valore;
  }

  setAcquisizione(valore: number) {
    this.acquisizione = valore;
  }

  costruisciArchivio() {
    this.ar.getArchivio().subscribe({
      next: (data: AjaxResponse<any>) => console.log(data.response),
      error: (e) =>
        console.error(
          "Errore di acquisizione dell'archivio: " + JSON.stringify(e)
        ),
    });
  }
  title: string = 'Servizio di biblioteca online';

  constructor(private ar: ArchivioService) {}

  ngOnInit() {}
}

