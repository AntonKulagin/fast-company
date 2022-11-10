import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";

const NavBar = () => {
    const { currentUser } = useAuth();

    const navigation = {
        main: { name: "Main", path: "/", hidden: false },
        users: { name: "Users", path: "/users", hidden: !currentUser }
    };

    const loginItem = {
        login: { name: "Login", path: "/login" }
    };

    const getClassItem = (hiddenItem) => {
        return "navbar__item" + (hiddenItem ? "_hidden" : "");
    };

    return (
        <nav className="navbar">
            <ul className="navbar__list">
                {Object.keys(navigation).map((nav) => (
                    <li key={nav} className={getClassItem(navigation[nav].hidden)}>
                        <Link className="navbar__link" aria-current="page" to={navigation[nav].path}>
                            {navigation[nav].name}
                        </Link>
                    </li>
                ))}
            </ul>
            {currentUser ? (
                <div className="navbar__user">
                    <NavProfile />
                </div>
            ) : (
                <Link className="navbar__link" aria-current="page" to={loginItem.login.path}>
                    {loginItem.login.name}
                </Link>
            )}
        </nav>
    );
};

export default NavBar;
