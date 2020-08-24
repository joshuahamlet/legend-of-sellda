import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { listProducts } from '../Actions/productAction';
import { PRODUCT_LIST_REQUEST } from '../Constants/productConstant';
import { motion } from 'framer-motion'
import EditModal from '../Components/EditModal'
import lensoftruth from '../lensoftruth.png'
import Loader from '../Components/Loader'
import './EditView.css'

const EditView = (props) => {

    const [inputValue, setInputValue] = useState('')
    const [editData, setEditData] = useState('')
    const [editModal, setEditModal] = useState(false)
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList
    const dispatch = useDispatch()

    const editModalHandler = (data) => {
        setEditModal(!editModal)
        setEditData(data)
    }
    
    const filteredProducts =
        products &&
        products.filter(product => {
            return product.name.toLowerCase().includes(inputValue.toLowerCase())
        })
    
    let productsData = 
        filteredProducts ? filteredProducts :
        products ? products : []

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
    
    console.log(editData)

    return loading ? 
        
        <Loader/> :
        
        error ? <div>{error}</div> :

        
        <div className="edit-container">

        <EditModal 
        editModal={editModal} 
        setEditModal={setEditModal} 
        editModalHandler={editModalHandler}
        editData={editData}
        />

        <motion.div 
        className="nes-container-container-edit"
        variants={containerVariants}
        initial="hidden"
        animate="visible1"
        exit="exit"
        >
            <div className="nes-container-edit">
            <div className="nes-title-edit">SEARCH</div>
            <div className="nes-edit">
                <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} />
                <img src={lensoftruth} alt="search icon" />
            </div>    
            </div>
        </motion.div>

        <motion.div className="edit-item-card"
        variants={containerVariants}
        initial="hidden"
        animate="visible1"
        exit="exit"
        >
        

        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Type</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                {  
                productsData.map(productData => 
                    <tr key={productData._id}>
                        <td key={productData._id + "NM"}>{productData.name}</td>
                        <td key={productData._id + "PR"}>{productData.price}</td>
                        <td key={productData._id + "TP"}>{productData.productType}</td>
                        <td key={productData._id + "BT"}>
                            <motion.button 
                            onClick={() => editModalHandler(productData)} 
                            className="edit-button" 
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: .25 },
                            }}
                            >EDIT
                            </motion.button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>

        </motion.div>

        </div>
    
}

export default EditView
