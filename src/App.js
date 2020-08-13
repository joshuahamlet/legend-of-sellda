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

function App() {
  const location = useLocation()

  return (
    
    <div className="App">
          <Header />
      <div className="App-container">
        <AnimatePresence initial={false} exitBeforeEnter>
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

