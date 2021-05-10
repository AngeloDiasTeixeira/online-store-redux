import { Link } from "react-router-dom";

const Product = ({product}) => {
    return (
        <Link to={`/products/productDetail/${product.id}`}>
            <div className="product-container">
                <div className="image-container">
                    <img src={product.imageUrl} alt=""/>
                </div>
                <span>Name: {product.name}</span>
                <span>Category: {product.category}</span>
                <span>Price: {product.price}</span>
            </div>
        </Link>
    )
}

export default Product;