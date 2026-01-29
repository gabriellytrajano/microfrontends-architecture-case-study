import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissoesRecursoComponent } from './permissoes-recurso.component';

describe('PermissoesRecursoComponent', () => {
  let component: PermissoesRecursoComponent;
  let fixture: ComponentFixture<PermissoesRecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissoesRecursoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissoesRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
