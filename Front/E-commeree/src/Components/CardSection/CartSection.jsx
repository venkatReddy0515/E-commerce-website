import { useContext, useState } from "react";
import { ShopContext } from "../Main/ProductSection";
import Axios from "axios"
import "./cart.css"
import Message from "../../Message";
import {Link} from "react-router-dom"
function CartSection() {
  const { cart,price,add} = useContext(ShopContext);
  const [success,setSuccess]=useState(null);
  const [message,setMessage]=useState('');
  console.log(cart,add)
  const handleRemoveCart = (product) => {
    const token=localStorage.getItem("token");
        Axios.post("https://e-commerce-website-zt25.onrender.com/api/cart/delete",{productId:product._id},{headers:{Authorization:`Bearer ${token}`}})
        .then((response)=>{
          console.log(response.data);
          add();
          setSuccess(true);
          setMessage("item is removed from cart");
        })
        .catch((error)=>{
          console.log(error);
          setSuccess(false);
          setMessage("Failed to remove");
        })
  };

  if (!cart || cart.length === 0) {
    return <div className="no">Your cart is empty.</div>;
  }

  return (
    <div className="cart-section1">
    
      <h1>Your Cart</h1>
      {message&& <Message success={success} message={message}/>}
      <div className="cart-products">
        {cart.map((product) => (
          <div key={product._id} className="cart-product">
            <img src={product.product.image} alt={product.product.name} />
            <h3>{product.product.name}</h3>
            <p>${product.product.price}</p>
            <p>{product.quantity}</p>
            <button onClick={() => handleRemoveCart(product)} className="remove-button">
              Remove from Cart
            </button>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <p>Total: ${price}</p>
        <Link to={"/place-order"}><button className="checkout-button">Proceed to Checkout</button></Link>
      </div>
    </div>
  );
}

export default CartSection;
