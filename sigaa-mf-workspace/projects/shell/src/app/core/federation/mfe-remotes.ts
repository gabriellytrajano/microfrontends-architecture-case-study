import { RemoteRouteContract } from './remote-contract';
import { MfeKey } from './mfe-keys';

export const MFE_REMOTES: Record<MfeKey, RemoteRouteContract> = {
  user: {
    remoteEntry: 'http://localhost:4202/remoteEntry.js',
    exposedModule: './Routes',
    routePath: 'user',
  },
  'access-control': {
    remoteEntry: 'http://localhost:4203/remoteEntry.js',
    exposedModule: './Routes',
    routePath: 'access-control',
  },
};
