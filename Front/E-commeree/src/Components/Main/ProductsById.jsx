import {Link} from "react-router-dom";
import "./Product.css"
function ProductsById({name,image,price,rating,id}) {
    return (
        <div>
            <div className="product-latest">
                <Link to={`/product/${id}`}>
                        <div className="product">
                            <div className="product-info">
                                <img src={image} alt="" />
                                <h4>{name}</h4>
                                <h2>{price}</h2>
                            </div>
                        </div>
                </Link>
            </div>
        </div>
    );
}

export default ProductsById;