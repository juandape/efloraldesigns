import { tabsStyles, liStyles } from '@/styles/Styles';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/visibility-settings`;

const SpecialOcassions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<{
    dropdownItems: { name: string; link: string; visible: boolean }[];
    showSpecialOccasions: boolean;
  } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await axios.get(url);
      setSettings(response.data);
    };

    fetchSettings();
  }, []);

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

  if (!settings) {
    return (
      <div className='mt-3'>
        <AiOutlineLoading3Quarters className='animate-spin text-blue-sky'/>
      </div>
    );
  }

  return (
    <div className='relative inline-block text-left z-[9999]' ref={ref}>
      {settings.showSpecialOccasions && (
        <>
          <div>
            <button
              type='button'
              className={`inline-flex sm:justify-center items-center w-full py-2 ${tabsStyles}`}
              onClick={toggleDropdown}
            >
              Special Occasions
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
            <div className='origin-top-right absolute pl-6 mt-2 py-4 w-56 rounded-md shadow-lg bg-pink ring-1 ring-black ring-opacity-5 animate-fadeIn z-[9999]'>
              <ul
                className='py-1'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='options-menu'
              >
                {settings.dropdownItems.map(
                  (
                    item: { name: string; link: string; visible: boolean },
                    index: number
                  ) =>
                    item.visible ? (
                      <Link key={index} href={item.link}>
                        <li
                          className={liStyles}
                          role='menuitem'
                          onClick={toggleDropdown}
                        >
                          {item.name}
                        </li>
                      </Link>
                    ) : null
                )}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SpecialOcassions;
