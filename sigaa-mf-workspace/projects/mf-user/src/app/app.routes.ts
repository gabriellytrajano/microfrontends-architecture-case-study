import { Routes } from '@angular/router';
import { UserListPage } from './pages/user-list/users-list.page';
import { EditUserPage } from './pages/edit-user/edit-user.page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserListPage,
  },
  {
    path: 'edit/:id',
    component: EditUserPage,
  },
];
