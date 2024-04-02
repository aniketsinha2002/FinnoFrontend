import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateItem } from "../redux/slices/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Fish = () => {
  const [showMore, setShowMore] = useState(false);

  const [fishData, setFishData] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedCuttingType, setSelectedCuttingType] = useState(""); // State for selected cutting type
  const [selectedPieceSize, setSelectedPieceSize] = useState(""); // State for selected piece size
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart);

  useEffect(() => {
    fetch("https://finnobackend.onrender.com/api/fish")
      .then((response) => response.json())
      .then((data) => {
        setFishData(data);
        const priceNumeric = parseFloat(
          data[0]?.price.replace(/[^0-9.-]+/g, "")
        );
        setTotalPrice(priceNumeric * selectedQuantity);
      })
      .catch((error) => console.error("Error fetching fish data:", error));
  }, [selectedQuantity]);

  const handleIncrement = () => {
    setSelectedQuantity(selectedQuantity + 1);
  };

  const handleDecrement = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  const toggleCuttingType = (cuttingType) => {
    if (selectedCuttingType === cuttingType) {
      setSelectedCuttingType("");
    } else {
      setSelectedCuttingType(cuttingType);
      setErrorMessage("");
    }
  };

  const addToCart = () => {
    if (!selectedCuttingType) {
      setErrorMessage("Please select a cutting type");
      return;
    }

    if (!selectedPieceSize) {
      setErrorMessage("Please select a piece type");
      return;
    }

    toast("Added to Cart!");

    const existingItem = items.find(
      (item) => item.id === fishData[0]?.order_id
    );

    if (existingItem) {
      if (existingItem.quantity !== selectedQuantity) {
        dispatch(
          updateItem({
            id: existingItem.id,
            quantity: selectedQuantity,
            price: totalPrice,
            cuttingType: selectedCuttingType,
            PieceSize: selectedPieceSize,
          })
        );
      }
    } else {
      dispatch(
        addItem({
          id: fishData[0]?.order_id,
          name: fishData[0]?.name,
          price: totalPrice,
          title: fishData[0]?.title,
          image: fishData[0]?.imageUrl,
          quantity: selectedQuantity,
          cuttingType: selectedCuttingType,
          PieceSize: selectedPieceSize,
        })
      );
    }
  };

  const handleClick = () => {
    addToCart();
  };

  return (
    <div className="boyal-fish-details">
      <div className="sm:m-10 sm:px-20 sm:py-10 m-2 px-2 shadow-lg border-2">
        <div className="">
          <div className="flex justify-center sm:-ml-20 text-[#475f7b] font-bold sm:py-10 sm:text-2xl mt-5">
            {fishData[0]?.title}
          </div>
          <div className="sm:flex sm:items-start justify-start truncate whitespace-break-spaces">
            <div className="sm:w-[400px] border-solid border-4 border-[#419ae1] rounded-lg relative sm:mt-20 mt-5">
              <img
                src="https://res.cloudinary.com/dqbxgjov1/image/upload/v1710354800/timoom2rt8qlasatvtyt.jpg"
                alt=""
                style={{ marginTop: "20px" }}
              />
            </div>
            <div className="sm:px-[50px] px-[10px] sm:w-4/5 w-[100%]">
              <div className="py-2">
                <div className="bg-[#51CF66] w-[140px] text-center text-white rounded-2xl px-1 text-sm font-semibold py-1 uppercase">
                  {fishData[0]?.name}
                </div>
              </div>
              <h4 className="font-bold text-xl">{fishData[0]?.price}</h4>
              <div className="flex text-xl py-2">
                <p className="">Quantity -</p>
                <p className="font-bold">1 Kg</p>
              </div>

              <div className="product-details">
                <div className="py-2">{fishData[0]?.description}</div>
                <div className="py-2 text-xl">
                  Product code - {fishData[0]?.order_id}
                </div>

                <div className="flex flex-row py-2 text-xl">
                  <div className="font-bold">Country Of Origin:</div>
                  <div className="px-2">{fishData[0]?.country}</div>
                </div>
              </div>

              {/* VIEW MOREEEEEEEEEEEEEEEEEEEEEEEEEEEE */}
              <div
                className="ml-20 mr-2 mt-5 mb-5 py-4 px-2 rounded-3xl bg-[#5EAAE5] text-white shadow-inner shadow-[#419ae1] cursor-pointer w-[100px] text-sm font-semibold"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "View More ^" : "View More v"}
              </div>

              {showMore && (
                <div className="">
                  <div className="nutritional-values">
                    <h3 className="font-bold py-2">Nutritional Values:</h3>
                    <p>{fishData[0]?.NutValues_des}</p>
                    <ul>
                      <li>Energy: {fishData[0]?.NutValues_energy}</li>
                      <li>Protein: {fishData[0]?.Protin}</li>
                      <li>Total Fat: {fishData[0]?.TotalFat}</li>
                      <li>Carbohydrates: {fishData[0]?.Carbohydrates}</li>
                    </ul>
                  </div>

                  <div className="return-refund-policy">
                    <h3 className="font-bold py-2">Return & Refund Policy</h3>
                    <p>{fishData[0]?.RefundPolicy}</p>
                  </div>
                </div>
              )}
              {/*VIEW MOREEEEEEEEEEE ENDDDDDDDDDDDDDDD*/}

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="size-selection">
                  <h3 className="font-bold py-2">Select Size</h3>
                  <select value="" onChange={(e) => e.preventDefault()}>
                    <option value="">1.5 kg</option>
                    <option value="">2.0 kg</option>
                    <option value="">2.5 kg</option>
                    <option value="">3.0 kg</option>
                  </select>
                </div>

                <div>
                  <div className="cutting-type-selection">
                    <h3 className="font-bold py-2">Cutting Type</h3>
                    <div
                      className={`mr-2 py-2 px-2 rounded-2xl border-2 border-[#419ae1] shadow-md shadow-slate-500 cursor-pointer w-[100px] text-center${
                        selectedCuttingType === "Gada Petti"
                          ? " bg-[#419ae1]"
                          : ""
                      }`}
                      onClick={() => toggleCuttingType("Gada Petti")}
                    >
                      Gada Petti
                    </div>
                  </div>

                  <div className="total-piece">
                    <h3 className="font-bold py-2">Piece Size</h3>
                    <div className="flex sm:flex-row flex-col gap-y-4">
                      <div
                        className={`mr-2 py-2 px-2 rounded-2xl border-2 border-[#419ae1] shadow-md shadow-slate-500 cursor-pointer w-[170px] text-center${
                          selectedPieceSize === "small" ? " bg-[#419ae1]" : ""
                        }`}
                        onClick={() => {
                          setSelectedPieceSize("small");
                          setErrorMessage("");
                        }}
                      >
                        Small (40 gm - 60)
                      </div>
                      <div
                        className={`mr-2 py-2 px-2 rounded-2xl border-2 border-[#419ae1] shadow-md shadow-slate-500 cursor-pointer w-[170px] text-center${
                          selectedPieceSize === "medium" ? " bg-[#419ae1]" : ""
                        }`}
                        onClick={() => {
                          setSelectedPieceSize("medium");
                          setErrorMessage("");
                        }}
                      >
                        Medium (40 gm - 60)
                      </div>
                      <div
                        className={`mr-2 py-2 px-2 rounded-2xl border-2 border-[#419ae1] shadow-md shadow-slate-500 cursor-pointer w-[170px] text-center${
                          selectedPieceSize === "large" ? " bg-[#419ae1]" : ""
                        }`}
                        onClick={() => {
                          setSelectedPieceSize("large");
                          setErrorMessage("");
                        }}
                      >
                        Large (40 gm - 60)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="total-price text-xl py-4">
                  <div className="flex flex-row">
                    <div>Total Payable: </div>
                    <div className="font-bold ml-3">₹{totalPrice}</div>
                  </div>
                </div>
                <div className="flex flex-row my-4">
                  <div className="text-xl mt-2">Quantity:</div>
                  <div className="flex flex-row items-center px-4">
                    <div
                      className="px-2 text-3xl cursor-pointer sm:mr-2 py-1 rounded-full border-2 border-[#419ae1] shadow-md shadow-slate-500"
                      onClick={handleIncrement}
                    >
                      +
                    </div>
                    <div className="sm:ml-6 sm:mr-6 px-2 font-bold text-xl">
                      {selectedQuantity}
                    </div>
                    <div
                      className="ml-2 px-2 text-3xl cursor-pointer mr-2 py-1 rounded-full border-2 border-[#419ae1] shadow-md shadow-slate-500"
                      onClick={handleDecrement}
                    >
                      -
                    </div>
                  </div>
                </div>
                <div className="ml-20">
                  <button
                    className="mr-2 py-2 px-2 rounded-3xl border-2 border-[#419ae1] cursor-pointer w-40 shadow-lg shadow-slate-300"
                    onClick={handleClick}
                  >
                    Add to Cart
                  </button>
                </div>

                <ToastContainer />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              </form>
            </div>
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <h3 className="font-bold text-2xl text-gray-700 underline">
            Why Buy from FinnoFarms?
          </h3>
        </div>
        <div className="mt-4 flex justify-between truncate text-wrap">
          <div className="">
            <div className="grid ">
              <div className="flex flex-col">
                <div className="font-bold">Sustainable & Hygienic Sourcing</div>
                <div className="flex sm:flex-row flex-col justify-between mt-10">
                  <div className="sm:w-[180px] w-[160px] px-2 ml-10">
                    <img
                      className=""
                      src="https://res.cloudinary.com/dqbxgjov1/image/upload/v1710616503/WhyFinnoFarmsLogo/Fishes/ice0uko44zforfjqhtbv.svg"
                      alt=""
                    />
                  </div>
                  <div className="sm:ml-20 sm:px-40 py-5 ">
                    {fishData[0]?.SHS}
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="font-bold">Sustainable & Hygienic Sourcing</div>
                <div className="flex sm:flex-row flex-col justify-between mt-10">
                  <div className="sm:w-[180px] w-[160px] px-2 ml-10">
                    <img
                      className=""
                      src="https://res.cloudinary.com/dqbxgjov1/image/upload/v1710616503/WhyFinnoFarmsLogo/Fishes/byyx05lasw3qtdgp6uhj.svg"
                      alt=""
                    />
                  </div>
                  <div className="sm:ml-20 sm:px-40 py-5">
                    {fishData[0]?.SHS}
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="font-bold">Sustainable & Hygienic Sourcing</div>
                <div className="flex sm:flex-row flex-col justify-between mt-10">
                  <div className="sm:w-[180px] w-[160px] px-2 ml-10">
                    <img
                      className=""
                      src="https://res.cloudinary.com/dqbxgjov1/image/upload/v1710616503/WhyFinnoFarmsLogo/Fishes/qi6ydaxxg88lf83vr1uf.svg"
                      alt=""
                    />
                  </div>
                  <div className="sm:ml-20 sm:px-40 py-5">
                    {fishData[0]?.SHS}
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="font-bold">Sustainable & Hygienic Sourcing</div>
                <div className="flex sm:flex-row flex-col justify-between mt-10">
                  <div className="sm:w-[180px] w-[160px] px-2 ml-10">
                    <img
                      className=""
                      src="https://res.cloudinary.com/dqbxgjov1/image/upload/v1710616505/WhyFinnoFarmsLogo/Fishes/elq5a8bfkebjmbnqxbkp.svg"
                      alt=""
                    />
                  </div>
                  <div className="sm:ml-20 sm:px-40 py-5">
                    {fishData[0]?.SHS}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="px-10 ml-5 grid gap-1">
            <p>{fishData[0]?.SHS}</p>
            <p>{fishData[0]?.PQA}</p>
            <p>{fishData[0]?.NHG}</p>
            <p>{fishData[0]?.TS}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Fish;
