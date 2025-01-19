import { useContext } from "react"
import { ShopContext } from "./ProductSection";
import { useState,useEffect } from "react";
import Tittle from "./Tittle";
import ProductsById from "./ProductsById";

function LatestCollection(){
    const {products}=useContext(ShopContext);
    console.log(useContext(ShopContext))
    const [latestProducts,setLatestProducts]=useState([]);
    useEffect(()=>{
        setLatestProducts(products.slice(11,23));
    },[products])
    return(
        <div>
            <Tittle tittle1={"LATEST"} tittle2={"COLLECTION"}/>
            <div className="product-routing">
                {
                    latestProducts.map(product=>(
                        <ProductsById name={product.name} image={product.image} price={product.price} rating={product.rating} id={product._id} key={product._id}/>
                    ))
                }
            </div>
            
        </div>
    )
}
export default LatestCollection