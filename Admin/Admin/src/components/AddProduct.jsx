import React, { useState } from 'react';
import axios from 'axios';
import "./product.css"
const AddProduct = () => {
  const [name,setName]=useState('');
  const [image,setImage]=useState('')
  const [price,setPrice]=useState(0);
  const [cat,setCat]=useState('');
  const [subCat,setSubCat]=useState('');
  const [des,setDes]=useState('');
  const [rating,setRating]=useS

  return (
    <div>
      <h2>Add Product</h2>
      <form>
        <input type="text" name="name" placeholder="Name"  />
        <input type="text" name="image" placeholder="Image URL"/>
        <input type="number" name="price" placeholder="Price"  />
        <input type="text" name="category" placeholder="Category"  />
        <input type="text" name="subcategory" placeholder="Subcategory"  />
        <textarea name="description" placeholder="Description"  />
        <input type="number" name="rating" placeholder="Rating" />
        <input type="text" name="material" placeholder="Material" />
        <input type="text" name="sizes" placeholder="Sizes (comma separated)"/>
        <input type="text" name="brand" placeholder="Brand" />
        <label>
          Bestseller:
          <input type="checkbox" name="bestseller" />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
