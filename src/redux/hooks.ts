import {
  TypedUseSelectorHook,
  useDispatch as useDispatchRedux,
  useSelector as useSelectorRedux,
} from "react-redux";
import type { RootState, Dispatch } from "./index";

export const useDispatch = () => useDispatchRedux<Dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;
