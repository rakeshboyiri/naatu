'use client'
import React, { useState } from 'react';
import axios from 'axios';

const ProductItem = ({ product, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false); // Toggle between view/edit modes
  const [editedProduct, setEditedProduct] = useState(product); // Local copy for edits
  const [error, setError] = useState('');

  const handleEditClick = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(
        `https://naatudealssite-backend.onrender.com/api/products/${product._id}`,
        editedProduct
      );
      setIsEditing(false); // Exit editing mode
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product.');
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Cancel editing mode
    setEditedProduct(product); // Revert to original product data
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-4 w-full sm:w-80 flex flex-col items-center space-y-4">
      {isEditing ? (
        <div className="w-full">
          <input
            type="text"
            name="name"
            value={editedProduct.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full mb-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="photo"
            value={editedProduct.photo}
            onChange={handleChange}
            placeholder="Product Photo URL"
            className="w-full mb-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="link"
            value={editedProduct.link}
            onChange={handleChange}
            placeholder="Product Link"
            className="w-full mb-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex justify-between space-x-4">
            <button
              onClick={handleSaveClick}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              onClick={handleCancelClick}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="relative w-full h-40">
            <img
              src={product.photo}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover rounded-md shadow-md"
            />
          </div>
          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
          <div className="flex justify-between w-full space-x-2">
            <button
              onClick={handleEditClick}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Edit
            </button>
            {onRemove && (
              <button
                onClick={onRemove}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Remove
              </button>
            )}
          </div>
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-blue-600 hover:underline"
          >
            View Product
          </a>
        </>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ProductItem;
