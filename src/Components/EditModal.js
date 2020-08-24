import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { patchProduct } from '../Actions/productAction'
import { useDispatch, useSelector } from 'react-redux'
import './EditModal.css'



const EditModal = ({ editModal, editModalHandler, editData }) => {

    const [editDataName, setEditDataName] = useState(editData.name);
    useEffect(() => { setEditDataName(editData.name)}, [editData.name] )
    const [editDataType, setEditDataType] = useState(editData.productType);
    useEffect(() => { setEditDataType(editData.productType)}, [editData.productType] )
    const [editDataPrice, setEditDataPrice] = useState(editData.price);
    useEffect(() => { setEditDataPrice(editData.price)}, [editData.price] )

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin

    const dispatch = useDispatch()

    const containerVariants = {
        hidden: {
            opacity: 0,
            x: '100vw',
            y: '-50%'
        },
        
        visible2: {
            opacity: 1,
            x: '-50%',
            y: '-50%',
            transition: { delay: .2, duration: .5 }
        },
        exit: {
            x: '-100vw',
            transition: { delay: .1, duration: .5 },
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

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(patchProduct(editData._id, editDataName, userInfo.token));
      }

    console.log(editData.name)
    console.log("EDITDATA", editDataName)

    return (
        <AnimatePresence exitBeforeEnter>
            { editModal && (
                <div>
                    <motion.div 
                    onClick={editModalHandler}
                    className="edit-modal-backdrop"
                    variants={containerVariants}
                    initial="hiddenFade"
                    animate="visibleFade"
                    exit="exitFade"
                    />
                    <motion.form
                    onSubmit={submitHandler} 
                    className="edit-form-card"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible2"
                    exit="exit"
                    >

                      <h2>{editData.name}</h2>
                      <div className="edit-form-card-id">Id: {editData._id}</div>
                      
                      <label htmlFor="editDataName">Name</label>
                      <input 
                      type="text" 
                      id="editDataName" 
                      name="editDataName" 
                      value={editDataName || ""} 
                      onChange={(e) => setEditDataName(e.target.value)}>
                      </input>

                      <label htmlFor="editDataType">Type</label>
                      <input 
                      type="text" 
                      id="editDataType" 
                      name="editDataType" 
                      value={editDataType || ""} 
                      onChange={(e) => setEditDataType(e.target.value)}>
                      </input>

                      <label htmlFor="editDataPrice">Name</label>
                      <input 
                      type="text" 
                      id="editDataPrice" 
                      name="editDataPrice" 
                      value={editDataPrice || ""} 
                      onChange={(e) => setEditDataPrice(e.target.value)}>
                      </input>               
                     
                     <div style={{display: "flex"}} >
                      <motion.button 
                      type="submit"
                      className="edit-modal-button"
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: .25 },
                      }}
                      >
                      SAVE
                      </motion.button>
                      {console.log("EDITDATA", editDataName)}
                      <motion.button 
                      type="reset" 
                      className="edit-modal-button"
                      onClick={editModalHandler}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: .25 },
                      }}
                      >
                      CANCEL
                      </motion.button>
                     </div>

                    </motion.form>
                </div>
            )}
        </AnimatePresence>





    )
}

export default EditModal