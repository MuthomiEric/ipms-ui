import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceDashboardComponent } from './insurance-dashboard.component';

describe('InsuranceDashboardComponent', () => {
  let component: InsuranceDashboardComponent;
  let fixture: ComponentFixture<InsuranceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsuranceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
