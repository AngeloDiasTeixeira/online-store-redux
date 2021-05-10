import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const domainAndPort = ((process.env.NODE_ENV) == "development") ? "http://localhost:3001/" : "";
const domainAndPort1="asçldfjalçfjdlça";
export const addToCartAsync = createAsyncThunk("cart/addToCart", ({productIdQuantity,cart,products}) => {
    let {id, quantity} = productIdQuantity;
    let inCart = false, newCart = [];
    cart.forEach(p => {if(p.id == id) inCart=true;});
        
    if(inCart) newCart = cart.map(p => (p.id == id) ? {...p, quantity: quantity+p.quantity} : {...p});
    else newCart = cart.concat({...products.find(p => p.id == id),quantity:quantity});
    alert(`${domainAndPort}api/shoppingCart`);    
    fetch(`api/shoppingCart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCart)
    });
        
    return newCart;
    }
);

export const removeFromCartAsync = createAsyncThunk("cart/removeFromCart", ({productIdQuantity,cart}) => {
    let {id, quantity} = productIdQuantity;
    let newCart = cart.map(p => (p.id == id) ? {...p, quantity: p.quantity-quantity} : {...p});
    newCart = newCart.filter(p => p.quantity > 0);
        
    fetch(`${domainAndPort1}api/shoppingCart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCart)
    });

    return newCart;
    }
);

export const finishOrderAsync = createAsyncThunk("cart/finishOrder", ({orderDetails,cart}) => {
        let totalCost = 0;
        orderDetails.purchasedItems = cart;
        cart.forEach(item => totalCost += item.price * item.quantity);
        orderDetails.totalCost = totalCost;
            
        fetch(`${domainAndPort}api/shoppingOrders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderDetails)
        });
        
        fetch(`${domainAndPort}api/shoppingCart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([])
        });
        
        return []; 
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {cart: []},
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(addToCartAsync.fulfilled, (state,action) => {
            state.cart = action.payload;
        })
        .addCase(removeFromCartAsync.fulfilled, (state,action) => {
            state.cart = action.payload;
        })
        .addCase(finishOrderAsync.fulfilled, (state,action) => {
            state.cart = action.payload;
        })
    }
});

export const selectCartItems = state => state.cart.cart;

export default cartSlice.reducer;