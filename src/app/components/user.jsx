import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../api";
import Loading from "./loading";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const User = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleAllUsers = () => {
        history.push("/users");
    };

    if (user) {
        return (
            <div className="user-block">
                <h1 className="user-block__title">{user.name}</h1>
                <h2 className="user-block__profession">Профессия: {user.profession.name}</h2>
                <div className="user-block__qualities">
                    <QualitiesList qualities={user.qualities} />
                </div>
                <div className="user-block__completed">completedMeetings: {user.completedMeetings}</div>
                <h2 className="user-block__rate">Rate {user.rate}</h2>
                <button
                    className="user-block__button"
                    onClick={() => {
                        handleAllUsers();
                    }}
                >
                    Все пользователи
                </button>
            </div>
        );
    }
    return <Loading />;
};
User.propTypes = {
    userId: PropTypes.string.isRequired
};

export default User;
