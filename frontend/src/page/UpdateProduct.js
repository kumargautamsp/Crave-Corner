import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";

const UpdateProduct = () => {
  const { productId } = useParams();
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/product/${productId}`
        );
       

        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const contentType = response.headers.get("content-type");
        console.log("Content-Type:", contentType);
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const productData = await response.json();
          setData(productData); // Update state with fetched product data
        } else {
          const responseText = await response.text();
          console.error("Invalid response format:", responseText);
          throw new Error("Invalid response format: not JSON");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Failed to fetch product details");
      }
    };
    

    fetchProductDetails();
  }, [productId]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadImage = async (e) => {
    const imageData = await ImagetoBase64(e.target.files[0]);
    setData((prev) => ({
      ...prev,
      image: imageData,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, image, category, price, description } = data;
      if (name && category && price) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("description", description);
        if (image) {
          formData.append("image", image);
        }

        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/product/${productId}`,
          {
            method: "PUT",
            body: formData,
          }
        );
        const fetchRes = await fetchData.json();
        toast.success(fetchRes.message);
      } else {
        toast.error("Enter required fields");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="p-4">
      <p className="text-3xl text-center font-bold">Update Product Page</p>
      <form
        className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white"
        onSubmit={handleSubmit}
      >
        {/* Form inputs */}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={data.name}
        />

        {/* Other form inputs */}
        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="category"
          name="category"
          onChange={handleOnChange}
          value={data.category}
        >
          <option value={"other"}>Select category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetable"}>Vegetable</option>
          {/* Add other options as needed */}
        </select>

        <label htmlFor="image">
          Image
          <div className="h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className="h-full" alt="Product" />
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}

            <input
              type={"file"}
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>

        <label htmlFor="price" className="my-1">
          Price
        </label>
        <input
          type={"text"}
          className="bg-slate-200 p-1 my-1"
          name="price"
          onChange={handleOnChange}
          value={data.price}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={2}
          value={data.description}
          className="bg-slate-200 p-1 my-1 resize-none"
          name="description"
          onChange={handleOnChange}
        ></textarea>

        <button className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow">
          Save
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
