import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieActorComponent } from './movie-actor.component';

describe('MovieActorComponent', () => {
  let component: MovieActorComponent;
  let fixture: ComponentFixture<MovieActorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieActorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
