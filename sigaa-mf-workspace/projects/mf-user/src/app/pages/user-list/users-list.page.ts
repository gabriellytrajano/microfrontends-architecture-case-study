import {
  Component,
  TemplateRef,
  ViewChild,
  signal,
  AfterViewInit,
  computed,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BreadcrumbComponent,
  BarraDeBuscaComponent,
  PaginacaoBotoesComponent,
  TableColumn,
  TableResultsInfoComponent,
  UserTableComponent,
  User,
  BadgeComponent,
} from '@shared-ui';
import { UserDropdownComponent } from '../../components/user-dropdown/user-dropdown.component';
import { UserService } from '../../services/user.service';

const PAGE_SIZE = 8;

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    BarraDeBuscaComponent,
    PaginacaoBotoesComponent,
    TableResultsInfoComponent,
    UserTableComponent,
    BadgeComponent,
    UserDropdownComponent,
  ],
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UserListPage implements OnInit {
  @ViewChild('userTpl', { static: true })
  userTpl!: TemplateRef<{ $implicit: User }>;

  @ViewChild('papeisTpl', { static: true })
  papeisTpl!: TemplateRef<{ $implicit: User }>;

  @ViewChild('actionsTpl', { static: true })
  actionsTpl!: TemplateRef<{ $implicit: User }>;

  page = signal(1);
  totalPages = signal(0);
  search = signal<string | null>(null);

  users = signal<User[]>([]);
  columns = signal<TableColumn<User>[]>([]);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.columns.set([
      { key: 'cpf', header: 'CPF' },
      {
        key: 'name',
        header: 'Usuário',
        cellTemplate: this.userTpl,
      },
      {
        key: 'roles',
        header: 'Papéis',
        cellTemplate: this.papeisTpl,
      },
      {
        key: 'name',
        header: '',
        cellTemplate: this.actionsTpl,
      },
    ]);

    this.load();
  }

  load(): void {
    this.userService
      .list(this.page(), PAGE_SIZE, this.search() ?? undefined)
      .subscribe(res => {
        this.users.set(res.items);
        this.totalPages.set(Math.ceil(res.total / PAGE_SIZE));
      });
  }

  onPageChange(page: number): void {
    this.page.set(page);
    this.load();
  }

  onSearch(term: string): void {
    this.search.set(term || null);
    this.page.set(1);
    this.load();
  }

  onRemove(user: User): void {
    this.userService.deletar(user.cpf).subscribe(() => {
      this.load();
    });
  }

  /** TableResultsInfo bindings */
  from = computed(() => (this.page() - 1) * PAGE_SIZE + 1);

  to = computed(() => Math.min(this.page() * PAGE_SIZE, this.total()));

  total = computed(() => this.users().length);
}
