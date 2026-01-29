import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleInfoFormComponent } from './role-info-form.component';

describe('RoleInfoFormComponent', () => {
  let component: RoleInfoFormComponent;
  let fixture: ComponentFixture<RoleInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleInfoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoleInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
