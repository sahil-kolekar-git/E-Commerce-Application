import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { upLoadProduct } from "../features/productSlice";

const AddProduct = () => {
  let dispatch = useDispatch();
  let [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
  });

  let [imageFile, setImageFile] = useState(null);

  let { description, name, price, quantity } = product;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );
    formData.append("imageFile", imageFile);

    dispatch(upLoadProduct(formData));
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImageFile(e.target.files[0]);
  };
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            value={name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            rows="3"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            value={description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            value={quantity}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price ($)</label>
          <input
            type="number"
            name="price"
            step="0.01"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            value={price}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Product Image</label>
          <input
            type="file"
            name="imageFile"
            className="w-full border rounded px-3 py-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={handleImage}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
