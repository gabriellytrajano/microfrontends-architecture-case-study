import { Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { MFE_REMOTES, loadRemoteRoutes } from '@shell-core';

export const routes: Routes = [

   {
    path: '',
    component: DashboardPage,
  },

  {
    path: 'auth',
    loadChildren: () =>
      loadRemoteRoutes({
        remoteEntry: MFE_REMOTES['auth'].url,
        exposedModule: MFE_REMOTES['auth'].exposedModule,
        exportName: 'routes',
      }),
  },

  {
    path: 'users',
    loadChildren: () =>
      loadRemoteRoutes({
        remoteEntry: MFE_REMOTES['user'].url,
        exposedModule: MFE_REMOTES['user'].exposedModule,
        exportName: 'routes',
      }),
  },

  {
    path: 'access-control',
    loadChildren: () =>
      loadRemoteRoutes({
        remoteEntry: MFE_REMOTES['accessControl'].url,
        exposedModule: MFE_REMOTES['accessControl'].exposedModule,
        exportName: 'routes',
      }),
  },
];