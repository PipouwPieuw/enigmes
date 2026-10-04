import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { VerandaComponent } from './veranda.component';

describe('VerandaComponent', () => {
  let component: VerandaComponent;
  let fixture: ComponentFixture<VerandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerandaComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
