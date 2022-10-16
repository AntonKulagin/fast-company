import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const NavProfile = () => {
    const { currentUser } = useAuth();
    const [isOpen, setOpen] = useState();
    const toggleMenu = () => {
        setOpen((prev) => !prev);
    };

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="dropdown__button">
                <div className="dropdown__user-name">{currentUser.name}</div>
                <img
                    src={currentUser.image}
                    className="rounded-circle shadow-1-strong me-3"
                    alt="avatar"
                    width="40"
                    height="40"
                />
                <div className={"dropdown__mark" + (isOpen ? " dropdown__mark_open" : "")}></div>
                <div className={"dropdown__menu" + (isOpen ? " dropdown__menu_open" : "")}>
                    <ul className="dropdown__menu_list">
                        <li className="dropdown__menu_item">
                            <Link to={`/users/${currentUser._id}`} className="dropdown__menu_link">
                                Profile
                            </Link>
                        </li>
                        <li className="dropdown__menu_item">
                            <Link to="/logout" className="dropdown__menu_link">
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavProfile;
