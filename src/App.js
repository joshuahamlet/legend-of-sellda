import React from 'react';
import { AnimatePresence } from 'framer-motion'
import './App.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import ProductView from './Views/ProductView'
import HomeView from './Views/HomeView'
import CartView from './Views/CartView'
import SigninView from './Views/SigninView'
import RegisterView from './Views/RegisterView';
import EditView from './Views/EditView ';
import ShippingView from './Views/ShippingView';
import Header from './Components/Header'
import axios from 'axios'

function App() {
  const location = useLocation()
  //axios.defaults.baseURL = "https://cors-anywhere.herokuapp.com/https://legend-of-sellda.herokuapp.com"
  axios.defaults.baseURL = "https://awesomeproxy.herokuapp.com/legend-of-sellda.herokuapp.com"

  return (
    
    <div className="App">
          <Header />
      <div className="App-container">
        <AnimatePresence initial={true} exitBeforeEnter>
            <Switch location={location} key={location.key}>
                <Route path="/" exact component={HomeView} />
                <Route path="/edit" component={EditView} />
                <Route path="/register" exact component={RegisterView} />
                <Route path="/signin" exact component={SigninView} />
                <Route path="/shipping" exact component={ShippingView} />
                <Route path="/products/:id" component={ProductView} />
                <Route path="/cart/:id?" component={CartView} />
            </Switch>
        </AnimatePresence>
      </div>
    </div>
    
  );
}

export default App;


