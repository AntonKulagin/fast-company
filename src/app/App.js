import React from "react";
import { Route, Switch } from "react-router-dom";
import BgImage from "./components/bgImage";
import Login from "./components/login";
import Main from "./components/main";
import NavBar from "./components/navBar";
import Users from "./components/users";

function App() {
    return (
        <div className="wrapper">
            <BgImage />
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
            </Switch>
        </div>
    );
}

export default App;
