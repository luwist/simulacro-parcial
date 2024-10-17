import { Component, EventEmitter, Output } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actor-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actor-list.component.html',
  styles: `
    :host {
      width: 100%;
    }

    .selected {
      border: 1px solid #0d6efd;
    }
  `,
})
export class ActorListComponent {
  @Output() getItemSelected = new EventEmitter();
  items: any[] = [];

  itemSelected: any = null;

  constructor(private _firestoreService: FirestoreService) {}

  async ngOnInit() {
    this.items = await this._firestoreService.getAllDocument<any>('actors');
  }

  onItemSelected(movie: any): void {
    this.itemSelected = movie;

    this.getItemSelected.emit(movie);
  }
}
