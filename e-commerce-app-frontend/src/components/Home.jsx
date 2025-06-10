import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchImage,
  fetchProduct,
} from "../features/productSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  let { data, isLoading, imageUrl } = useSelector((state) => state.product);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  }, []);

  useEffect(() => {
    data.map((product) => {
      {
        product.id && dispatch(fetchImage(product.id));
      }
    });
  }, [data]);

  if (isLoading) {
    return <p>Loading... wait for some time</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((product) => {
          let img = imageUrl[product.id];

          return (
            <div
              key={product.id}
              className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                className="w-full h-48 object-contain object-center"
                src={img}
                alt={product.name}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-green-600 font-bold text-lg">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center gap-1.5">
                    Qty:
                    {product.quantity ? (
                      <p className=" p-1.5  rounded-[5px]">
                        {product.quantity}
                      </p>
                    ) : (
                      <p className="bg-red-600 p-1.5  rounded-[5px] text-white">
                        Out of stock
                      </p>
                    )}
                  </span>
                </div>
              </div>
              <div className="flex justify-between p-3 items-center">
                <div>
                  <span>Add to Cart</span>
                </div>
                <div className="flex gap-2">
                  <button className="hover:cursor-pointer">Update</button>
                  <button
                    className="hover:cursor-pointer"
                    onClick={() => {
                      console.log(product.id);

                      dispatch(deleteProduct(product.id));
                      navigate("/");
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
