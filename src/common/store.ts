import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import userSlice from '../modules/auth/store/slice';
import DirectoriesSlice from '../modules/directories/store/slice';
import DocumentSlice from "../modules/document/store/slice";

const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [DirectoriesSlice.name]: DirectoriesSlice.reducer,
    [DocumentSlice.name]: DocumentSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;

export default store;
