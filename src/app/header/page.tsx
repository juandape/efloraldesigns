'use client';

import { IoPersonCircleOutline, IoMenu, IoClose } from 'react-icons/io5';
import Link from 'next/link';
import logo from '@/images/logo.png';
import Img from 'next/image';
import Ocassions from './components/Ocassions';
import { useState, useEffect, useRef } from 'react';
import { tabsStyles } from '@/styles/Styles';
import Login from '@/components/Login';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

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
        <button onClick={toggleModal}>
          <IoPersonCircleOutline className={`text-2xl ${tabsStyles}`} />
        </button>
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
        <nav
          ref={menuRef}
          className='flex flex-col pl-10 absolute top-20 left-0 w-full bg-pink p-4 md:hidden z-50 animate-fadeIn'
        >
          <Ocassions />
          <Link
            href='/about'
            className={`${tabsStyles} my-2`}
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            href='/contact'
            className={`${tabsStyles} my-2`}
            onClick={toggleMenu}
          >
            Contact Us
          </Link>
          <button onClick={toggleModal} className={`${tabsStyles} my-2`}>
            <IoPersonCircleOutline className='text-2xl' onClick={toggleMenu} />
          </button>
        </nav>
      )}

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='relative bg-white w-96 sm:w-1/4 py-4 sm:px-5 rounded-lg shadow-sm shadow-blue-sky animate-fadeIn'>
            <button
              className='absolute top-4 right-4 text-blue-sky hover:text-purple transition duration-300'
              onClick={toggleModal}
            >
              <IoClose className='text-2xl' />
            </button>
            <Login toggleModal={toggleModal} />
          </div>
        </div>
      )}
    </header>
  );
}
