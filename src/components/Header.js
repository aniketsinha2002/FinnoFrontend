import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const items = useSelector((state) => state.cart);
  // Calculate total price by summing up prices of all items in the cart
  const total = items.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="flex justify-between bg-[#93CBF6] shadow-lg gap-x-10">
      <div className=" sm:ml-40 sm:w-[120px] w-[80px] ml-5 sm:mt-2 py-4 ">
        <img
          className=""
          src="https://res.cloudinary.com/dqbxgjov1/image/upload/v1701746742/without_bg_white_text-cropped_ykiihu.svg"
          alt=""
        />
      </div>
      <div className="flex mt-2 -mr-20">
        {/* Display total price
        <p className="m-2 px-4 py-8 font-bold text-green-600 font-mono text-xl">
          CART VALUE: $ {total.toFixed(2)}
        </p> */}
        <Link to="/cart" className="sm:py-4 py-2">
          <div className="rounded-md sm:m-2 flex row ">
            <svg
              className="filter invert sm:w-10 w-8"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="ShoppingBagIcon"
            >
              <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 4c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2zm2-6c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm4 6c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2z"></path>
            </svg>
            <div className="mr-40 text-sm text-white ">
              <div className="bg-green-700 rounded-full w-6 px-2 font-semibold">
                {items.length}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
