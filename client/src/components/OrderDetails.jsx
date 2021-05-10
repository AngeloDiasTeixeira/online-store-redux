import { useState } from "react";
import { useDispatch } from "react-redux";
import { finishOrderAsync } from "../cartSlice";
import { useSelector } from "react-redux";
import { selectCartItems } from "../cartSlice";

const OrderDetails = () => {
    let dispatch = useDispatch();
    let cart = useSelector(selectCartItems);
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [touched, setTouched] = useState({});
    const [status, setStatus] = useState("IDLE");
    const [completed, setCompleted] = useState(false);

    const errors = getErrors();
    let isValid = Object.keys(errors).length==0;
    
    function getErrors() {
        const result = {};
        if(!name) result.name = "Name is required!";
        if(!city) result.city = "City is required!";
        if(!country) result.country = "Country is required!";
        if(!address) result.address = "Address is required!";
        return result;
    }

    const handleBlur = e => {
        setTouched( prev => {
            return {...prev, [e.target.id]:true};
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        if(isValid){
            dispatch(finishOrderAsync({
                                        orderDetails: {name,city,country,address}, 
                                        cart:cart
                                    }));
            setName("");
            setCity("");
            setCountry("");
            setAddress("");
            setCompleted(true);
        }
        else setStatus("SUBMITTED");
    }

    if(completed)
        return <h1 style={{width:"300px",margin:"100px auto"}}>Order Completed</h1>

    return (
        <div className="order-details-container">
            <h1>Order Details</h1>
            <form onSubmit={onSubmit}>
                {!isValid && status=="SUBMITTED" && (
                    <ul>
                        {Object.keys(errors).map(key => (
                            <div key={key} style={{color:"red", display:"block", textAlign:"center"}}>
                                {errors[key]}
                            </div>
                        ))}
                    </ul>
                )}
                <div className="form-entry">
                    <label htmlFor="name">Name: </label>
                    <input id="name" value={name} onChange={e => setName(e.target.value)} onBlur={handleBlur} />
                </div>
                <span style={{color:"red",display:"block",textAlign:"center"}}>
                        {touched.name && errors.name}
                </span>
                <div className="form-entry">
                    <label htmlFor="city">City: </label>
                    <input id="city" value={city} onChange={e => setCity(e.target.value)} onBlur={handleBlur} />
                </div>
                <span style={{color:"red",display:"block",textAlign:"center"}}>
                        {touched.city && errors.city}
                </span>
                <div className="form-entry">
                    <label htmlFor="country">Country: </label>
                    <input id="country" value={country} onChange={e => setCountry(e.target.value)} onBlur={handleBlur} />
                </div>
                <span style={{color:"red",display:"block",textAlign:"center"}}>
                        {touched.country && errors.country}
                </span>
                <div className="form-entry">
                    <label htmlFor="address">Address: </label>
                    <input id="address" value={address} onChange={e => setAddress(e.target.value)} onBlur={handleBlur} />
                </div>
                <span style={{color:"red",display:"block",textAlign:"center"}}>
                        {touched.address && errors.address}
                </span>
                <button  type="submit">Finish Order</button>
            </form>
        </div>
    )
}

export default OrderDetails;