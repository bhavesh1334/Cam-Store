/** @format */

import React from 'react';
import Menu from './Menu';
// import Card from './Card';

const Base = ({
  title = 'My Title',
  description = 'My Description',
  className = 'text-white p-4 bg-dark',
  children,
}) => (
  <>
    <Menu />

    <div className='container-fluid'>
      <div className='jumbotron bg-dark text-white text-center'>
        <h2 className='display-4'>{title}</h2>
        <p className='lead'>{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>

    <footer className='footer bg-dark mt-auto py-3'>
      <div className='container-fluid bg-secondary text-white text-center py-4'>
        <h3>Feel free to reach us! </h3>
        <strong className='lead'>Contact Us :</strong>
        <span className='text-light'> +91-6261021368</span>
      </div>

      <div className='container'>
        <span className='text-muted'>
          An Amazing place to find best quality <span className='text-white'>Camera</span>
        </span>
      </div>
    </footer>
  </>
);

export default Base;
