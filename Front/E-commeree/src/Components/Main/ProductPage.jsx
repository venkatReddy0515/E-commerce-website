import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "./ProductSection";
import { Link } from "react-router-dom";
import "./Product.css";
import Message from "./../../Message"
import Axios from "axios";
function ProductPage() {
  const { id } = useParams();
  const { products, addCart ,} = useContext(ShopContext);
  const [message,setMessage]=useState('');
  const [success,setSuccess]=useState(null);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const setProductData = () => {
    const foundProduct = products.find((item) => String(item._id) === id);
    setProduct(foundProduct || null);
  };

  useEffect(() => {
    setProductData();
  }, [id, products]);

  const handleImageSwap = (subImage, index) => {
    if (!product) return;
    const updatedSubimages = [...product.subimages];
    const mainImage = product.image;

    updatedSubimages[index] = mainImage;

    setProduct({
      ...product,
      image: subImage,
      subimages: updatedSubimages,
    });
  };

  const handleCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to the cart!");
      return;
    }
    addCart({ ...product, selectedSize });
    console.log(product, "is added with size", selectedSize);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const addToCart=()=>{
    const token=localStorage.getItem("token");
    Axios.post("http://localhost:5000/api/cart/add",{productId:id,quantity:1,size:selectedSize,price:product.price},
    {
      headers:{Authorization:`Bearer ${token}`}
    }
    )
    .then((response)=>{
      console.log(response.data);
      setSuccess(true);
      setMessage("item added to cart");
      addCart();
    })
    .catch((error)=>{
      console.log(error);
      setSuccess(false);
      setMessage("please login to add");
    })


  }

  if (!product) return <div></div>;

  return (
    <div className="product-container">
      <div className="product-images">
        {message && <Message success={success} message={message}/>}
        {product.subimages?.length > 0 && (
          <div className="subimages">
            {product.subimages.map((subImage, index) => (
              <img
                key={index}
                src={subImage}
                alt={`Subimage ${index + 1}`}
                onClick={() => handleImageSwap(subImage, index)}
                className="subimage"
              />
            ))}
          </div>
        )}
        <div className="main-image">
          <img src={product.image} alt="Main" />
        </div>
      </div>

      <div className="product-details">
        <h1>{product.name}</h1>
        {product.bestSeller && <span className="bestseller">Best Seller</span>}
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <p>
          <strong>Category:</strong> {product.category} - {product.subcategory}
        </p>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <p>
          <strong>Rating:</strong> {product.rating} / 5
        </p>
        <div>
          <strong>Material:</strong> {product.info?.material || "N/A"}
        </div>
        <div>
          <strong>Sizes:</strong> {product.info?.sizes?.join(", ") || "N/A"}
        </div>
        <div>
          <strong>Brand:</strong> {product.info?.brand || "N/A"}
        </div>
        <div className="size-selection">
          <label htmlFor="size-select"><strong>Select Size:</strong></label>
          <select
            id="size-select"
            value={selectedSize}
            onChange={handleSizeChange}
          >
            <option value="">--Select a Size--</option>
            {product.info?.sizes?.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="product-actions">
          <button className="add-to-cart-button" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
