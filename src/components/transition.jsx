import { motion } from 'framer-motion';

const transition = (OgComponent) => {
    return (props) => (
        <>
            <OgComponent {...props} />
            <motion.div
                className="fixed inset-0 w-full h-screen origin-top bg-[#0d0d0d]"
                initial={{ scaleY: 1 }}  // Starts fully visible
                animate={{ scaleY: 0 }}  // Animates to hide
                exit={{ scaleY: 0 }}     // Shows on exit
                transition={{
                    duration: 1,
                    delay: 0.3,
                    ease: [0.87, 0, 0.13, 1],
                }}
            />
            <motion.div
                className="fixed inset-0 w-full h-screen origin-bottom bg-[#0d0d0d]"
                initial={{ scaleY: 0 }} // Starts hidden
                animate={{ scaleY: 0 }} // Animates to fully cover
                exit={{ scaleY: 1 }}     // Hides on exit
                transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                }}
            />
        </>
    );
};

export default transition;
