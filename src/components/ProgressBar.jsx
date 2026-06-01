import React from 'react';
import { motion, useTransform } from 'framer-motion';

const ProgressBar = ({ scrollProgress }) => {
    const width = useTransform(scrollProgress, [0, 1], ["0%", "100%"]);

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
            <motion.div
                style={{ width }}
                className="h-full bg-gold-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"
            />
        </div>
    );
};

export default ProgressBar;
