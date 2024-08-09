'use client';

import { IoPersonCircleOutline } from 'react-icons/io5';
import Link from 'next/link';
import logo from '@/images/logo.png';
import Img from 'next/image';
import Ocassions from './components/Ocassions';
import { tabsStyles } from '@/styles/Styles';

export default function Header() {
  return (
    <header className='flex items-center justify-between p-2 border-b-4 border-gray-300 bg-pink font-bold'>
      <Link href='/'>
        <Img src={logo} alt='Logo' className='w-20' />
      </Link>
      <nav className='flex items-center gap-10 mr-20'>
        <Ocassions />
        <Link
          href='/about'
          className={tabsStyles}
        >
          About
        </Link>
        <Link
          href='/contact'
          className={tabsStyles}
        >
          Contact Us
        </Link>
        <Link href='/login'>
          <IoPersonCircleOutline className={`text-2xl ${tabsStyles}`} />
        </Link>
      </nav>
    </header>
  );
}
