import { configureStore, createSlice } from "@reduxjs/toolkit";

interface AccountState {
  data: null | string;
  isLoaded: boolean;
}

interface State {
  account: AccountState;
}

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    data: null,
    isLoaded: false,
  } as AccountState,
  reducers: {
    setAccount(state: AccountState, { payload }) {
      state.data = payload;
      state.isLoaded = true;
    },
  },
});

const preloadedState: State | undefined =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  typeof window !== "undefined" ? window["REDUX_STATE"] : undefined;

export const store = configureStore({
  preloadedState,
  reducer: {
    [accountSlice.name]: accountSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
