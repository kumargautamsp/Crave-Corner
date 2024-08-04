import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addCartItem, deleteProduct } from "../redux/productSlide"; // Assuming you have a deleteProduct action defined in your Redux slice

const CardFeature = ({ image, name, price, category, loading, id }) => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.email); // Assuming you have user email stored in state

  const handleAddCartProduct = () => {
    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
      })
    );
  };

  const isAdmin = userEmail === process.env.REACT_APP_ADMIN_EMAIL;

  // const handleUpdateProduct = () => {
  //   // Redirect to update page or perform update action
  //   console.log("Redirecting to update page or performing update action for product:", id);
  //   // Example: Redirecting to update page
  //   // history.push(`/update/${id}`);
  // };

  const handleDeleteProduct = () => {
    // Logic to delete the product
    console.log("Deleting the product:", id);
    fetch(`http://localhost:8000/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Add any required authentication headers if needed
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Product deleted successfully");
          // Dispatch action to update Redux store with deleted product ID
          dispatch(deleteProduct(id)); // Assuming deleteProduct action creator takes product ID as argument
        } else {
          console.error("Failed to delete product");
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col">
      {image ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="h-28 flex flex-col justify-center items-center">
              <img src={image} className="h-full" alt={name} />
            </div>
            <h3 className="font-semibold text-slate-600 capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
              {name}
            </h3>
            <p className="text-slate-500 font-medium">{category}</p>
            <p className="font-bold">
              <span className="text-red-500">₹</span>
              <span>{price}</span>
            </p>
          </Link>
          <button
            className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full"
            onClick={handleAddCartProduct}
          >
            Add to Cart
          </button>
          {isAdmin && (
            <div className="py-1 mt-2 flex gap-4">
              <Link
                to={`/updateProduct/${id}`}
                className="bg-blue-500 py-1 px-2 rounded text-center hover:bg-blue-600 flex-1 text-white"
              >
                Update
              </Link>
              <button
                className="bg-red-500 py-1 px-2 rounded hover:bg-red-600 flex-1 text-white"
                onClick={handleDeleteProduct}
              >
                Delete
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;
