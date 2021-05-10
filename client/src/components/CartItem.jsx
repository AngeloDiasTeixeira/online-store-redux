const CartItem = ({product}) => {
    return (
        <div className="product-card">
            <div className="image-container">
                <img src={product.imageUrl} alt=""/>
            </div>
            <span>Name: {product.name}</span>
            <span>Category: {product.category}</span>
            <span>Price: {product.price}</span>
            <span>Quantity: {product.quantity}</span>
        </div>
    )
}

export default CartItem;