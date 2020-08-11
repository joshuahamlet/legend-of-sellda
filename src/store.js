import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { productListReducer, productDetailReducer } from './Reducers/productReducer'
import { cartReducer } from './Reducers/cartReducer'
import Cookie from 'js-cookie'
import thunk from 'redux-thunk'
import { userSigninReducer, userRegisterReducer } from './Reducers/userReducer';

const cartItems = Cookie.getJSON("cartItems") || []
const userInfo = Cookie.getJSON("userInfo") || null
const userInfoNew = Cookie.getJSON("userInfoNew") || null


const initialState = { cart: { cartItems }, userSignin: { userInfo }, userRegister: { userInfoNew } }

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer
})


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))
export default store