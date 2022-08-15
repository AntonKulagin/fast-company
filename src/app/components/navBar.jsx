import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    const navigation = {
        main: { name: "Main", path: "/" },
        login: { name: "Login", path: "/login" },
        users: { name: "Users", path: "/users" }
    };

    return (
        <ul className="nav">
            {Object.keys(navigation).map((nav) => (
                <li key={nav} className="nav-item">
                    <Link className="nav-link" aria-current="page" to={navigation[nav].path}>
                        {navigation[nav].name}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavBar;
