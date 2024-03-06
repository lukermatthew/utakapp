import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import db from "../../firebase/config";

interface Product {
  id: string;
  // Add other fields as per your product structure
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // State to manage loading state

  const getProducts = async () => {
    setLoading(true); // Set loading state to true when fetching data
    const querySnapshot = await getDocs(
      query(collection(db, "products"), orderBy("createdAt", "desc"))
    );
    const productsData: Product[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productsData);
    setLoading(false); // Set loading state to false when data fetching is done
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mx-5 mt-5">Products List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
        {loading ? ( // Check if data is still loading
          <div>Loading...</div> // Display loading message or spinner
        ) : products.length === 0 ? ( // Check if products array is empty
          <div>No products available</div> // Display message indicating no products available
        ) : (
          // Render products if available
          products.map((product) => (
            <div key={product.id}>
              <Card product={product} />{" "}
              {/* Pass product as a prop to Card component */}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ProductList;
