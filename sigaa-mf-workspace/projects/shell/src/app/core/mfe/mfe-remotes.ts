export interface MfeRemoteConfig {
  remoteName: string;
  exposedModule: string;
  url: string;
}

export const MFE_REMOTES: Record<string, MfeRemoteConfig> = {
  user: {
    remoteName: 'mf-user',
    exposedModule: './Routes',
    url: 'http://localhost:4201/remoteEntry.js',
  },

  auth: {
    remoteName: 'mf-auth',
    exposedModule: './Routes',
    url: 'http://localhost:4202/remoteEntry.js',
  },

  accessControl: {
    remoteName: 'mf-access-control',
    exposedModule: './Routes',
    url: 'http://localhost:4203/remoteEntry.js',
  }
};