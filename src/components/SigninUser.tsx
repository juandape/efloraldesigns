import { tabsStyles, liStyles } from '@/styles/Styles';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { RiFlowerLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { GetRole } from '@/components/GetRole';
import Cookies from 'js-cookie';

const SigninUser: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const userRole = GetRole();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#01AFD2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove('token');
        Cookies.remove('user');
        location.reload();
        router.push('/');
      }
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative inline-block text-left z-10' ref={ref}>
      <div>
        <button
          type='button'
          className={`inline-flex sm:justify-center items-center w-full py-2 ${tabsStyles}`}
          onClick={toggleDropdown}
        >
          <RiFlowerLine className='text-2xl' />
        </button>
      </div>

      {isOpen && (
        <div className='absolute sm:-ml-10 pl-5 mt-2 py-4 w-32 rounded-md shadow-lg bg-pink ring-1 ring-black ring-opacity-5 animate-fadeIn'>
          <ul
            className='py-1'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
            onClick={toggleDropdown}
          >
            {userRole === 'admin' && (
              <li className={liStyles} role='menuitem'>
                <Link href='/admin-tools'>Admin Tools</Link>
              </li>
            )}
            <li className={liStyles} role='menuitem' onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SigninUser;
