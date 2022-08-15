import React from "react";
import { motion } from "framer-motion";

const Main = () => {
    return (
        <motion.h1 initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
            Main Page
        </motion.h1>
    );
};

export default Main;
