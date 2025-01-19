import React from 'react';
import { Link } from 'react-router-dom';
import "./../App.css"
const Navbar = () => {
  return (

    <div>
        <div className="admin-panel">
          <h2 className="admin-logo">Mern Market
          </h2>
            <nav className="nav">
                <ul>
                  <li><Link to="/">Dashboard</Link></li>
                  <li><Link to="/add-product">Add Product</Link></li>
                  <li><Link to="/products">Products</Link></li>
                  <li><Link to="/orders">Orders</Link></li>
                </ul>
          </nav>
        </div>
    </div>
    
  );
};

export default Navbar;
