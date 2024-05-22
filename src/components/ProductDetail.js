import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../utils/api";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const fetchedProduct = await fetchProductById(productId);
        setProduct(fetchedProduct);
        setSelectedImage(fetchedProduct.images[0]); // Set the first image as default
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    getProduct();
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 h-screen flex justify-center items-center">
      <div className="flex flex-col md:flex-row">
        <div
          className="md:w-1/6 mb-4 md:mb-0 flex justify-center items-center bg-black rounded overflow-hidden"
          style={{ maxHeight: "400px" }}
        >
          <div className="flex flex-col items-center overflow-y-auto" style={{ maxHeight: "400px" }}>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Image ${index}`}
                className="w-full h-auto cursor-pointer rounded border mb-2"
                style={{ backgroundColor: "black" }}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="md:w-1/2 pl-4 mb-4 md:mb-0">
          <div className="mb-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-auto object-cover rounded"
            />
          </div>
        </div>
        <div className="md:w-1/3 pl-4">
          <h1 className="text-4xl text-white font-bold mb-2">{product.name}</h1>
          <br></br>
          <h2 className="text-3xl text-red-500 mb-4 font-semibold">₹{product.price}</h2>
          <br></br>
          <br></br>
          <div className="bg-[#27272A] p-4 rounded shadow-md">
            <h3 className="text-lg text-[#E7E5E4] font-semibold mb-2">
              Key Features
            </h3>
            <ul>
              {product.features
                .slice(0, showMore ? product.features.length : 3)
                .map((feature, index) => (
                  <li key={index} className="text-[#E7E5E4]">
                    {feature}
                  </li>
                ))}
            </ul>
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-teal-500 mt-2 hover:underline"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
