import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLogComponent } from './service-log.component';

describe('ServiceLogComponent', () => {
  let component: ServiceLogComponent;
  let fixture: ComponentFixture<ServiceLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
