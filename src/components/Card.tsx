import React from "react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  productName: string;
  price: number;
  cost: number;
  stock: number;
  category: string;
}

interface CardProps {
  product: Product;
}

const Card = ({ product }: CardProps) => {
  return (
    <div className="card bg-base-200 shadow-xl p-4">
      <div className="flex items-center justify-end">
        <Link
          to={`/products/edit/${product.id}`}
          className="btn btn-sm btn-outline-primary"
        >
          Edit
        </Link>
      </div>
      <div className="card-body">
        <h2 className="card-title">
          {product.productName} <div className="badge badge-warning">NEW</div>
        </h2>
        <p>₱{product.price.toFixed(2)}</p>{" "}
        {/* Display price with 2 decimal places */}
        <div className="card-actions mt-4">
          <div className="badge badge-outline">{product.category}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
