import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { patchProduct } from '../Actions/productAction'
import './EditModal.css'
import { useDispatch, useSelector } from 'react-redux'



const EditModal = ({ editModal, setEditModal, editModalHandler, editData }) => {

    const [editDataId, setEditDataId] = useState(editData._id);
    const [editDataName, setEditDataName] = useState(editData.name);
    useEffect(() => { setEditDataName(editData.name)}, [editData.name] )

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin

    const dispatch = useDispatch()

    const containerVariants = {
        hidden: {
            opacity: 0,
            x: '100vw',
            y: '-50%'
        },
        visible1: {
            opacity: 1,
            x: '0vw',
            transition: { delay: .1, duration: .75 }
        },
        visible2: {
            opacity: 1,
            x: '-50%',
            y: '-50%',
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
                    className="edit-form-card"/*onSubmit={submitHandler}*/ 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible2"
                    exit="exit"
                    >
                      <ul >
                        <li>
                          <h2>Let's edit some shit</h2>
                          <div>{editData.name}</div>
                          <div>{editData._id}</div>
                          <div>{editData.productType}</div>
                          <div>{editData.price}</div>
                          <label htmlFor="editDataName">Name</label>
                          <input type="text" id="editDataName" name="editDataName" value={editDataName} onChange={(e) => setEditDataName(e.target.value)}>
                          </input>
                        </li>
                      </ul>
                      <button type="submit">SAVE</button>
                      {console.log("EDITDATA", editDataName)}
                      <button type="reset" onClick={editModalHandler}>CANCEL</button>
                    </motion.form>
                </div>
            )}
        </AnimatePresence>





    )
}

export default EditModal