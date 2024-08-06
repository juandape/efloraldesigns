'use client';

import { IoPersonCircleOutline } from 'react-icons/io5';
import Link from 'next/link';
import logo from '@/images/logo.png';
import Img from 'next/image';
import Ocassions from './components/Ocassions';

export default function Header() {
  return (
    <header className='flex items-center justify-between p-4 bg-gradient-to-b from-ocre to-red-200'>
      <Link href='/'>
        <Img src={logo} alt='Logo' className='w-20' />
      </Link>
      <nav className='flex items-center space-x-4 mr-20'>
        <Ocassions />
        <Link href='/about'>About</Link>
        <Link href='/contact'>Contact Us</Link>
        <Link href='/login'>
          <IoPersonCircleOutline className='text-2xl' />
        </Link>
      </nav>
    </header>
  );
}
