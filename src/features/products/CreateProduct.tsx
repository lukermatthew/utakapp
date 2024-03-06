import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import db from "../../firebase/config";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("Dessert");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");
  const [stock, setStock] = useState("");
  const [options, setOptions] = useState<{ name: string; size: string }[]>([]);
  const [errors, setErrors] = useState({
    productName: "",
    price: "",
    cost: "",
    stock: "",
    options: Array.from({ length: options.length }, () => ({
      name: "",
      size: "",
    })),
  });

  const validOptions = ["Small", "Medium", "Large"];

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index].size = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    // Validate form
    let formIsValid = true;
    const newErrors = { ...errors };

    if (!productName) {
      formIsValid = false;
      newErrors.productName = "Product name is required";
    } else {
      newErrors.productName = "";
    }

    if (!price) {
      formIsValid = false;
      newErrors.price = "Price is required";
    } else if (isNaN(parseFloat(price))) {
      formIsValid = false;
      newErrors.price = "Price must be a valid number";
    } else {
      newErrors.price = "";
    }

    if (!cost) {
      formIsValid = false;
      newErrors.cost = "Cost is required";
    } else if (isNaN(parseFloat(cost))) {
      formIsValid = false;
      newErrors.cost = "Cost must be a valid number";
    } else {
      newErrors.cost = "";
    }

    if (!stock) {
      formIsValid = false;
      newErrors.stock = "Stock is required";
    } else if (isNaN(parseInt(stock))) {
      formIsValid = false;
      newErrors.stock = "Stock must be a valid number";
    } else {
      newErrors.stock = "";
    }

    const optionErrors = options.map((option, index) => {
      if (!option.name || !option.size) {
        formIsValid = false;
        return { name: "Option name and size are required", size: "" };
      }
      return { name: "", size: "" };
    });
    newErrors.options = optionErrors;

    setErrors(newErrors);

    if (!formIsValid) {
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        category: category,
        productName: productName,
        price: parseFloat(price),
        cost: parseFloat(cost),
        stock: parseInt(stock),
        options: options,
        createdAt: serverTimestamp(),
      });

      navigate("/products");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating product");
    } finally {
      setCategory("Dessert");
      setProductName("");
      setPrice("");
      setCost("");
      setStock("");
      setOptions([]);
      setErrors({
        productName: "",
        price: "",
        cost: "",
        stock: "",
        options: Array.from({ length: options.length }, () => ({
          name: "",
          size: "",
        })),
      });
    }
  };

  const handleAddOption = () => {
    setOptions([...options, { name: "", size: "" }]);
    setErrors((prevErrors) => ({
      ...prevErrors,
      options: [...prevErrors.options, { name: "", size: "" }],
    }));
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
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
          <h1 className="text-5xl font-bold mb-5">Create Products</h1>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Choose Category</span>
            </div>
            <select
              className="select select-bordered w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
              value={cost}
              onChange={(e) => setCost(e.target.value)}
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
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="How many stock?"
              className="input input-bordered w-full"
            />
            {errors.stock && (
              <p className="text-red-500 flex items-center justify-start">
                {errors.stock}
              </p>
            )}
          </label>
          {options.map((option, index) => (
            <div key={index} className="form-control w-full">
              <div className="label">
                <span className="label-text">Option {index + 1}</span>
              </div>
              <input
                type="text"
                value={option.name}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index].name = e.target.value;
                  setOptions(newOptions);
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

export default CreateProduct;
