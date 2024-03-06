import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome Folks. </h1>
          <p className="py-6">
            Utak is a software company helping small businesses in the
            Philippines expand and grow as we believe Small businesses are the
            backbone of the economy and contribute most to job creation. Our
            main product is a point of sale system and a shopify type website we
            give to our merchants.
          </p>
          <Link to="/products">
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
