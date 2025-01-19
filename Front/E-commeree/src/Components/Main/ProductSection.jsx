import { createContext, useContext, useState, useEffect } from "react";
// import products from "./../../assets/Products";
import Axios from "axios"
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [cart, setCart] = useState([]);
  const [products,setProducts]=useState([]);
  const [price,setPrice]=useState(null)
  const [searchActive,setSearchActive]=useState(false);
  useEffect(()=>{
    console.log("api is calling")
    productsData();
    add();
  },[])


  const addCart = (product) => {
    add();
  };

  const deleteCart = (product) => {
    setCart((prev) => prev.filter((item) => item.id !== product.id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const setSearch=()=>{
    setSearchActive(!searchActive);
    console.log(searchActive);
  }
  const productsData=async ()=>{
    Axios.get("http://localhost:5000/api/product")
    .then((response)=>{
      console.log(response.data);
      setProducts(response.data.product)
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  const add=()=>{
    const token=localStorage.getItem("token");
    Axios.get("http://localhost:5000/api/cart",{headers:{Authorization:`Bearer ${token}`}})
    .then((response)=>{
      setCart(response.data.cartItems.items);
      setPrice(response.data.cartItems.totalPrice);
      console.log(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  const cartSize=cart?cart.length:0;
  const currency = "$";
    const value = {
    currency,
    addCart,
    deleteCart,
    clearCart,
    cartSize,
    cart,
    products,
    price,
    add,
    setSearch,
    searchActive
  };
  



  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
