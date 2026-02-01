import { loadRemoteModule } from '@angular-architects/module-federation';
import { assertRemoteContract, RemoteRouteContract } from './remote-contract';

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const id = setTimeout(
      () => reject(new Error(`Remote load timeout after ${ms}ms`)),
      ms
    );

    promise.then(
      value => {
        clearTimeout(id);
        resolve(value);
      },
      error => {
        clearTimeout(id);
        reject(error);
      }
    );
  });
}

export type RemoteRouteLoadResult =
  | { status: 'ready'; routes: unknown }
  | { status: 'failed'; error: Error };

export async function loadRemoteRoutes(
  config: unknown
): Promise<RemoteRouteLoadResult> {
  // boundary defensiva
  assertRemoteContract(config);
  const contract = config as RemoteRouteContract;

  try {
    const module = await withTimeout(
      loadRemoteModule({
        type: 'module',
        exposedModule: contract.exposedModule,
        remoteEntry: contract.remoteEntry,
      }),
      8000
    );

    const routes = module['ROUTES'];

    if (!routes) {
      throw new Error('ROUTES export not found');
    }

    return { status: 'ready', routes };
  } catch (err) {
    return {
      status: 'failed',
      error: err instanceof Error ? err : new Error('unknown error'),
    };
  }
}
