import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorTableComponent } from './actor-table.component';

describe('ActorTableComponent', () => {
  let component: ActorTableComponent;
  let fixture: ComponentFixture<ActorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
