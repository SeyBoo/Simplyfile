import { UserInfo } from "../../../common/types/user.interface";
import { AsyncStorage } from "react-native";

type User = UserInfo | null;

export const UserInfoLocalStorageName = "AuthToken";

interface UserState {
	userInfo: User;
}

let userInfo: User = null;
(async () => {
	try {
		let value = await AsyncStorage.getItem(UserInfoLocalStorageName);
		if (value) {
			const formatedUser: User = JSON.parse(value);
			userInfo = formatedUser;
		}
	} catch (e) {
		console.log(e);
	}
})();

const initialState: UserState = {
	userInfo,
};

export default initialState;
