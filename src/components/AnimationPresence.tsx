import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Custom hook to handle media queries
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQueryList.matches);

    updateMatches(); // Check on mount
    mediaQueryList.addEventListener("change", updateMatches); // Listen for changes

    return () => mediaQueryList.removeEventListener("change", updateMatches); // Clean up listener
  }, [query]);

  return matches;
};

// Responsive component with animations
const ResponsiveComponent = ({
  children,
  className,
  maxWidth = "768px",
}: {
  className?: string;
  children: React.ReactNode;
  maxWidth?: string;
}) => {
  const isMobile = useMediaQuery(`(max-width: ${maxWidth})`);

  const variants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate={isMobile ? "hidden" : "visible"}
      variants={variants}
      transition={{ duration: 0.3, ease: "easeInOut" }} // Adjust duration and ease for smoother animation
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ResponsiveComponent;
