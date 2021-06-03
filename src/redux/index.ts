import { createStore } from "redux";
import reducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["socket", "currentChat"],
};

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_STATE") return reducer(undefined, action);
  return reducer(state, action);
};

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
