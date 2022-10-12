import { AuthBackend } from "../index";
import { InvalidUsernameOrPassword } from "../error";
import { UserInfo } from "../../../../common/types/user.interface";

export default class DummyAuth implements AuthBackend {
	async loginWithEmailPassword(
		email: string,
		password: string
	): Promise<UserInfo> {
		if (password === "success") {
			return {
				email: "dummy-email",
				name: "dummy-name",
			};
		} else {
			throw new InvalidUsernameOrPassword();
		}
	}

	async signUpWithEmailPassword(
		email: string,
		password: string
	): Promise<UserInfo> {
		if (password === "success") {
			return {
				email: "dummy-email",
				name: "dummy-name",
			};
		} else {
			throw new InvalidUsernameOrPassword();
		}
	}
}
