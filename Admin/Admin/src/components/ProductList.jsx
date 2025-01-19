import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import "./../App.css"
import { set } from 'mongoose';
const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    
    getProduct();
  },[]);
  const getProduct=()=>{
    Axios.get("http://localhost:5000/api/product")
    .then((response)=>{
      console.log(response.data.product)
      setProducts(response.data.product)
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  const deleteBy =(id)=>{
    Axios.post(`http://localhost:5000/api/product/remove/${id}`)
    .then((response)=>{
      getProduct();
      console.log(response.data.product)
    
    })
    .catch((error)=>{
      console.log(error);
    })
    console.log("hyy")
  }

  return (
    <div>
      <h2 className="list">Product List</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td><img src={product.image} alt="" /></td>
              <td>{product.name}</td>
              <td>{product.price} $</td>
              <td>{product.category}</td>
              <td><button onClick={()=>deleteBy(product._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
