import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore"; // Import getDoc, doc, and updateDoc
import db from "../../firebase/config";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    category: "",
    productName: "",
    price: "",
    cost: "",
    stock: "",
    options: [],
  });
  const [errors, setErrors] = useState({
    category: "",
    productName: "",
    price: "",
    cost: "",
    stock: "",
    options: [],
  });

  const validOptions = ["Small", "Medium", "Large"];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduct(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Error fetching product");
      }
    };
    fetchProduct();
  }, [id]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...product.options];
    newOptions[index].size = value;
    setProduct({ ...product, options: newOptions });
  };

  const handleSubmit = async () => {
    // Validate form
    let formIsValid = true;
    const newErrors = { ...errors };

    // Add your validation logic here

    setErrors(newErrors);

    if (!formIsValid) {
      return;
    }

    try {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, product); // Update the document with the new product data

      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product");
    }
  };

  const handleAddOption = () => {
    setProduct({
      ...product,
      options: [...product.options, { name: "", size: "" }],
    });
    setErrors({
      ...errors,
      options: [...errors.options, { name: "", size: "" }],
    });
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...product.options];
    newOptions.splice(index, 1);
    setProduct({ ...product, options: newOptions });
    setErrors((prevErrors) => {
      const newOptionErrors = [...prevErrors.options];
      newOptionErrors.splice(index, 1);
      return { ...prevErrors, options: newOptionErrors };
    });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-5">Update Product</h1>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Choose Category</span>
            </div>
            <select
              className="select select-bordered w-full"
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            >
              <option value="Dessert">Dessert</option>
              <option value="Drink">Drink</option>
              <option value="Main">Main</option>
            </select>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Product Name</span>
            </div>
            <input
              type="text"
              value={product.productName}
              onChange={(e) =>
                setProduct({ ...product, productName: e.target.value })
              }
              placeholder="eg: adidas"
              className="input input-bordered w-full"
            />
            {errors.productName && (
              <p className="text-red-500 flex items-center justify-start">
                {errors.productName}
              </p>
            )}
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Price</span>
            </div>
            <input
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({
                  ...product,
                  price: parseFloat(e.target.value), // Parse input to number
                })
              }
              placeholder="how much the price?"
              className="input input-bordered w-full"
            />
            {errors.price && (
              <p className="text-red-500 flex items-center justify-start">
                {errors.price}
              </p>
            )}
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Cost</span>
            </div>
            <input
              type="number"
              value={product.cost}
              onChange={(e) =>
                setProduct({
                  ...product,
                  cost: parseFloat(e.target.value), // Parse input to number
                })
              }
              placeholder="How much is the cost?"
              className="input input-bordered w-full"
            />
            {errors.cost && (
              <p className="text-red-500 flex items-center justify-start">
                {errors.cost}
              </p>
            )}
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Amount in Stock</span>
            </div>
            <input
              type="number"
              value={product.stock}
              onChange={(e) =>
                setProduct({
                  ...product,
                  stock: parseInt(e.target.value), // Parse input to number
                })
              }
              placeholder="How many stock?"
              className="input input-bordered w-full"
            />
            {errors.stock && (
              <p className="text-red-500 flex items-center justify-start">
                {errors.stock}
              </p>
            )}
          </label>
          {product.options.map((option, index) => (
            <div key={index} className="form-control w-full">
              <div className="label">
                <span className="label-text">Option {index + 1}</span>
              </div>
              <input
                type="text"
                value={option.name}
                onChange={(e) => {
                  const newOptions = [...product.options];
                  newOptions[index].name = e.target.value;
                  setProduct({ ...product, options: newOptions });
                }}
                placeholder="Enter option"
                className="input input-bordered w-full mb-2"
              />
              {errors.options[index] && errors.options[index].name && (
                <p className="text-red-500 flex items-center justify-start">
                  {errors.options[index].name}
                </p>
              )}
              <select
                value={option.size}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">Select size</option>
                {validOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              {errors.options[index] && errors.options[index].size && (
                <p className="text-red-500 flex items-center justify-start">
                  {errors.options[index].size}
                </p>
              )}
              <button
                className="btn btn-error mt-2"
                onClick={() => handleRemoveOption(index)}
              >
                Remove Option
              </button>
            </div>
          ))}
          <button
            className="btn btn-warning btn-sm mt-3 flex items-center justify-center"
            onClick={handleAddOption}
          >
            Add Option
          </button>

          <div className="mt-5">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary w-full mb-2"
            >
              Submit
            </button>
            <Link to="/products">
              <button className="btn w-full">Cancel</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
