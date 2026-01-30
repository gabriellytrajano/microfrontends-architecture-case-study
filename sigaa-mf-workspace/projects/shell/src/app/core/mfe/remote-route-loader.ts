import { loadRemoteModule } from '@angular-architects/module-federation';

export interface RemoteRouteConfig {
  remoteEntry: string;
  exposedModule: string;
  exportName: string;
  timeoutMs?: number;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      reject(new Error(`Remote load timeout after ${ms}ms`));
    }, ms);

    promise.then(
      v => {
        clearTimeout(id);
        resolve(v);
      },
      e => {
        clearTimeout(id);
        reject(e);
      }
    );
  });
}

export async function loadRemoteRoutes(
  config: RemoteRouteConfig
) {
  const timeout = config.timeoutMs ?? 8000;

  try {
    const module = await withTimeout(
      loadRemoteModule({
        type: 'module',
        remoteEntry: config.remoteEntry,
        exposedModule: config.exposedModule,
      }),
      timeout
    );

    const routes = module[config.exportName];

    if (!routes) {
      throw new Error(
        `Remote module loaded but export "${config.exportName}" not found`
      );
    }

    return routes;

  } catch (err) {
    console.error('[MFE] Remote route load failed', {
      remoteEntry: config.remoteEntry,
      exposedModule: config.exposedModule,
      err,
    });

    // fallback route
    return buildFallbackRoutes();
  }
}

function buildFallbackRoutes() {
  return [
    {
      path: '',
      loadComponent: () =>
        import('../fallback/mfe-load-error.component')
          .then(m => m.MfeLoadErrorComponent),
    },
  ];
}