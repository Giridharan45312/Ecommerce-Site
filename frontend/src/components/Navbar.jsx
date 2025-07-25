import React, { useContext, useState } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {setShowSearch,getCartCount, navigate , token, setToken, setCartItems} = useContext(ShopContext);

  const logout =() =>{    
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})

  }
  return (
    <div className='flex items-center justify-between py-5 font-medium relative'>
      <Link to='/'><img src={assets.logo} className='w-36' alt="Logo" /></Link>

      {/* Desktop Nav */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' end className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      {/* Icons */}
      <div className='flex items-center gap-6'>
        <img onClick={()=>setShowSearch(true)}src={assets.search_icon} className='w-5 cursor-pointer' alt="Search" />
        <div className='group relative'>

          <img onClick={()=>token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt="Profile" />
          {/* DropDown Menu */}
          {
            token &&            
            <div className='group-hover:block hidden absolute right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
              <p onClick={logout}className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
          }
        </div>
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
          {getCartCount()}
          </p>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="Menu" />
      </div>

      {/* Sidebar Menu for Mobile */}
<div className={`fixed top-0 right-0 bottom-0 left-0 overflow-auto bg-white transition-all duration-300 ease-in-out ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Back" />
            <p>BACK</p>
          </div>
          <NavLink className='py-2 pl-10 border-b' to='/' onClick={() => setVisible(false)}>HOME</NavLink>
          <NavLink className='py-2 pl-10 border-b' to='/collection' onClick={() => setVisible(false)}>COLLECTION</NavLink>
          <NavLink className='py-2 pl-10 border-b' to='/about' onClick={() => setVisible(false)}>ABOUT</NavLink>
          <NavLink className='py-2 pl-10 border-b' to='/contact' onClick={() => setVisible(false)}>CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
