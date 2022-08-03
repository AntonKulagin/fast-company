/* eslint multiline-ternary: "off" */

import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({ ...selectedSort, order: selectedSort.order === "asc" ? "desc" : "asc" });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
                        scope="col"
                        {...{ role: columns[column].path && "button" }}
                    >
                        <div className="table-header__item">
                            <span className={"table-header__content" + (columns[column].path ? "" : "_none-hover")}>
                                {columns[column].name}
                            </span>
                            {columns[column].path === selectedSort.path ? (
                                <span
                                    className={
                                        "table-header__arrow" +
                                        (selectedSort.order === "asc"
                                            ? " table-header__arrow_asc"
                                            : " table-header__arrow_desc")
                                    }
                                ></span>
                            ) : undefined}
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
