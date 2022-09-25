import React from "react";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";
const Quality = ({ id }) => {
    const { isLoading, getQuality } = useQuality();
    const qual = getQuality(id);
    if (!isLoading) {
        return (
            <span className={"badge m-1 bg-" + qual.color} key={qual._id}>
                {qual.name}
            </span>
        );
    } else return "Loading ...";
};
Quality.propTypes = {
    id: PropTypes.string.isRequired
};

export default Quality;
