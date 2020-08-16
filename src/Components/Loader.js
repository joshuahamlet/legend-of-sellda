import React from 'react'
import { motion } from 'framer-motion'
import './Loader.css'

const Loader = () => {

const loaderContainerVariants = {
    fadeStart: {
      opacity: 0   
    },
    fadeEnd: {
      opacity: 1,
      transition: { duration: 1}
    }
}

const loaderCircleVariants = {
    bounceyBall1: {
     y: [0, -30],
     opacity: [.3, 1],
     transition: {
         y: {
            yoyo: Infinity,
            duration: .4,
            ease: "easeInOut"
         },
         opacity: {
            yoyo: Infinity,
            duration: .4,
            ease: "easeInOut"
         }
     }
    },
    bounceyBall2: {
        y: [0, -30],
        opacity: [.3, 1],
        transition: {
            y: {
               yoyo: Infinity,
               duration: .4,
               ease: "easeInOut",
               delay: .1
            },
            opacity: {
                yoyo: Infinity,
                duration: .4,
                ease: "easeInOut",
                delay: .1
             }
        }
       },
       bounceyBall3: {
        y: [0, -30],
        opacity: [.3, 1],
        transition: {
            y: {
               yoyo: Infinity,
               duration: .4,
               ease: "easeInOut",
               delay: .2
            },
            opacity: {
                yoyo: Infinity,
                duration: .4,
                ease: "easeInOut",
                delay: .2
             }
        }
       },
}


    return (
        <div className="loader-container">
        <motion.div className="loader-card"
        variants={loaderContainerVariants}
        initial="fadeStart"
        animate="fadeEnd"    
        >
            <motion.span className="loader-circle"
            variants={loaderCircleVariants}
            animate="bounceyBall1"
            />
            <motion.span className="loader-circle"
            variants={loaderCircleVariants}
            animate="bounceyBall2"
            />
            <motion.span className="loader-circle"
            variants={loaderCircleVariants}
            animate="bounceyBall3"
            />
        </motion.div>
        </div>
    )
}

export default Loader