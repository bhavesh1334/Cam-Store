/** @format */

import React, { useState } from 'react';
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/CartHelper';

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  // const [count, setCount] = useState(product.count);

  const cartTitle = product ? product.name : 'A photo from pexels';
  const cartDescription = product ? product.description : 'Default description';
  const cartPrice = product ? product.price : 'DEFAULT';

  const addToCart = () => {
    addItemToCart(product, () => {
      setRedirect(true);
    });
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const showAddtoCart = (addtoCart) => {
    return (
      addtoCart && (
        <button onClick={addToCart} className='btn btn-info rounded px-4 '>
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className='btn btn-dark rounded px-4'>
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className='card bg-light mb-4 mt-3'>
      <div className='card-header text-secondary lead'>{cartTitle}</div>
      <div className='card-body'>
        {getARedirect(redirect)}
        <ImageHelper product={product} />

        <p className='font-weight-normal text-secondary text-camelcase text-wrap'>
          {cartDescription}
        </p>
        <p className='text-info px-6'>${cartPrice}</p>
        <div className='row'>
          <div className='col-12'>{showAddtoCart(addtoCart)}</div>
          <div className='col-12'>{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
