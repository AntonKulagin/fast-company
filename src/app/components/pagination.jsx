import React, { useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({
    itemsCount,
    pageSize,
    onChangePage,
    onPrevNextPage,
    currentPage
}) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pageCount + 1);

    useEffect(() => {
        if (currentPage > pageCount) {
            onChangePage(pageCount);
            console.log("change");
        }
    }, [pageCount]);

    return (
        <>
            {pageCount > 1 && (
                <nav>
                    <ul className="pagination">
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={() =>
                                    onPrevNextPage("prev", pages.length)
                                }
                            >
                                Previous
                            </button>
                        </li>
                        {pages.map((page) => (
                            <li
                                className={
                                    "page-item" +
                                    (currentPage === page ? " active" : "")
                                }
                                key={"page_" + page}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => onChangePage(page)}
                                >
                                    {page}
                                </button>
                            </li>
                        ))}

                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={() =>
                                    onPrevNextPage("next", pages.length)
                                }
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
};
Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    onPrevNextPage: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default Pagination;
