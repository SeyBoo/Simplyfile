import {UserInfo} from "../../../common/types/user.interface";
import {NEXT_PUBLIC_AUTH_API_BACKEND_MODULE} from "@env"


const API = process.env.NEXT_PUBLIC_AUTH_API_BACKEND_MODULE;

export interface AuthBackend {
  loginWithEmailPassword(email: string, password: string): Promise<UserInfo>;
}

let authBackendInstance: AuthBackend | undefined = undefined;

export async function getAuthBackend(): Promise<AuthBackend> {
  if (authBackendInstance === undefined) {
    console.log('test' + API);
    const mod = await import ('./backends/' + NEXT_PUBLIC_AUTH_API_BACKEND_MODULE);
    authBackendInstance = new mod.default() as AuthBackend;
  }
  return authBackendInstance;
}
