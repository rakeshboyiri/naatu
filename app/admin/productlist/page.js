'use client'

import React from 'react';
import ProductItem from '../productitem/page';

const ProductList = ({ products, onRemoveProduct, onUpdateProduct }) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {products.map((product) => (
        <ProductItem
          key={product._id}
          product={product}
          onRemove={() => onRemoveProduct && onRemoveProduct(product._id)}
          onUpdate={(updatedProduct) => onUpdateProduct && onUpdateProduct(updatedProduct)}
        />
      ))}
    </div>
  );
};

export default ProductList;
