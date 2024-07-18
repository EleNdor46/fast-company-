import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/layouts/login";
import Main from "./components/layouts/main";
import NavBar from "./components/ui/navbar";
import Users from "./components/page/usersListPage";
import ChangeUser from "./components/layouts/changeUser";
function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/users/:usersId?/:change?" component={Users} />
      </Switch>
    </>
  );
}

export default App;
