import React from "react";

const Qualitie = ({ item }) => {
	return <span className={"badge m-1 bg-" + item.color}>{item.name}</span>;
};

export default Qualitie;
