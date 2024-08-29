'use client';

import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import { MdOutlineBackspace } from 'react-icons/md';
import { tabsStyles, liStyles } from '@/styles/Styles';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/contact-messages`;

interface ContactMessage {
  _id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export default function ContactMessages() {
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('name');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      return;
    }
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const messagesData = response.data.messages;
        if (Array.isArray(messagesData)) {
          setContactMessages(messagesData);
        } else {
          console.error('Unexpected data format:', response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category: string) => {
    setFilterCategory(category);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearFilter = () => {
    setFilter('');
  };

  const filteredMessages = contactMessages.filter((message) => {
    const lowerFilter = filter.toLowerCase();
    if (filterCategory === 'name') {
      return message.name.toLowerCase().includes(lowerFilter);
    } else if (filterCategory === 'email') {
      return message.email.toLowerCase().includes(lowerFilter);
    } else if (filterCategory === 'date') {
      const formattedDate = formatDate(message.createdAt).toLowerCase();
      return formattedDate.includes(lowerFilter);
    }
    return false;
  });

  return (
    <section className='relative p-6'>
      <a href='/admin-tools' className='absolute left-96 mt-10'>
        <MdOutlineBackspace className='text-3xl text-blue-sky hover:text-blue-600' />
      </a>
      <div className='flex items-center justify-center'>
        <h2 className='text-2xl xl:text-5xl mt-10 font-semibold w-80 xl:w-2/5 text-center rounded-xl py-4 sm:py-6 bg-gray-200 opacity-80 shadow-sm shadow-gray-400 animate-fadeIn'>
          Contact Messages
        </h2>
      </div>
      <p className='text-blue-sky text-base sm:text-3xl text-center my-20 mx-5 sm:mx-20 font-semibold'>
        View all contact messages
      </p>

      {/* Filtro de búsqueda */}
      <div className='flex flex-col sm:flex-row justify-center items-center mb-6 gap-4'>
        <input
          type='text'
          placeholder={`Search by ${filterCategory}...`}
          value={filter}
          onChange={handleFilterChange}
          className='bg-gray-100 py-3 rounded-lg pl-3'
        />

        <div className='relative inline-block text-left z-50' ref={dropdownRef}>
          <button
            type='button'
            className={`inline-flex sm:justify-center items-center w-full py-3 px-3 rounded-lg bg-gray-100 ${tabsStyles}`}
            onClick={toggleDropdown}
          >
            {` Filter by ${filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)}`}
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

          {isDropdownOpen && (
            <div className='origin-top-right absolute pl-6 mt-2 py-4 w-56 rounded-md shadow-lg bg-gray-100 ring-1 ring-black ring-opacity-5 animate-fadeIn'>
              <ul
                className='py-1'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='options-menu'
              >
                <li
                  className={liStyles}
                  role='menuitem'
                  onClick={() => handleCategorySelect('name')}
                >
                  Name
                </li>
                <li
                  className={liStyles}
                  role='menuitem'
                  onClick={() => handleCategorySelect('email')}
                >
                  Email
                </li>
                <li
                  className={liStyles}
                  role='menuitem'
                  onClick={() => handleCategorySelect('date')}
                >
                  Date
                </li>
              </ul>
            </div>
          )}
        </div>

        <button
          onClick={clearFilter}
          className='w-20 bg-blue-sky hover:border hover:text-blue-sky hover:bg-gray-100 hover:border-blue-sky text-white py-2.5 px-2 rounded-xl transition duration-300'
        >
          Clear
        </button>
      </div>

      {/* Mensajes de contacto filtrados */}
      <div className='flex flex-col sm:w-1/3 mx-auto'>
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <div key={message._id} className='border p-4 mb-4 rounded-lg'>
              <h3 className='text-lg font-bold text-blue-sky'>
                {message.name}
              </h3>
              <p className='text-gray-500'>
                Date: {formatDate(message.createdAt)}
              </p>
              <p className='text-gray-500'>Email: {message.email}</p>
              <p className='text-gray-500'>Phone: {message.phone}</p>
              <p className='text-gray-500'>Message: {message.message}</p>
            </div>
          ))
        ) : (
          <p className='text-center text-gray-500'>No messages found.</p>
        )}
      </div>
    </section>
  );
}
