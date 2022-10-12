import { UserInfo } from "../../../common/types/user.interface";

const NEXT_PUBLIC_AUTH_API_BACKEND_MODULE = "dummy";

export interface AuthBackend {
	loginWithEmailPassword(email: string, password: string): Promise<UserInfo>;

	signUpWithEmailPassword(email: string, password: string): Promise<UserInfo>;
}

let authBackendInstance: AuthBackend | undefined;

export async function getAuthBackend(): Promise<AuthBackend> {
	if (authBackendInstance === undefined) {
		const mod = await import(
			"./backends/" + NEXT_PUBLIC_AUTH_API_BACKEND_MODULE
		);
		authBackendInstance = new mod.default() as AuthBackend;
	}
	return authBackendInstance;
}
