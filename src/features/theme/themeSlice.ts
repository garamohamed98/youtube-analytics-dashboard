import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  mode: "dark" | "light";
}
const initialState: initialState = {
  mode: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

export const { changeMode } = themeSlice.actions;
export default themeSlice.reducer;
