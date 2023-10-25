import React, { useEffect, useState } from "react";
import {  AiOutlinePlus } from "react-icons/ai";
import MetaData from "../layout/MetaData.jsx";
import Sidebar from "./Sidebar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { clearAdminErrors, newProductFail, newProductReset } from "../../redux/admin/AdminSlice.js";
import { toast } from "react-toastify";
import { createProduct } from "../../redux/admin/AdminAsyncActions.js";

function ProductContent() {

  const dispatch = useDispatch();

  const {error, newProduct, loading } = useSelector((state) => state.admin);


  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
    discount: ""
  });

  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({...productData, [name]: value})
  };

  const handleImageUpload = (e) => {

    const files = Array.from(e.target.files);

    setImages([]);
    setImagePreview([]);

    if(files){
      files.forEach((file) => {

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = (event) => {
          setImages(prevImage => [...prevImage, reader.result]);
          setImagePreview(prevImage => [...prevImage, reader.result]);
        }
      })
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // create a formdata for product
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("stock", productData.stock);
    formData.append("category", productData.category);

    // Append each image file to the FormData object
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      dispatch(clearAdminErrors());
      dispatch(createProduct(formData));
    } catch (error) {
      toast.error(error);
      dispatch(newProductFail());
    }
  };

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearAdminErrors());
    }

    if(newProduct && newProduct.success){
       toast.success('Product created successfuly!');
       dispatch(newProductReset());
    }
  }, [error,dispatch, newProduct]);

    const categories = [
      "Smartphones",
      "Computers",
      "Games",
      "Shoes",
      "Clothing",
      "Accessories",
      "Home Decor",
      "Luxury Beauty",
      "Kitchen",
    ];


  return (
    <>
      <MetaData title={`Add Product - Admin`} />

      <div className="max-w-[1240px] m-8 mx-auto flex flex-col lg:flex-row">
        <Sidebar />
        <div className="bg-gray-100 p-4 rounded-md shadow-md lg:w-[calc(1240px-256px)]">
          <h1 className="text-2xl font-semibold mb-4">Create New Product</h1>
          <form
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label htmlFor="name" className="text-gray-600 block mb-2">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="text-gray-600 block mb-2">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="text-gray-600 block mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="stock" className="text-gray-600 block mb-2">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={productData.stock}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="discount" className="text-gray-600 block mb-2">
                Discount
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={productData.discount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="text-gray-600 block mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-gray-600 block mb-2">Upload Images</label>
              <label htmlFor="image-upload" className="w-full cursor-pointer">
                <div className="flex items-center justify-center border border-dashed border-gray-300 rounded-md p-4">
                  <AiOutlinePlus className="text-4xl text-gray-400" />
                  <p className="text-gray-400 mt-2">Upload Images</p>
                </div>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <div className="mt-4 flex items-center gap-4">
                {imagePreview.map((file, index) => (
                  <div key={index} className="mb-2">
                    <img
                      src={file}
                      alt={`Preview ${index}`}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="bg-red-500 relative text-white px-8 py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              {loading ? (
                <div className="flex justify-center" role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Add"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProductContent;
