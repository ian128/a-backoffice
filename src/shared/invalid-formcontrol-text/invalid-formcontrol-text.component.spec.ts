import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidFormcontrolTextComponent } from './invalid-formcontrol-text.component';

describe('InvalidFormcontrolTextComponent', () => {
  let component: InvalidFormcontrolTextComponent;
  let fixture: ComponentFixture<InvalidFormcontrolTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidFormcontrolTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidFormcontrolTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
