import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Order.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [orderId]);

  const fetchOrders = () => {
    Axios.get("http://localhost:5000/api/place-order/order-list")
      .then((response) => {
        setOrders(response.data.order);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  const handleStatusChange = (e, id) => {
    const newStatus = e.target.value;
    setOrderId(id); // Trigger the useEffect to refetch orders
    Axios.post("http://localhost:5000/api/place-order/status", {
      status: newStatus,
      id,
    })
      .then((response) => {
        console.log("Status updated:", response.data);
        fetchOrders(); // Refetch orders after updating status
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user.username}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>{order.status}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(e, order._id)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
