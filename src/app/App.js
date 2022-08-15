import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import BgImage from "./components/bgImage";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/navBar";
import Users from "./layouts/users";

function App() {
    return (
        <div className="wrapper">
            <BgImage />
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;
