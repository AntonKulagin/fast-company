/* eslint multiline-ternary: "off" */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "../components/pagination";
import GroupList from "../components/groupList";
import api from "../api";
import SearchStatus from "../components/searchStatus";
import UserTable from "../components/userTable";
import _ from "lodash";
import Loading from "../components/loading";
import { motion } from "framer-motion";

const UsersList = () => {
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
                <div className="users">
                    <SearchStatus length={count} />
                    <div className="users__content">
                        {professions && (
                            <motion.div
                                className="users__professions"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <GroupList
                                    selectedItem={selectedProf}
                                    items={professions}
                                    onItemSelect={handleProfessionSelect}
                                />
                                <button className="btn btn-secondary m-2" onClick={clearFilter}>
                                    Очистить
                                </button>
                            </motion.div>
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
            </>
        );
    }
    return <Loading />;
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
UsersList.propTypes = {
    users: PropTypes.array
};

export default UsersList;
