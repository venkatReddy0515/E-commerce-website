import { useContext, useEffect, useState } from "react";
import { ShopContext } from "./ProductSection";
import ProductsById from "./ProductsById";
import Tittle from "./Tittle";

function BestSeller() {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        console.log("Products:", products);
        
        const filteredBestsellers = products.filter(product => product.bestseller===true);
        console.log("Filtered Bestsellers:", filteredBestsellers); // Log filtered bestsellers

        setBestSeller(filteredBestsellers);
    }, [products]);

    return (
        <>
            <div>
                <Tittle tittle1={"BEST"} tittle2={"SELLER"} />
                <div className="product-routing">
                    {
                        bestSeller.map(product => (
                            <ProductsById
                                name={product.name}
                                image={product.image}
                                price={product.price}
                                rating={product.rating}
                                id={product._id}
                                key={product._id}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default BestSeller;
