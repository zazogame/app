import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinaltestComponent } from './finaltest.component';

describe('FinaltestComponent', () => {
  let component: FinaltestComponent;
  let fixture: ComponentFixture<FinaltestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinaltestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinaltestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
