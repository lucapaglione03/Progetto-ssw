import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjaxResponse } from 'rxjs/ajax';
import { Volume } from '../../volume';
import { Archivio } from '../../archivio';
import { ArchivioService } from '../../archivio.service';
import { RicercaComponent } from './search/search.component'


@Component({
  selector: 'app-rimozione',
  templateUrl: './rimozione.component.html',
  styleUrls: ['./rimozione.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class RimozioneComponent implements OnInit {
  @Input() libroSelezionato: Volume;
  @Input() archivioAttuale: Archivio = new Archivio(this.ar);

  eliminaLibro() {
    this.archivioAttuale.rimuoviLibro(this.libroSelezionato);
  }

  constructor(private ar: ArchivioService) {}

  ngOnInit() {}
}
