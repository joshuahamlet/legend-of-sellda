import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaHome } from 'react-icons/fa'
import { BsPencilSquare } from 'react-icons/bs'
import './Header.css'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

const Header = () => {

    const [hamburgerToggle, setHamburgerToggle] = useState(false)
    const userSignin = useSelector(state => state.userSignin)
    const userRegister = useSelector(state => state.userRegister)
    const { userInfo } = userSignin
    const { userInfoNew } = userRegister

    const hamburgerToggleHandler = () => {
        setHamburgerToggle(!hamburgerToggle)
        console.log(hamburgerToggle)
    }

    const headerVariants = {
        hidden: {
            opacity: 0,
            x: '100vw'
        },
        visible: {
            opacity: 1,
            x: '0vw',
            transition: { delay: .1, duration: .75 }
        },
        exit: {
            x: '100vw',
            transition: { delay: .1, duration: .75 },
            opacity: 0
        },
        hiddenFade: {
            opacity: 0
        },
        visibleFade: {
            opacity: 1,
            transition: { delay: .1, duration: 1 }
        },
        exitFade: {
            opacity: 0,
            transition: { delay: .1, duration: .75 }
        }
    }

    return (
        <div className="headerContainer">
            <div className="headerLeft">
                <Link className="header-title" to={"/"}>LEGEND_OF_SELLDA</Link>
            </div>
            <div className="header-hamburger"><button onClick={hamburgerToggleHandler}><div className="header-hamburger-arrow">&lt;</div></button></div>
            <div className="headerRight">
                {!userInfo ? "" : 
                 !userInfo.isAdmin ? "" :
                 <Link to={"/edit"}><BsPencilSquare /></Link>
                }
                <Link to={"/"}><FaHome /></Link>
                <Link to={"/cart/:id?"}><FaShoppingCart /></Link>
                {
                    userInfo ? <div>{userInfo.name}</div> :
                    userInfoNew ? <div>{userInfoNew.name}</div> :
                    <Link to={'/signin'} >SIGN IN</Link>
                }
            </div>
            <AnimatePresence exitBeforeEnter>
            {hamburgerToggle &&
                <motion.div className="hamburger-toggle-backdrop"
                variants={headerVariants}
                initial="hiddenFade"
                animate="visibleFade"
                exit="exitFade">
                <motion.div className="hamburger-toggle"
                variants={headerVariants}
                initial="hidden"
                animate="visible"
                exit="exit">
                    STUFF
                    <Link to={"/edit"}><BsPencilSquare /></Link>
                    <Link to={"/cart/:id?"}><FaShoppingCart /></Link>
                    {
                    userInfo ? <div>{userInfo.name}</div> :
                    userInfoNew ? <div>{userInfoNew.name}</div> :
                    <Link to={'/signin'} >SIGN IN</Link>
                }
                </motion.div>
                </motion.div>
            }
            </AnimatePresence>
        </div>
    )
}

export default Header 