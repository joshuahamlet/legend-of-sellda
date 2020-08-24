import React, { useState, useEffect } from 'react'
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
    }

    useEffect(() => {
        let windowOffset = window.scrollY
        console.log(hamburgerToggle)
        if (hamburgerToggle) {
            document.body.setAttribute('style', `position: fixed; top: -${windowOffset}px; left: 0; right: 0`)
        } else {
            document.body.setAttribute('style', '')
            window.scrollTo(0, windowOffset)
        }
    }, [hamburgerToggle])

    const headerVariants = {
        headerHidden: {
            x: '100vw'
        },
        headerVisible: {
            x: '0vw',
            transition: { type: "spring", stiffness: 100 }
        },
        headerExit: {
            x: '100vw',
            transition: { type: "spring", stiffness: 100 },
        }
    }

    const headerBackdropVariants ={
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

    const hamburgerVariants = {
        bar1Start: {
            rotate: 0, 
            y: 0
        },
        bar2Start: {
            opacity: 1
        },
        bar3Start: {
            rotate: 0, 
            y: 0
        },
        bar1End: {
            rotate: -45, 
            y: 6
        },
        bar2End: {
            opacity: 0
        },
        bar3End: {
            rotate: 45, 
            y: -16
        }


    }

    return (
        <div className="headerContainer">
            <div className="headerLeft">
                <Link className="header-title" to={"/"}>LEGEND_OF_SELLDA</Link>
            </div>
            <div className="header-hamburger">
                <div className="hamburger-toggle-button" onClick={hamburgerToggleHandler}>
                    <motion.div className="ham-bar-1"
                    variants={hamburgerVariants}
                    initial={!hamburgerToggle ? "bar1Start" : "bar1End"}
                    animate={!hamburgerToggle ? "bar1Start" : "bar1End"} />
                    <motion.div className="ham-bar-2"
                    variants={hamburgerVariants}
                    initial={!hamburgerToggle ? "bar2Start" : "bar2End"}
                    animate={!hamburgerToggle ? "bar2Start" : "bar2End"} />
                    <motion.div className="ham-bar-3"
                     variants={hamburgerVariants}
                     initial={!hamburgerToggle ? "bar3Start" : "bar3End"}
                     animate={!hamburgerToggle ? "bar3Start" : "bar3End"} />
                </div>
            </div>
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
                <>
                
                <motion.div className="hamburger-toggle-backdrop"
                variants={headerBackdropVariants}
                initial="hiddenFade"
                animate="visibleFade"
                exit="exitFade"
                onClick={hamburgerToggleHandler}>
                </motion.div>
                <motion.div className="hamburger-toggle"
                variants={headerVariants}
                initial="headerHidden"
                animate="headerVisible"
                exit="headerExit"
                >
                <div className="nes-container">
                    <p className="nes-title">MENU</p>
                    <Link to={"/"} onClick={hamburgerToggleHandler}>HOME</Link>
                    <Link to={"/edit"} onClick={hamburgerToggleHandler}>EDIT</Link>
                    <Link to={"/cart/:id?"} onClick={hamburgerToggleHandler}>CART</Link>
                    {
                    userInfo ? <div>{userInfo.name}</div> :
                    userInfoNew ? <div>{userInfoNew.name}</div> :
                    <Link to={'/signin'} onClick={hamburgerToggleHandler}>SIGN IN</Link>
                }
                </div>
                </motion.div>
                
                </>
            }
            </AnimatePresence>
        </div>
    )
}

export default Header 