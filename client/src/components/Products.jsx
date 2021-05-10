import { useParams } from "react-router-dom";
import Product from "./Product";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../productsSlice";

const Products = () => {
    let products = useSelector(selectAllProducts);
    const { category } = useParams();

    let filteredProducts = products.filter(p => p.category == category);
    return(
        <div className="products-container">
            {filteredProducts.map(p => 
                <Product key={p.id} product={p} />)}
        </div>
    )
}

export default Products;