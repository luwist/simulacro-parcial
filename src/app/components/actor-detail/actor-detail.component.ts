import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-actor-detail',
  standalone: true,
  imports: [],
  templateUrl: './actor-detail.component.html',
  styles: `
    :host {
      width: 100%;
    }
  `,
})
export class ActorDetailComponent {
  @Input() actor: any;
}
