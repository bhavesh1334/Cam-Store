/** @format */

import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/helper';

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#72b6cc' };
  } else {
    return { color: '#FFFFFF' };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className='nav nav-tabs bg-dark mr-auto'>
      <li className='nav-item'>
        <Link style={currentTab(history, '/')} className='nav-link' to='/'>
          Home
        </Link>
      </li>
      <li className='nav-item'>
        <Link style={currentTab(history, '/cart')} className='nav-link' to='/cart'>
          Cart
        </Link>
      </li>
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className='nav-item'>
          <Link
            style={currentTab(history, '/user/dashboard')}
            className='nav-link'
            to='/user/dashboard'>
            User
          </Link>
        </li>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className='nav-item'>
          <Link
            style={currentTab(history, '/admin/dashboard')}
            className='nav-link'
            to='/admin/dashboard'>
            Admin
          </Link>
        </li>
      )}

      {!isAuthenticated() && (
        <Fragment>
          <li className='nav-item'>
            <Link style={currentTab(history, '/signup')} className='nav-link' to='/signup'>
              Signup
            </Link>
          </li>
          <li className='nav-item'>
            <Link style={currentTab(history, '/signin')} className='nav-link' to='/signin'>
              SignIn
            </Link>
          </li>
        </Fragment>
      )}

      {isAuthenticated() && (
        <li className='nav-item'>
          <Link
            className='nav-link text-white'
            onClick={() => {
              signout(() => {
                history.push('/');
              });
            }}>
            Signout
          </Link>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
