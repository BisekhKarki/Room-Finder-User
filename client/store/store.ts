import { configureStore } from "@reduxjs/toolkit";
import sliceReducer from "./slice";

export const store = configureStore({
  reducer: {
    slice: sliceReducer,
  },
});

// Infer the 'RootState' and 'AppDispatch" types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Infered type: {posts: PostsState, comments: CommentsState, users:UsersState}
export type AppDispatch = typeof store.dispatch;
