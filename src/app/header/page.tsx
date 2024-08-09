'use client';

import { IoPersonCircleOutline, IoMenu, IoClose } from 'react-icons/io5';
import Link from 'next/link';
import logo from '@/images/logo.png';
import Img from 'next/image';
import Ocassions from './components/Ocassions';
import { useState } from 'react';
import { tabsStyles } from '@/styles/Styles';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className='flex items-center justify-between p-2 border-b-4 border-gray-300 bg-pink font-bold'>
      <Link href='/'>
        <Img src={logo} alt='Logo' className='w-20' />
      </Link>
      <nav className='hidden md:flex items-center gap-10 mr-20'>
        <Ocassions />
        <Link href='/about' className={tabsStyles}>
          About
        </Link>
        <Link href='/contact' className={tabsStyles}>
          Contact Us
        </Link>
        <Link href='/login'>
          <IoPersonCircleOutline className={`text-2xl ${tabsStyles}`} />
        </Link>
      </nav>
      <div className='md:hidden flex items-center mr-5'>
        <button onClick={toggleMenu}>
          {isMenuOpen ? (
            <IoClose className='text-3xl' />
          ) : (
            <IoMenu className='text-3xl' />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <nav className='flex flex-col pl-10 absolute top-20 left-0 w-full bg-pink p-4 md:hidden z-50 animate-fadeIn'>
          <Ocassions />
          <Link href='/about' className={`${tabsStyles} my-2`}>
            About
          </Link>
          <Link href='/contact' className={`${tabsStyles} my-2`}>
            Contact Us
          </Link>
          <Link href='/login' className={`${tabsStyles} my-2`}>
            <IoPersonCircleOutline className='text-2xl' />
          </Link>
        </nav>
      )}
    </header>
  );
}
