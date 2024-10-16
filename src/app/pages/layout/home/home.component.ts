import { Component } from '@angular/core';
import { GithubRepository } from '../../../repositories';
import { Observable } from 'rxjs';
import { UserGithub } from '../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userGithub$!: Observable<UserGithub>;

  constructor(_githubRepository: GithubRepository) {
    this.userGithub$ = _githubRepository.getUserByUsername('luwist');
  }
}
