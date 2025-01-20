import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Order.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    Axios.get("https://e-commerce-website-zt25.onrender.com/api/product")
      .then((response) => {
        setProducts(response.data.product);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const deleteBy = (id) => {
    Axios.post(`https://e-commerce-website-zt25.onrender.com/api/product/remove/${id}`)
      .then((response) => {
        console.log("Product deleted:", response.data.product);
        getProduct(); // Refresh the product list after deletion
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
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
              <td>
                <img src={product.image} alt={product.name} />
              </td>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.category}</td>
              <td>
                <button
                  onClick={() => deleteBy(product._id)}
                  className="delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
