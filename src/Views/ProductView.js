import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { detailProducts } from '../Actions/productAction';
import { addToCart } from '../Actions/cartAction'
import { PRODUCT_DETAIL_REQUEST } from '../Constants/productConstant';
import { motion } from 'framer-motion'
import { GiCutDiamond } from 'react-icons/gi'
import tunic from '../tunic.png'
import './ProductView.css'

const ProductView = (props) => {

    const [quantity, setQuantity] = useState(1)
    const productDetail = useSelector(state => state.productDetail)
    const { details, loading, error } = productDetail
    const dispatch = useDispatch()

    const addToCartHandler = () => {
        dispatch(addToCart(details, quantity))
    }

    
    useEffect(() => {
        dispatch(detailProducts(props.match.params.id))
        return () => {
            dispatch({ type: PRODUCT_DETAIL_REQUEST })
        }
    }, [dispatch, props.match.params.id])


    const containerVariants = {
        hidden: {
            opacity: 0,
            x: '200vw'
        },
        visible: {
            opacity: 1,
            x: '0vw',
            transition: { delay: .1, duration: .75 }
        },
        exit: {
            x: '-200vw',
            transition: { delay: .1, duration: .75 }
        }
    }
    
    return ( 
        loading ? <div>Just a sec...</div> :
        error ? <div>{error}</div> :

        <div className="product-container">

        <motion.div className="product-card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
          
          <img src={tunic} className="product-card-image" alt="Product" />
              
          <div className="product-card-name">
            {details.name}
          </div>

          <div className="product-card-price">
            Price: <GiCutDiamond/> {details.price} 
          </div>

          <div className="product-card-rating">
            {details.rating}
          </div>

          <div className="product-card-quantity"> 
            Qty: <select value={quantity*1} onChange={(e) => { setQuantity(e.target.value)}}>
                    {[...Array(details.numberInStock).keys()].map(x =>
                        <option key={x+1} value={x+1}>{x+1}</option>
                    )}
                 </select> 
          </div>

          { details.numberInStock > 0 ? <button className="product-card-order" onClick={addToCartHandler}>ORDER</button> : <div>Sorry dude, we out</div> }
        </motion.div>
    
        </div>

    )}

export default ProductView