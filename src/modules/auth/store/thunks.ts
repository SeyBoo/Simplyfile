import { AppThunk } from "../../../common/store";
import { getAuthBackend } from "../api";
import { setUser } from "./slice";

export const loginWithEmailPassword =
	(email: string, password: string): AppThunk =>
	async (dispatch) => {
		const auth = await getAuthBackend();
		const userInfo = await auth.loginWithEmailPassword(email, password);
		await dispatch(setUser({ user: userInfo }));
	};

export const signUpWithEmailPassword =
	(email: string, password: string): AppThunk =>
	async (dispatch) => {
		const auth = await getAuthBackend();
		const userInfo = await auth.signUpWithEmailPassword(email, password);
		await dispatch(setUser({ user: userInfo }));
	};
