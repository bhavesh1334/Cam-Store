/** @format */

import React, { useState, useEffect } from 'react';
import { cartEmpty } from './helper/CartHelper';
import { isAuthenticated } from '../auth/helper';
import { createOrder } from './helper/OrderHelper';
import { getMeToken, processPayment } from './helper/paymentHelper';
import DropIn from 'braintree-web-drop-in-react';
import { Link } from 'react-router-dom';

const PaymentB = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((info) => {
      console.log('INFORMATIONs', info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtdropIn = () => {
    return (
      <div>
        {isAuthenticated() && info.clientToken !== null && products.length > 0 ? (
          <>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />

            <button className='btn btn-block rounded btn-info lead' onClick={onPurchase}>
              Buy
            </button>
          </>
        ) : (
          <>
            <p className='alert alert-dark rounded py-2 px-2 text-dark'>
              Please{' '}
              <Link to='/signin' className='text-info'>
                Login{' '}
              </Link>
              first to proceed further
            </p>
          </>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, [userId, token]);

  const onPurchase = () => {
    setInfo({ loading: true });

    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log('PAYMENT SUCCESS');
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };
          createOrder(userId, token, orderData);
          cartEmpty(() => {
            console.log('Did we got crash?');
          });
          setReload(!reload);
        })
        .catch((error) => {
          setInfo({ ...info, success: false, loading: false });
          console.log('PAYMENT FAILED', error);
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    if (products.length === 0) {
      return amount;
    } else {
      products.map((p) => (amount = amount + p.price));
    }
    return amount;
  };

  return (
    <div>
      <h2 className='lead'>Your billing amount ${getAmount()}</h2>
      {showbtdropIn()}
    </div>
  );
};

export default PaymentB;
