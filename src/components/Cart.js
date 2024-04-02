// Cart.js
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const items = useSelector((state) => state.cart);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const total = items.reduce((a, b) => a + parseFloat(b.price), 0);
  const handleBuyNow = () => {
    const orderData = {
      productCode: items[0].id.toString(),
      orderId:
        items[0].id.toString() +
        items[0].quantity.toString() +
        items[0].price.toString(),
      cuttingType: items[0].cuttingType,
      pieceSize: items[0].PieceSize,
      totalPrice: total.toFixed(2).toString(),
      totalQty: items.length.toString(),
    };

    fetch("https://finnobackend.onrender.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        if (response.ok) {
          setIsOrderPlaced(true);
        } else {
          throw new Error("Failed to place order");
        }
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  };

  return (
    <div>
      {isOrderPlaced ? (
        <div className="text-4xl m-4 p-4 justify-center items-center flex h-[100vh]">
          Order placed successfully!
        </div>
      ) : (
        <>
          <div className="text-4xl m-4 p-4 justify-center items-center flex h-[100vh]">
            <div
              className="p-4 rounded-lg border-2 border-[#1b384f] cursor-pointer"
              onClick={handleBuyNow}
            >
              Buy Now
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
