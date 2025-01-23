export const avatarVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01]
    }
  }
};

export const messageVariants = {
  hidden: { scale: 0.7, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01]
    }
  }
};