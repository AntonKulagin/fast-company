import React, { useState } from "react";

const Loading = () => {
    const [point, setPoint] = useState(".");

    const showPoints = () => {
        setTimeout(() => {
            setPoint((prev) => (prev.length < 3 ? prev + "." : "."));
        }, 200);
    };

    showPoints();

    return (
        <div className="loading">
            <div className="loading__item">{"Loading " + point}</div>
        </div>
    );
};

export default Loading;
