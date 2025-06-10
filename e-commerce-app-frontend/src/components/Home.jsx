import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImage, fetchProduct } from "../features/productSlice";

const Home = () => {
  let { data, isLoading } = useSelector((state) => state.product);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
  }, []);

  if (isLoading) {
    return <p>Loading... wait for some time</p>;
  }
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((product) => {
          dispatch(fetchImage(product.id));
          let { imageUrl } = useSelector((state) => state.product);
          let imageUrl1 =
            "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/jioretailer/products/pictures/item/free/original/eYeIBBxuzX-bpl-32-hd-television-492166140-i-1-1200wx1200h.jpeg";

          return (
            <div
              key={product.id}
              className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                className="w-full h-48 object-cover"
                src={imageUrl}
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
                  <span className="text-sm text-gray-500">
                    Qty: {product.quantity}
                  </span>
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
