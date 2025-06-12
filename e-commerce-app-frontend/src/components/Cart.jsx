import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuantity, removeQuantity } from "../features/productSlice";

const Cart = () => {
  let { cartData, imageUrl } = useSelector((state) => state.product);
  let dispatch = useDispatch();
  return (
    <div className="mt-10">
      {cartData.map((product) => {
        return (
          <div
            key={product.id}
            className="flex bg-white shadow-md rounded-lg overflow-hidden mb-4 w-full max-w-3xl mx-auto"
          >
            <img
              src={imageUrl[product.id] || "/placeholder.jpg"}
              alt={product.name}
              className="w-32 h-32 object-contain p-2"
            />
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-600 mt-1">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-semibold">
                    {product.quantity < 0 ? 0 : product.quantity}
                  </span>
                </p>
              </div>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => dispatch(addQuantity(product.id))}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  + Add
                </button>
                <button
                  onClick={() => dispatch(removeQuantity(product.id))}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  disabled={product.quantity == 0}
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
