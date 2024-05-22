import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import cromaImage from './images/croma.png';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className='bg-black text-white flex justify-between h-20'>
        <div className='w-full m-auto max-w-[1200px] px-2'>
          <div className='flex items-center justify-between w-full'>
            <div className='p-3 flex items-center gap-12'>
              <Link to='/'>
                <div className='w-32 min-w-[128px]'>
                  <img src={cromaImage} className='w-full' alt='Croma HeadTag' />
                </div>
              </Link>
            </div>
            <div className='flex items-center gap-4'>
              <Link to='/signin' className='flex items-center text-2xl'>
                <span className='mr-2'>|</span>
              </Link>
              {isAuthenticated ? (
                <Link to='/' onClick={handleLogout} className='flex items-center text-2xl'>
                  <FaUser />
                  <span className='ml-2 text-xl'>Log Out</span>
                </Link>
              ) : (
                <Link to='/Signin' className='flex items-center text-2xl'>
                  <FaUser />
                  <span className='ml-2 text-xl'>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;
