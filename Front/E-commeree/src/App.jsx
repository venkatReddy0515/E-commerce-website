import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route}from "react-router-dom";
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import Home from "./Components/Main/Home"
import Admin from "./Components/Admin/Admin"
import Footer from "./Components/Main/Footer"
import Login from './Components/UserSection/Login';
import ProductPage from './Components/Main/ProductPage';
import CartSection from './Components/CardSection/CartSection';
import LikeSection from "./Components/CardSection/LikeSection"
import Categories from './Components/CategeriosSection/Categories';
import About from './Components/UserSection/About';
import ResetPassword from './Components/UserSection/ResetPassword';
import PaySection from './Components/CardSection/PaySection';
import Orders from './Components/UserSection/Orders';
import User from './Components/UserSection/User';
function App() {
  
  return(
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/product/:id' element={<ProductPage/>}/>
          <Route path="/sign-in" element={<Login/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/cart' element={<CartSection/>}/>
          <Route path='/like' element={<LikeSection/>}/>
          <Route path='/collections' element={<Categories/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path='/place-order' element={<PaySection/>}/>
          <Route path='/my-orders' element={<Orders/>}/>
        
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App
