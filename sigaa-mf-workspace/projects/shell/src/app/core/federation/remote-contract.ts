import { MfeKey } from "./mfe-keys";
import { MFE_REMOTES } from "./mfe-remotes";

export interface RemoteRouteContract {
  remoteEntry: string;
  exposedModule: string;
  routePath: string;
}

export function assertRemoteContract(
  x: unknown
): asserts x is RemoteRouteContract {
  if (!x || typeof x !== 'object') {
    throw new Error('remote contract: not an object');
  }

  const r = x as Record<string, unknown>;

  if (
    typeof r['remoteName'] !== 'string' ||
    typeof r['exposedModule'] !== 'string' ||
    typeof r['routePath'] !== 'string'
  ) {
    throw new Error('remote contract: invalid fields');
  }
}

export function getRemoteContract(key: MfeKey) {
  return MFE_REMOTES[key];
}
