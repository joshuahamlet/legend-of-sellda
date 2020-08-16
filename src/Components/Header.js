import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaHome } from 'react-icons/fa'
import { BsPencilSquare } from 'react-icons/bs'
import './Header.css'
import { useSelector } from 'react-redux'

const Header = () => {

    const userSignin = useSelector(state => state.userSignin)
    const userRegister = useSelector(state => state.userRegister)
    const { userInfo } = userSignin
    const { userInfoNew } = userRegister

    return (
        <div className="headerContainer">
            <div className="headerLeft">
                <Link className="header-title" to={"/"}>LEGEND_OF_SELLDA</Link>
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
        </div>
    )
}

export default Header 