import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { listProducts } from '../Actions/productAction';
import { PRODUCT_LIST_REQUEST } from '../Constants/productConstant';
import { motion } from 'framer-motion'

import { GiCutDiamond } from 'react-icons/gi'
import './HomeView.css'
import Loader from '../Components/Loader'


const HomeView = (props) => {

    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList
    const dispatch = useDispatch()

    
    useEffect(() => {
        dispatch(listProducts())
        return () => {
            dispatch({ type: PRODUCT_LIST_REQUEST})
        }
    }, [dispatch])

    const containerVariants = {
        hidden: {
            opacity: 0,
            x: '100vw'
        },
        visible1: {
            opacity: 1,
            x: '0vw',
            transition: { delay: .1, duration: .75 }
        },
        visible2: {
            opacity: 1,
            x: '0vw',
            transition: { delay: .2, duration: .75 }
        },
        visible3: {
            opacity: 1,
            x: '0vw',
            transition: { delay: .3, duration: .75 }
        },
        exit: {
            x: '-100vw',
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
    

    return loading ? 
        <Loader/>:
        
        error ? <div>{error}</div> :


        
        
        <div className="home-container">
        <motion.div className="item-card-title"
        variants={containerVariants}
        initial="hiddenFade"
        animate="visibleFade"
        exit="exitFade"
        >
            CLOTHING
        </motion.div>
        
        <motion.div className="item-card-row"
        variants={containerVariants}
        initial="hidden"
        animate="visible1"
        exit="exit"
        >
          {products.map(product => 
            product.productType === "clothing" &&
            <Link to={'/products/' + product._id}>
                <div className="item-card" key={product._id}>
                    <img src={product.image} className="item-card-image" alt="Product" />
                        <li key={product._id}>{product.name}</li>
                    <div>Price: <GiCutDiamond/> {product.price} </div>
                </div>    
            </Link>
          )}
        </motion.div>

        <motion.div className="item-card-title"
        variants={containerVariants}
        initial="hiddenFade"
        animate="visibleFade"
        exit="exitFade"
        >
            WEAPONS
        </motion.div>

        <motion.div className="item-card-row"
        variants={containerVariants}
        initial="hidden"
        animate="visible2"
        exit="exit"
        >
          {products.map(product => 
            product.productType === "weapon" &&
            <Link to={'/products/' + product._id}>
                <div className="item-card" key={product._id}>
                    <img src={product.image} className="item-card-image" alt="Product" />
                        <li key={product._id}>{product.name}</li>
                    <div>Price: <GiCutDiamond/> {product.price} </div>
                </div>    
            </Link>
          )}
        </motion.div>

        <motion.div className="item-card-title"
        variants={containerVariants}
        initial="hiddenFade"
        animate="visibleFade"
        exit="exitFade"
        >
            POTIONS
        </motion.div>

        <motion.div className="item-card-row"
        variants={containerVariants}
        initial="hidden"
        animate="visible3"
        exit="exit"
        >
          {products.map(product => 
            product.productType === "potion" &&
            <Link to={'/products/' + product._id}>
                <div className="item-card" key={product._id}>
                    <img src={product.image} className="item-card-image" alt="Product" />
                        <li key={product._id}>{product.name}</li>
                    <div>Price: <GiCutDiamond/> {product.price} </div>
                </div>    
            </Link>
          )}
        </motion.div>

        </div>
    
}

export default HomeView

/*
<motion.div 
            variants={loadingVariants}
            initial="hidden"
            animate="visible"
            exit="exit">

*/ 