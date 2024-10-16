import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorRegisterComponent } from './actor-register.component';

describe('ActorRegisterComponent', () => {
  let component: ActorRegisterComponent;
  let fixture: ComponentFixture<ActorRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
