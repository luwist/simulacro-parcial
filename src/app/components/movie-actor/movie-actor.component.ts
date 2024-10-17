import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-actor',
  standalone: true,
  imports: [],
  templateUrl: './movie-actor.component.html',
  styles: `
    :host {
      width: 100%;
    }
  `,
})
export class MovieActorComponent {
  @Input() movieActor: any[] = [];
}
