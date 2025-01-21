import { useState } from "react";
import Axios from "axios";
import "./Admin.css"
import {Link, useNavigate}from "react-router-dom"
function Admin(){
    const navigate=useNavigate();
    const [email,setEmail]=useState('venkatAdmin@gmail.com');
    const [password,setPassword]=useState('Admin1234');
    const [admin,setAdmin]=useState('');
    
    return(
        <>
        <div className="DIV">
                    <h4>Admin Panel</h4>   
                                    <div className="form">
                                        <input type="email" name="email" id="email" className="email" value={email} placeholder="Enter email address" required/>
                                        <input type="password" name="password" id="password" className="password" value={password}  placeholder="Enter password" required/>

                                    </div>
                                    
                                    <button className="submit"><Link to="https://mernmarketadmin.onrender.com/">Login</Link></button>
        </div>
        </>
    )
}
export default Admin
