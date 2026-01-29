import { EditarRecursoComponent } from './pages/recursos/editar-recurso/editar-recurso.component';

import { Routes } from '@angular/router';
import { PermissionsPage } from './pages/permissions/permissions.page';
import { RoleListComponent } from './pages/roles/role-list/role-list.component';
import { NewRoleComponent } from './pages/roles/new-role/new-role.component';
import { EditRoleComponent } from './pages/roles/edit-role/edit-role.component';
import { RecursosPage } from './pages/recursos/lista-recursos/recursos.page';

export const routes: Routes = [
  {
    path: 'roles',
    component: RoleListComponent,
  },
  {
    path: 'roles/new',
    component: NewRoleComponent,
  },
  {
    path: 'roles/edit/:id',
    component: EditRoleComponent,
  },
  {
    path: 'permissions',
    component: PermissionsPage,
  },
  {
    path: 'recursos',
    component: RecursosPage,
  },
  {
    path: 'recursos/:id',
    component: EditarRecursoComponent,
  },
];
