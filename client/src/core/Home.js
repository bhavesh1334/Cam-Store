/** @format */

import React, { useState, useEffect } from 'react';
import { API } from '../backend';
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError({ error: data.error });
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  console.log('API IS ', API);
  return (
    <Base title='Cam-Store' description='Here you can get collections of Camera'>
      <div className='row text-center'>
        <h2 className='text-white '>Cameras</h2>
        <div className='row'>
          {products.map((product, index) => {
            return (
              <div key={index} className='col-sm-4 py-3 py-sm-0 mb-2'>
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
