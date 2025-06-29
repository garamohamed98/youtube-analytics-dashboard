import type { RootState } from "../../app/store";

export const selectThemeMode = (state:RootState)=>state.theme.mode;