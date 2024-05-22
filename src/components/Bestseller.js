import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProductsByCategory } from "../utils/api.js";

const Bestseller = () => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchBestsellers = async () => {
      const fetchedProducts = await fetchProductsByCategory("best seller");
      setProducts(fetchedProducts);
    };

    fetchBestsellers();
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };

  return (
    <div className="my-8 text-left bg-[#171717] px-4 py-2">
      <h2 className="text-3xl text-white font-bold mb-4">Bestsellers</h2>
      <div className="relative">
        <button
          onClick={handlePrevSlide}
          disabled={currentSlide === 0}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full ${
            currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{ marginLeft: "10px" }}
        >
          &lt;
        </button>
        <div className="flex overflow-x-auto space-x-4 justify-center">
          {products
            .slice(currentSlide * 5, (currentSlide + 1) * 5)
            .map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="flex-shrink-0 w-60 bg-[#27272A] p-4 rounded-lg shadow-md relative"
              >
                <img
                  src={product.displayImage}
                  alt={product.name}
                  className="w-full h-32 object-contain mb-2 rounded"
                />
                <h3 className="text-lg text-[#F5F5F4] font-semibold">
                  {product.name}
                </h3>
                <br />
                <br />
                <p className="text-lg text-[#E7E5E4] absolute bottom-4 left-4"> {/* Increased font size */}
                  ₹{product.price}
                </p>
              </Link>
            ))}
        </div>
        <button
          onClick={handleNextSlide}
          disabled={(currentSlide + 1) * 5 >= products.length}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full ${
            (currentSlide + 1) * 5 >= products.length
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          style={{ marginRight: "10px" }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Bestseller;
