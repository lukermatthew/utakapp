import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import db from "../../firebase/config";

interface Product {
  id: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(
      query(collection(db, "products"), orderBy("createdAt", "desc"))
    );
    const productsData: Product[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productsData);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mx-5 mt-5">Products List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
        {loading ? (
          <div>Loading...</div>
        ) : products.length === 0 ? (
          <div>No products available</div>
        ) : (
          products.map((product) => (
            <div key={product.id}>
              <Card product={product} />{" "}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ProductList;
