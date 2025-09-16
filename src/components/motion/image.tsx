"use client";

import { motion } from "motion/react";

const ImageAnimate = () => {
  const images = [
    {
      id: 1,
      url: "https://media.istockphoto.com/id/665375478/photo/picturesque-view-of-a-bridge-over-jhelum-river-in-srinagar.webp?a=1&b=1&s=612x612&w=0&k=20&c=5y7BIA3oEMg_xREvrXMf8xR9SFWY6xBjgsbFjEPLwmU=",
    },
    {
      id: 2,
      url: "https://media.istockphoto.com/id/2183339090/photo/washington-dc-in-the-fall.webp?a=1&b=1&s=612x612&w=0&k=20&c=I09rPoyk2vb44Dq78A61ymQxfV33FF2bT5O6PAemG50=",
    },
    {
      id: 3,
      url: "https://media.istockphoto.com/id/2166346446/photo/maple-autumn-leaves.webp?a=1&b=1&s=612x612&w=0&k=20&c=23YtIBovvl0W6cbb_zy993bqP9my2seo5xnih5zuwtE=",
    },
    {
      id: 4,
      url: "https://media.istockphoto.com/id/665375478/photo/picturesque-view-of-a-bridge-over-jhelum-river-in-srinagar.webp?a=1&b=1&s=612x612&w=0&k=20&c=5y7BIA3oEMg_xREvrXMf8xR9SFWY6xBjgsbFjEPLwmU=",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Reduced stagger for faster sequence
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8, // Use scale instead of x/y for better performance
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4, // Reduced duration
        ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smoother animation
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-wrap gap-4 items-center justify-center min-h-screen p-4"
    >
      {images.map((image) => (
        <motion.div
          key={`image-${image.id}`}
        
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          style={{
            willChange: "transform", // Optimize for animations
          }}
        >
          <motion.img
            src={image.url}
            alt={`Image ${image.id}`}
            loading="lazy" // Lazy load images
            className="w-64 h-64 object-cover rounded-lg shadow-lg"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden", // Prevent flickering
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ImageAnimate;
