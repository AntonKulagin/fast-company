import React from "react";
import PropTypes from "prop-types";
import BookMark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";

import { Link } from "react-router-dom";

const UserTable = ({ users, onSort, selectedSort, onToggleBookMark, onDelete, ...rest }) => {
    const columns = {
        name: { path: "name", name: "Имя", componenet: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link> },
        qualities: {
            name: "Качества",
            componenet: (user) => <Qualities qualities={user.qualities} />
        },
        profession: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            componenet: (user) => <BookMark status={user.bookmark} onClick={() => onToggleBookMark(user._id)} />
        },
        delete: {
            componenet: (user) => (
                <button onClick={() => onDelete(user._id)} className="btn btn-danger">
                    delete
                </button>
            )
        }
    };
    return (
        <>
            <Table {...{ onSort, selectedSort, columns, data: users }} />
        </>
    );
};
UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UserTable;
