import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "../features/channel/channelSlice.ts";
import themeReducer from "../features/theme/themeSlice.ts";

export const store = configureStore({
  reducer: {
    channel: channelReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
