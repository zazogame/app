import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongtestComponent } from './songtest.component';

describe('SongtestComponent', () => {
  let component: SongtestComponent;
  let fixture: ComponentFixture<SongtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongtestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SongtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
