import { useContext } from "react";
import { ShopContext } from "../Main/ProductSection";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./cart.css"
function LikeSection() {
  const {like,removeLike} = useContext(ShopContext);
  if (!like || like.length === 0) {
    return <div className="no">No liked products yet.</div>;
  }
  const handleRemove=(product)=>{
    
    removeLike(product);
  }

  return (
    <div className="like-section">
      <h1>Your Liked Products</h1>
      <div className="liked-products">
        {like.map((product) => (
          <div key={product.id} className="liked-product">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <FontAwesomeIcon icon={faXmark} className="remove" onClick={()=>handleRemove(product)}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LikeSection;
