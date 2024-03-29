/* eslint multiline-ternary: "off" */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/userTable";
import _ from "lodash";
import Loading from "../../loading";
import { motion } from "framer-motion";
import TextField from "../../common/form/textField";
import { useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfessions";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = () => {
    const { isLoading: professionsLoading, professions } = useProfessions();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchUsersByName, setSearchUsersByName] = useState("");

    const pageSize = 8;

    const { users } = useUser();
    const { currentUser } = useAuth();

    const handleDelete = (userId) => {
        //   setUsers(users.filter((user) => user._id !== userId));
        console.log(userId);
    };
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        //   setUsers(newArray);
        console.log(newArray);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSearchUsersByName("");
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSearchUsers = (target) => {
        setSelectedProf();
        setSearchUsersByName(target.value);
    };

    if (users) {
        //   const searchedUsersByName = searchUsersByName
        //       ? users.filter((user) => user.name.toLowerCase().includes(searchUsersByName.toLowerCase()))
        //       : users;

        //   const filteredUsers = selectedProf
        //       ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
        //       : users;

        //   const usersFilterList = searchUsersByName ? searchedUsersByName : filteredUsers;

        function filterUsers(data) {
            const filteredUsers = searchUsersByName
                ? data.filter((user) => user.name.toLowerCase().indexOf(searchUsersByName.toLowerCase()) !== -1)
                : selectedProf
                ? data.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
                : data;
            return filteredUsers.filter((u) => u._id !== currentUser._id);
        }

        const filteredUsers = filterUsers(users);

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
                        {professions && !professionsLoading && (
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
                            <div className="users-search-field">
                                <TextField
                                    onChange={handleSearchUsers}
                                    value={searchUsersByName}
                                    placeholder="Search ..."
                                    name="search users"
                                />
                            </div>
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
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
