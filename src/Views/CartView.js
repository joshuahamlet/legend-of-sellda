import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import { removeFromCart, adjustQuantityCart } from '../Actions/cartAction'
import rupee from '../rupee.png'
import './CartView.css'


const CartView = (props) => {

    
    const cartDetail = useSelector(state => state.cart)
    const { cartItems } = cartDetail
    const dispatch = useDispatch()

    let totalItems = cartItems.reduce((accumulator, itemCount) => {
        return accumulator + itemCount.quantity
    }, 0)

    let cartTotal = cartItems.reduce((accumulator, itemPrice) => {
        return accumulator + (itemPrice.price * itemPrice.quantity)
    }, 0)
            
    const removeItemHandler = (productId) => {
        dispatch(removeFromCart(productId))
    }

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping')
    }

    const containerVariants = {
        hidden: {
            opacity: 0,
            x: '100vw'
        },
        visible: {
            opacity: 1,
            x: '0vw',
            transition: { delay: .1, duration: .75 },
            transitionEnd: { finalized: 'yes' }
        },
        exit: {
            x: '100vw',
            transition: { delay: .1, duration: .75 }            
        },
        hiddenB: {
            opacity: 0,
            y: '100vh'
        },
        visibleB: {
            opacity: 1,
            y: '0vh',
            transition: { delay: .1, duration: .75 }
        },
        exitB: {
            y: '100vh',
            transition: { delay: .1, duration: .75 }
        }
    }

    const animationFinalized = containerVariants.visible.transitionEnd.finalized


    return(

        <div className="cart-container" style={ animationFinalized ? {overflow: "hidden"} : ""}>

        <motion.div className="cart-list"
            variants={containerVariants}
            initial="hiddenB"
            animate="visibleB"
            exit="exitB"
        >
        <div className="nes-container-cart">
            <div className="nes-container-cart-title">
                CART
            </div>

            {cartItems.map(cartItem => 
            <div key={cartItem._id}>
            <div className="cart-grid">
                <Link to={'/products/' + cartItem._id} className="cart-grid-image">
                    <img key={cartItem._id} src={cartItem.image} alt="product"/>
                </Link>
                <Link to={'/products/' + cartItem._id} className="cart-grid-name">
                    <li key={cartItem._id}>{cartItem.name}</li>
                </Link>
                <div className="cart-grid-qty">
                <div className="qty-qty">Qty: &zwnj;</div> <select value={cartItem.quantity} onChange={(e) => dispatch(adjustQuantityCart(cartItem, e.target.value))}>
                        {[...Array(cartItem.numberInStock).keys()].map(x =>
                            <option key={x+1} value={x+1}>{x+1}</option>
                        )}
                       </select> 

                    <motion.button 
                    type="button" 
                    onClick={() => removeItemHandler(cartItem._id)}
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: .25 },
                    }}
                    >
                    Remove
                    </motion.button>
                </div>
            </div>
            <div className="cart-list-divider" />
            </div>
            )}
        </div>
        </motion.div>

        <motion.div className="cart-total"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        >
            <div className="cart-total-title">Subtotal</div>
            <div className="cart-total-item">({totalItems} Items)</div>
            <div className="cart-total-amount"> <img className="rupee" src={rupee} alt="rupee" /> {cartTotal}</div>
            

            
            <motion.button 
            onClick={checkoutHandler}
            whileHover={{
                scale: 1.05,
                transition: { duration: .25 },
            }}
            >
            CHECKOUT
            </motion.button>
        </motion.div>

        </div>
    )
}

export default CartView
