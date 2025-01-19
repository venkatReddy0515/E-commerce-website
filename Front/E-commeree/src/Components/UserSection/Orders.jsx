import React, { useEffect, useState } from "react";
import Axios from "axios"
import "./Orders.css"
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const token=localStorage.getItem("token");
        Axios.get("https://e-commerce-website-zt25.onrender.com/api/place-order/order-details",{headers:{Authorization:`Bearer ${token}`}})
        .then((response)=>{
            console.log(response.data.OrderProducts);
            setOrders(response.data.OrderProducts)
        })
        .catch((error)=>{
            console.log(error);
        })
    }, []);

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="orders-container">
        {orders.length === 0 ? (
            <p>No orders found.</p>
        ) : (
            orders.map((order) => (
            <div key={order._id} className="order-card">
                <div className="order-header">
                <h3>Order ID: {order._id}</h3>
                <p>Status: {order.status}</p>
                </div>
                <div className="order-details">
                <p>
                    <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
                </p>
                <p>
                    <strong>Payment Method:</strong> {order.payment}
                </p>
                <p>
                    <strong>Shipping Address:</strong> {order.street}, {order.city}, {order.district},{" "}
                    {order.pincode}
                </p>
                <p>
                    <strong>Phone:</strong> {order.phone}
                </p>
                <h4>Items:</h4>
                {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                    <img src={item.product.image} alt={item.product.name} className="product-image" />
                    <div className="item-info">
                        <p>
                        <strong>Product:</strong> {item.product.name}
                        </p>
                        <p>
                        <strong>Quantity:</strong> {item.quantity}
                        </p>
                        <p>
                        <strong>Size:</strong> {item.size}
                        </p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            ))
        )}
        </div>
  );
};

export default Orders;
