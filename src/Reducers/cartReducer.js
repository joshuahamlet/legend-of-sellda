import { ADD_TO_CART, REMOVE_FROM_CART, ADJUST_QUANTITY_CART, SAVE_SHIPPING_CART } from "../Constants/cartConstant";

function cartReducer(state = { cartItems: [] }, action) {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload
            const product = state.cartItems.find(x => x._id === item._id)
            console.log("item", item)
            console.log("product", product)
            if (product) {
                return {
                    cartItems:
                        state.cartItems.map(x => x._id === product._id ? {...item, quantity: item.quantity + product.quantity} : x)
                }
            }
            return { cartItems: [...state.cartItems, item] }
        case ADJUST_QUANTITY_CART:
            const itemA = action.payload
            const productA = state.cartItems.find(x => x._id === itemA._id)
            if (productA) {
                return {
                    cartItems:
                        state.cartItems.map(x => x._id === productA._id ? {...itemA, quantity: itemA.quantity} : x)
                }
            }
            return { cartItems: [...state.cartItems, itemA] }
        case REMOVE_FROM_CART:
            return { cartItems: state.cartItems.filter(x => x._id !== action.payload) }
        case SAVE_SHIPPING_CART:
            return {...state, shipping: action.payload}
        default:
            return state
    }
}

export { cartReducer } 