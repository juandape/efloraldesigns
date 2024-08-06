import { tabsStyles } from '@/styles/Styles';
import React, { useState, useRef, useEffect } from 'react';

const Ocassions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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

  const liClasses =
    'px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-300';

  return (
    <div className='relative inline-block text-left z-50' ref={ref}>
      <div>
        <button
          type='button'
          className={`inline-flex justify-center items-center w-full px-4 py-2 ${tabsStyles}`}
          onClick={toggleDropdown}
        >
          Occasions
          <svg
            className='-mr-1 ml-2 h-5 w-5'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.707a1 1 0 011.414 0L10 11.086l3.293-3.379a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-red-200 ring-1 ring-black ring-opacity-5 animate-fadeIn'>
          <ul
            className='py-1'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
          >
            <li className={liClasses} role='menuitem'>
              Birthday
            </li>
            <li className={liClasses} role='menuitem'>
              Wedding
            </li>
            <li className={liClasses} role='menuitem'>
              Anniversary
            </li>
            <li className={liClasses} role='menuitem'>
              Graduation
            </li>
            <li className={liClasses} role='menuitem'>
              Valentine's Day
            </li>
            <li className={liClasses} role='menuitem'>
              Christmas
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Ocassions;
