'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { MdOutlineBackspace } from 'react-icons/md';

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
        console.log('holi', messagesData);
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

  return (
    <section className='relative p-6 h-screen'>
      <a href='/admin-tools' className='absolute left-96'>
        <MdOutlineBackspace className='text-3xl text-blue-sky hover:text-blue-600' />
      </a>
      <h2 className='text-2xl font-bold text-center text-blue-sky mb-2'>
        Contact Messages
      </h2>
      <hr className='border-blue-sky w-40 mx-auto mb-10' />
      <div className='flex flex-col'>
        {contactMessages.map((message) => (
          <div key={message._id} className='border p-4 mb-4 rounded-lg'>
            <h3 className='text-lg font-bold text-blue-sky'>{message.name}</h3>
            <p className='text-gray-500'>Date: {formatDate(message.createdAt)}</p>
            <p className='text-gray-500'>Email: {message.email}</p>
            <p className='text-gray-500'>Phone: {message.phone}</p>
            <p className='text-gray-500'>Message: {message.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
