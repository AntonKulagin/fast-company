/* eslint multiline-ternary: "off" */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UserTable from "./userTable";
import _ from "lodash";
import Loading from "./loading";
import { useParams } from "react-router-dom";
import User from "./user";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    const pageSize = 8;

    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const { userId } = useParams();

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
            : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <>
                {userId ? (
                    <User userId={userId} />
                ) : (
                    <div className="users">
                        <SearchStatus length={count} />
                        <div className="users__content">
                            {professions && (
                                <div className="users__professions">
                                    <GroupList
                                        selectedItem={selectedProf}
                                        items={professions}
                                        onItemSelect={handleProfessionSelect}
                                    />
                                    <button className="btn btn-secondary m-2" onClick={clearFilter}>
                                        Очистить
                                    </button>
                                </div>
                            )}
                            <div className="users__table">
                                {count > 0 && (
                                    <UserTable
                                        users={usersCrop}
                                        onSort={handleSort}
                                        selectedSort={sortBy}
                                        onDelete={handleDelete}
                                        onToggleBookMark={handleToggleBookMark}
                                    />
                                )}
                                <Pagination
                                    itemsCount={count}
                                    pageSize={pageSize}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
    return <Loading />;
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
Users.propTypes = {
    users: PropTypes.array
};

export default Users;
