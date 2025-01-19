import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import "./../App.css"
function Orders () {
  const [orders, setOrders] = useState([]);
  const [orderId,setOrderId]=useState('');

  useEffect(()=>{
    update();
  },[orderId])

  const update=()=>{
    Axios.get("http://localhost:5000/api/place-order/order-list")
    .then((response)=>{
      console.log(response.data.order);
      setOrders(response.data.order);
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  const handleStatus=(e,id)=>{
    const {value}=e.target;
    setOrderId(value);
    console.log(value,id);
    Axios.post("http://localhost:5000/api/place-order/status",{status:value,id})
    .then((response)=>{
      console.log(response.data);
      update();
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  return (
    <div>
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
              <td>{order.totalPrice}</td>
              <td>{order.status}</td>
              <td>
                <select name="update status" id="" onChange={(e)=>handleStatus(e,order._id)}>
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
};

export default Orders;
