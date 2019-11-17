import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header/Header.js";
import ProductList from "./Components/ProductList/ProductList";
import { Switch, Route } from "react-router-dom";
import Menu from "./Components/Menu/Menu";
import CartDialog from "./Components/CartDialog/CartDialog";
import Details from "./Components/Details/Details";
import Order from "./Components/Order/Order";
import Login from "./Components/Login/Login";
import mylogin from "./Components/mylogin/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Footer from "./Components/Footer/Footer";
import Home from './Components/mylogin/Home';
import Secure from './Components/mylogin/Secure';
import Partial from './Components/mylogin/Partial';
import db from './Components/mylogin/db';


import Verify from './Components/mylogin/Verify';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Menu />
          <div className="content">
            <CartDialog />
            <Switch>
              <Route path="/" exact component={ProductList} />
              <Route path="/details/:id" component={Details} />
                        <Route path="/login" component={mylogin} />
                        <Route exact path="/" component={Home} />
                        <Route path="/Login" component={Login} />
                        <Route path="/Verify" component={Verify} />
                        <Route path="/Partial" component={Partial} />
                        <Route path="/Secure" component={Secure} />
                        <Route path="/db" component={db} />

                      
              <ProtectedRoute path="/order" component={Order} />
              <Route
                component={() => (
                  <div style={{ padding: 20 }}>Page not found</div>
                )}
              />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
