"use client";

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AddProductForm from '../AddProductForm/page';
import ProductList from '../productlist/page';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://naatudealssite-backend.onrender.com/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  // Handles search input
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const results = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(results);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-blue-600 p-5 text-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* Uncomment to include a logo */}
            {/* <img src={logo} alt='logo' className='h-10' /> */}
            {/* <div className="text-2xl font-semibold">
              <h1>Naatu Deals</h1>
              <h3 className="text-xl">💥 Admin Page 💥</h3>
            </div> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <div className="mb-8">
          {/* Add Product Form */}
          <AddProductForm
            onAddProduct={(product) => {
              setProducts([...products, product]);
              setFilteredProducts([...products, product]);
            }}
          />
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          />
        </div>

        {/* Product List */}
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
};

export default Products;
