import { UserInfo } from '../../../common/types/user.interface';
import { REACT_APP_AUTH_API_BACKEND_MODULE } from '@env';

export interface AuthBackend {
  loginWithEmailPassword(email: string, password: string): Promise<UserInfo>;

  signUpWithEmailPassword(email: string, password: string): Promise<UserInfo>;
}

let authBackendInstance: AuthBackend | undefined;

export async function getAuthBackend(): Promise<AuthBackend> {
  if (authBackendInstance === undefined) {
    const mod = await import('./backends/' + REACT_APP_AUTH_API_BACKEND_MODULE);
    authBackendInstance = new mod.default() as AuthBackend;
  }
  return authBackendInstance;
}
