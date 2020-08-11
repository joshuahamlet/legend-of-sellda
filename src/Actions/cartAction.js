import { ADD_TO_CART, REMOVE_FROM_CART, ADJUST_QUANTITY_CART, SAVE_SHIPPING_CART } from "../Constants/cartConstant"
import Cookie from 'js-cookie'


const addToCart = (details, quantity) => async (dispatch, getSate) => {
    try {
            dispatch({
            type: ADD_TO_CART, payload: {
                _id: details._id,
                name: details.name,
                image: details.image,
                price: details.price,
                numberInStock: details.numberInStock,
                quantity: quantity*1
            }
        })

        const { cart: { cartItems } } = getSate()
        Cookie.set("cartItems", JSON.stringify(cartItems))

    } catch (error) {

    }
}

const adjustQuantityCart = (details, quantity) => (dispatch, getSate) => {
    try {
            dispatch({
            type: ADJUST_QUANTITY_CART, payload: {
                _id: details._id,
                name: details.name,
                image: details.image,
                price: details.price,
                numberInStock: details.numberInStock,
                quantity: quantity*1
            }
        })

        const { cart: { cartItems } } = getSate()
        Cookie.set("cartItems", JSON.stringify(cartItems))

    } catch (error) {

    }
}

const removeFromCart = (productId) => (dispatch, getSate) => {
    dispatch({ type: REMOVE_FROM_CART, payload: productId })

    const { cart: { cartItems } } = getSate()
        Cookie.set("cartItems", JSON.stringify(cartItems))
}

const saveShipping = (data) => (dispatch) => {
    dispatch({ type: SAVE_SHIPPING_CART, payload: data })
}

export { addToCart, removeFromCart, adjustQuantityCart, saveShipping }