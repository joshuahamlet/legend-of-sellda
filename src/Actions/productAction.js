import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_PATCH_REQUEST, PRODUCT_PATCH_FAIL, PRODUCT_PATCH_SUCCESS } from "../Constants/productConstant"
import axios from "axios"


const listProducts = () => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const {data} = await axios.get('/products', {}, { headers : {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin' : '*',} } )
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
    }
}

const detailProducts = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST })
        const {data} = await axios.get('/products/' + productId)
        dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: PRODUCT_DETAIL_FAIL, payload: error.message})
    }
}

const patchProduct = (productId, productName, token) => async (dispatch) => {



    try {
        dispatch({ type: PRODUCT_PATCH_REQUEST})
        const {data} = await axios.patch('/products/' + productId, {
            name: productName
        }, 
        {
        headers: {
            'auth-token': token            
        }
        })
        dispatch({ type: PRODUCT_PATCH_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: PRODUCT_PATCH_FAIL, payload: error.message})
    }    
}

export { listProducts, detailProducts, patchProduct }