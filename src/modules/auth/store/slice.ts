import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import initialState, {UserInfoLocalStorageName} from './state';
import {UserInfo} from '../../../common/types/user.interface';
import {AsyncStorage} from 'react-native';

interface LoginPayload {
  user: UserInfo;
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<LoginPayload>) => {
      const user = action.payload.user;
      state.userInfo = user;
      (async () => {
        try {
          const parsedValue = JSON.stringify(user);
          AsyncStorage.setItem(UserInfoLocalStorageName, parsedValue);
        } catch (e) {
          console.log(e);
        }
      })();
    },
    resetUser: state => {
      state.userInfo = null;
    },
  },
});

export const {setUser, resetUser} = userSlice.actions;
export default userSlice;
