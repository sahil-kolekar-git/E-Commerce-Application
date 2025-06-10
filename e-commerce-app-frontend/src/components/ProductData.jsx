import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchImage } from "../features/productSlice";

const ProductData = () => {
  let dispatch = useDispatch();
  let { data, imageURL } = useSelector((state) => state.product);
  let { id } = useParams();

  useEffect(() => {
    dispatch(fetchImage(id));
  }, []);

  let singleProduct = data.filter((product) => {
    return product.id == id;
  });

  let obj = singleProduct[0];
  let { name, description, quantity, price } = obj;

  return (
    <>
      <h2>{id}</h2>
      <h2>{name}</h2>
      <h2>{description}</h2>
      <h2>{quantity}</h2>
      <h2>{price}</h2>
      <div>
        <img src={imageURL && imageURL} alt={name} />
      </div>
    </>
  );
};

export default ProductData;
