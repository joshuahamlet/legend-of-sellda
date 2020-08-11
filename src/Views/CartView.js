import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import { removeFromCart, adjustQuantityCart } from '../Actions/cartAction'
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
            transition: { delay: .1, duration: .75 }
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

    return(

        <div className="cart-container">

        <motion.div className="cart-list"
            variants={containerVariants}
            initial="hiddenB"
            animate="visibleB"
            exit="exitB"
        >
            CART

            {cartItems.map(cartItem => 
            <div key={cartItem._id}>
                <Link to={'/products/' + cartItem._id}>
                    <li key={cartItem._id}>{cartItem.name} : {cartItem.quantity}</li>
                </Link>

                Qty: <select value={cartItem.quantity} onChange={(e) => dispatch(adjustQuantityCart(cartItem, e.target.value))}>
                        {[...Array(cartItem.numberInStock).keys()].map(x =>
                            <option key={x+1} value={x+1}>{x+1}</option>
                        )}
                       </select> 

                    <button type="button" onClick={() => removeItemHandler(cartItem._id)}>Remove</button>
            <div className="cart-list-divider" />
            </div>
            
            )}
        </motion.div>

        <motion.div className="cart-total"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        >
            <div className="cart-total-title">Subtotal</div>
            <div className="cart-total-item">({totalItems} Items)</div>
            <div className="cart-total-amount">${cartTotal}</div>
            

            
            <button onClick={checkoutHandler}>CHECKOUT</button>
        </motion.div>

        </div>
    )
}

export default CartView
