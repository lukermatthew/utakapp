import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../components";
import ButtonCircle from "../components/ButtonCircle";
import ProductList from "../features/products/ProductList";

const ProductPage = () => {
  return (
    <>
      <ProductList />
      <Link to="/products/create">
        <ButtonCircle />
      </Link>
    </>
  );
};

export default ProductPage;
