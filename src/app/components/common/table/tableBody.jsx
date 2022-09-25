import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { motion } from "framer-motion";

const TableBody = ({ data, columns }) => {
    const trVariants = {
        visible: (i) => ({
            opacity: 1,
            transition: {
                delay: i * 0.1
            }
        }),
        hidden: { opacity: 0 }
    };

    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
            return component;
        }

        return _.get(item, columns[column].path);
    };
    return (
        <tbody>
            {data.map((item, i) => (
                <motion.tr key={item._id} variants={trVariants} initial="hidden" animate="visible" custom={i}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>{renderContent(item, column)}</td>
                    ))}
                </motion.tr>
            ))}
        </tbody>
    );
};
TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableBody;
