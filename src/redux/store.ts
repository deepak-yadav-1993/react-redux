import { configureStore } from '@reduxjs/toolkit';
import errorSlice from './reducers/errorSlice';
import sheetDataSlice from './reducers/sheetDataSlice';
import userSlice from './reducers/userSlice';

const store = configureStore({
  reducer: {
    errors: errorSlice,
    sheetData: sheetDataSlice,
    user: userSlice
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
