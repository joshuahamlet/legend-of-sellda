import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL } from "../Constants/productConstant"


function productListReducer(state = { products: [] }, action) {

    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return {loading:false, products: action.payload}    
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
        }
    }

    function productDetailReducer(state = { details: {} }, action) {

        switch (action.type) {
            case PRODUCT_DETAIL_REQUEST:
                return {loading: true}
            case PRODUCT_DETAIL_SUCCESS:
                return {loading:false, details: action.payload}    
            case PRODUCT_DETAIL_FAIL:
                return {loading: false, error: action.payload}
            default:
                return state
            }
        }

export { productListReducer, productDetailReducer }




