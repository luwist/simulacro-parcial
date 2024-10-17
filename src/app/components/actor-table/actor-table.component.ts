import { Component, EventEmitter, Output } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actor-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actor-table.component.html',
  styleUrl: './actor-table.component.css',
})
export class ActorTableComponent {
  @Output() selectItem = new EventEmitter<any>();
  itemSelected: any = null;
  items: any[] = [];

  constructor(private _firestoreService: FirestoreService) {}

  async ngOnInit(): Promise<void> {
    this.items = await this._firestoreService.getAllDocument('actors');
  }

  onItemSelected(item: any): void {
    this.itemSelected = item;

    this.selectItem.emit(item);
  }
}
