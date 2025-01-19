import { Link } from "react-router-dom"
import "./Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart,faCartShopping,faBars,faXmark,faSearch,faUser,} from '@fortawesome/free-solid-svg-icons';
import { useEffect,useState,useRef, useContext} from "react";
import {gsap}from "gsap"
import { ShopContext } from "../Main/ProductSection";
import { useNavigate } from "react-router-dom";
function Navbar(){
    const {cartSize,setSearch,searchActive}=useContext(ShopContext)
    const [active,setActive]=useState('');
    const naviage=useNavigate();
    const meNu=useRef();
    
    const handleMenu=()=>{
            meNu.current.style.left="180px"
            console.log(meNu);
        
    }
    const handleClose=()=>{
        meNu.current.style.left="-190px";
    }
    const handleSearch=()=>{
        setSearch();
    }
    const handleLogout=()=>{
        naviage("/sign-in");
    }

    return(
        <div>
            <div className="nav-section">
                <div className="logo">
                    <h1><span>M</span>ernMarket</h1>
                </div>
                <div className="nav-bar">
                    <ul ref={meNu}>
                        <FontAwesomeIcon icon={faXmark} className="close" onClick={handleClose}/>
                        <li className={active===''?"border":""} onClick={()=>setActive('')}><Link to="/">Home</Link></li>
                        <li className={active==='collections'?"border":""} onClick={()=>setActive('collections')}><Link to="/collections">Collections</Link></li>
                        <li className={active==='sign-in'?"border":""} onClick={()=>setActive('sign-in')}><Link to="/sign-in">Sign in</Link></li>
                        <li className={active==='about'?"border":""} onClick={()=>setActive('about')}><Link to="/about">About</Link></li>
                        <li className={active==='admin'?"border":""} onClick={()=>setActive('admin')}><Link to="/admin">Admin</Link></li>
                    </ul>
                    <div className="cart-section"  >
                    <div className="search">
                        <Link to="/collections" className={active===`collections search=-theme`?"border":""} onClick={()=> {setActive('collections'),handleSearch()}}><FontAwesomeIcon icon={faSearch} className="icon"/></Link>
                    </div>
                    
                    <div className="cart-icon-container">
                        <span className="cart-count">{cartSize}</span>
                        <Link to='/cart'><FontAwesomeIcon icon={faCartShopping} /></Link>
                    </div>
                    <div className="user-details">
                        <FontAwesomeIcon icon={faUser} className="user-logo"/>
                        <div className="user-de">
                            <Link to="/my-orders"><h6>Order's</h6></Link>
                            <h6>Source Code</h6>
                            <h6 onClick={handleLogout}>Logout</h6>
                        </div>
                    </div>
                    
                    <FontAwesomeIcon icon={faBars} className="menu" onClick={handleMenu}/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default Navbar