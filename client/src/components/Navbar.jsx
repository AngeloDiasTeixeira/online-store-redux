import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <div className="navbar-container">
            <Link to="/products/shoes">shoes</Link>
            <Link to="/products/hats">hats</Link>
            <Link to="/products/backpacks">backpacks</Link>
            <Link to="/products/coats">coats</Link>
            <Link to="/shoppingCart">shopping cart</Link>
        </div>
    )
}

export default Navbar;