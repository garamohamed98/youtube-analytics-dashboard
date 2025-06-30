import { useSelector } from "react-redux";
import { useAppDispatch } from "../useAppDispatch";
import { selectThemeMode } from "../../features/theme/themeSelectors";
import { changeMode } from "../../features/theme/themeSlice";

export const useTheme = () => {
  const dispatch = useAppDispatch();

  const mode = useSelector(selectThemeMode);

  return {
    state: {
      mode,
    },
    actions: {
      changeMode: () => dispatch(changeMode()),
    },
  };
};
