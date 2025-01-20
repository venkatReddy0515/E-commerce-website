import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faBusinessTime, faPlusCircle, faList } from "@fortawesome/free-solid-svg-icons";
import "./../App.css";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-header">
        <h2 className="admin-logo">Mern Market</h2>
        <button className="menu-toggle-btn" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
        </button>
      </div>

      <div className={`admin-panel ${isMenuOpen ? "open" : "closed"}`}>
        <button className="goback">
          <Link to="https://mernmarket.onrender.com/">Go to Website</Link>
        </button>
        <nav className="nav">
          <ul>
            <li
              className={active === "board" ? "c" : ""}
              onClick={() => setActive("board")}
            >
              <Link to="/">
                <FontAwesomeIcon icon={faBusinessTime} /> Dashboard
              </Link>
            </li>
            <li
              className={active === "add" ? "c" : ""}
              onClick={() => setActive("add")}
            >
              <Link to="/add-product">
                <FontAwesomeIcon icon={faPlusCircle} /> Add Product
              </Link>
            </li>
            <li
              className={active === "product" ? "c" : ""}
              onClick={() => setActive("product")}
            >
              <Link to="/products">
                <FontAwesomeIcon icon={faList} /> Products
              </Link>
            </li>
            <li
              className={active === "order" ? "c" : ""}
              onClick={() => setActive("order")}
            >
              <Link to="/orders">
                <FontAwesomeIcon icon={faList} /> Orders
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
