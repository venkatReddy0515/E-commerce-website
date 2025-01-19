import React, { useState, useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import Message from "../../Message";
import { ShopContext } from "../Main/ProductSection";
import "./Pay.css"
const PaySection = () => {
    const   {add} = useContext(ShopContext);
    const   [total,setTotal]=useState(0)
    const   [phone,setPhone]=useState('')
    const   [city,setCity]=useState('')
    const   [disct,setDisct]=useState('')
    const   [street,setStreet]=useState('');
    const [pincode,setPincode]=useState('');
    const [payment,setPayment]=useState('');
    const [success,setSuccess]=useState(null)
    const [message,setMessage]=useState('');
    useEffect(() => {
    const fetchCartTotal = async () => {
      try {
        const token=localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/cart/total",{headers:{Authorization:`Bearer ${token}`}});
        console.log(response.data);
        setTotal(response.data.totalPrice);
      } catch (error) {
        console.error("Error fetching total price:", error);
      }
    };
    fetchCartTotal();
  }, []);

const handleForm=()=>{
  const token=localStorage.getItem("token");
  axios.post("http://localhost:5000/api/place-order/order",{phone,street,city,district:disct,payment,pincode},{headers:{Authorization:`Bearer ${token}`}})
  .then((response)=>{
    console.log(response.data);
    setSuccess(true);
    setMessage("Order is placed.");
    add();
  })
  .catch((error)=>{
    console.log(error);
    setSuccess(false);
    setMessage("Order is Failed to place");
  })
  
}

  return (
    <div className="order-page">
    <h1>Place Your Order</h1>
    <div className="order-content">
      <div className="order-form">
        <h2>Shipping Details</h2>
          {message && <Message success={success} message={message}/>}
        <form>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={street}
            onChange={(e)=>setStreet(e.target.value)}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            required
          />
          <input
            type="text"
            name="district"
            placeholder="District"
            value={disct}
            onChange={(e)=>setDisct(e.target.value)}
            required
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={pincode}
            onChange={(e)=>setPincode(e.target.value)}
            required
          />
        </form>
      </div>

      <div className="payment-details">
        <h2>Payment Method</h2>
        <select
          name="payment"
          value={payment}
          onChange={(e)=>setPayment(e.target.value)}
        >
          <option value="--select payment method--">--Select payment method--</option>
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI</option>
          <option value="Credit Card">Credit Card</option>
        </select>
        <h3>Total Price: ${total}</h3>
        <h3>Shipping Price: $0.5</h3>
        <h2>Grand Total: ${total + 0.5}</h2>

        <button type="submit" className="place-order-btn" onClick={handleForm}>
          Place Order
        </button>
      </div>
    </div>
  </div>
    );
};

export default PaySection;
