import React from "react";
import { motion } from "framer-motion";
import useMocData from "../utils/mocData";

const Main = () => {
    const { error, initialized, progress, status } = useMocData();
    const handleClick = () => {
        initialized();
    };
    return (
        <>
            <motion.h1 initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.5 }}>
                Main Page
            </motion.h1>
            <h3>Инициализация данных в FireBase</h3>
            <ul>
                <li>Status: {status}</li>
                <li>Progress: {progress}</li>
                {error && <li>error: {error}</li>}
            </ul>
            <button className="btn btn-primary" onClick={handleClick}>
                Инициализировать
            </button>
        </>
    );
};

export default Main;
