import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import ShoppingCart from "./components/ShoppingCart";
import OrderDetails from "./components/OrderDetails";
import HomePage from "./components/HomePage";
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Switch>
        <Route exact path="/products/:category">
          <Products/>
        </Route>
        <Route path="/products/productDetail/:productId">
          <ProductDetail/>
        </Route>
        <Route path="/shoppingCart">
          <ShoppingCart/>
        </Route>
        <Route path="/orderDetails">
          <OrderDetails />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
