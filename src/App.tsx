import Main from "./components/Main";
import Login from "./components/Login";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux";
import "./App.css";
import { isAuth } from "./utils/api";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/login"
              component={() => (isAuth() ? <Redirect to="/" /> : <Login />)}
            />
            <Route
              exact
              path="/"
              component={() => (isAuth() ? <Main /> : <Redirect to="/login" />)}
            />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
