import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggleModal opens and closes the modal', () => {
    expect(component.isDisplayed()).toBeFalse();

    component.toggleModal();
    expect(component.isDisplayed()).toBeTrue();

    component.toggleModal();
    expect(component.isDisplayed()).toBeFalse();
  });

  it('Escape closes an open modal', () => {
    component.toggleModal();
    expect(component.isDisplayed()).toBeTrue();

    component.onEscape();
    expect(component.isDisplayed()).toBeFalse();
  });

  it('Escape does nothing when the modal is already closed', () => {
    component.onEscape();
    expect(component.isDisplayed()).toBeFalse();
  });
});
