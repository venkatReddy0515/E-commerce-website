import React, { useState } from 'react';
import axios from 'axios';
import "./product.css";

const AddProduct = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [cat, setCat] = useState('');
  const [subCat, setSubCat] = useState('');
  const [des, setDes] = useState('');
  const [rating, setRating] = useState(0);
  const [material, setMaterial] = useState('');
  const [sizes, setSizes] = useState('');
  const [brand, setBrand] = useState('');
  const [bestseller, setBestseller] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name,
      image,
      price,
      category: cat,
      subcategory: subCat,
      description: des,
      rating,
      material,
      sizes: sizes.split(',').map(size => size.trim()),
      brand,
      bestseller
    };

    try {
      const response = await axios.post('http://localhost:5000/api/product/add-product', productData);
      console.log('Product added successfully:', response.data);
      alert('Product added successfully!');
      setName('');
      setImage('');
      setPrice(0);
      setCat('');
      setSubCat('');
      setDes('');
      setRating(0);
      setMaterial('');
      setSizes('');
      setBrand('');
      setBestseller(false);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="admin">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        />
        <input
          type="text"
          name="subcategory"
          placeholder="Subcategory"
          value={subCat}
          onChange={(e) => setSubCat(e.target.value)}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={des}
          onChange={(e) => setDes(e.target.value)}
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <input
          type="text"
          name="material"
          placeholder="Material"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        />
        <input
          type="text"
          name="sizes"
          placeholder="Sizes (comma separated)"
          value={sizes}
          onChange={(e) => setSizes(e.target.value)}
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <label>
          Bestseller:
          <input
            type="checkbox"
            name="bestseller"
            checked={bestseller}
            onChange={(e) => setBestseller(e.target.checked)}
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
