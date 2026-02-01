import { Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { loadRemoteRoutes, MfeKey } from '@shell-core';
import { getRemoteContract } from './core/federation/remote-contract';

export const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
  },
  {
    path: 'users',
    loadChildren: () => loadMfeRoutes('user'),
  },
  {
    path: 'access-control',
    loadChildren: () => loadMfeRoutes('access-control'),
  },
];

async function loadMfeRoutes(key: MfeKey): Promise<Routes> {
  const result = await loadRemoteRoutes(getRemoteContract(key));

  if (result.status === 'failed') {
    throw result.error;
  }

  return result.routes as Routes;
}
