import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { BreadcrumbComponent } from '@shared-ui';
import { UserService } from '../../services/user.service';
import { FuncaoService } from 'projects/mf-access-control/src/service/funcao.service';
import { FuncaoDTO } from 'projects/mf-access-control/src/models/funcao.model';
import { User, ButtonComponent } from '@shared-ui';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  standalone: true,
  imports: [BreadcrumbComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './edit-user.page.html',
})
export class EditUserPage implements OnInit {
  user = signal<User | null>(null);
  roles = signal<FuncaoDTO[]>([]);
  role: string | null = null;
  papelSelecionado = signal<string | null>(null);
  dropdownOpen = signal(false);
  loading = signal(false);

  error = signal(false);
  form!: FormGroup;

  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private funcaoService = inject(FuncaoService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.buildForm();
    this.listRoles();
    this.loadUser();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: [{ value: '', disabled: true }],
      role: [null, Validators.required],
    });
  }

  private loadUser(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error.set(true);
      return;
    }

    this.userService.getByCpf(Number(id)).subscribe({
      next: user => {
        this.user.set(user);
        this.form.patchValue({
          name: user.name,
          email: user.email,
          cpf: user.cpf,
          papel: user.papel,
        });
        this.papelSelecionado.set(user.papel);
      },
      error: () => this.error.set(true),
    });
  }

  private listRoles(): void {
    this.funcaoService.getFuncoesDropdown().subscribe({
      next: roles => {
        this.roles.set(Array.isArray(roles) ? roles : []);
      },
      error: () => {
        this.roles.set([]);
        this.error.set(true);
      },
    });
  }

  onToggleRole(role: string): void {
    const control = this.form.get('roles');

    if (!control) return;

    const current = (control.value as string[]) ?? [];

    control.setValue(
      current.includes(role)
        ? current.filter(r => r !== role)
        : [...current, role]
    );
  }

  selecionarPapel(papel: string): void {
    this.form.patchValue({ role: papel });
    this.papelSelecionado.set(papel);
    this.dropdownOpen.set(false);
  }

  voltar(): void {
    history.back();
  }

  cancelar(): void {
    const currentUser = this.user();
    if (!currentUser) return;

    this.form.reset({
      name: currentUser.name,
      email: currentUser.email,
      cpf: currentUser.id,
      papel: currentUser.papel,
    });

    history.back();
  }

  salvar(): void {
    if (this.form.invalid || this.loading()) return;

    this.loading.set(true);

    const raw = this.form.getRawValue();

    const payload = {
      cpfCnpj: raw.cpf,
      nome: raw.name,
      email: raw.email,
      papel: raw.role,
    };

    this.userService
      .atualizar(raw.cpf, payload)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.voltar(),
        error: () => this.error.set(true),
      });
  }
}
