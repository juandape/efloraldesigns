'use client';

import { useState } from 'react';
import TopHeader from '../../components/TopHeader';
import { buttonStyles, labelStyles, inputStyles } from '@/styles/Styles';
import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/contact-messages`;

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

export default function Contact() {
  const [data, setData] = useState(initialFormState);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .post(url, data)
      .then(() => {
        Swal.fire({
          title: 'Thank you for contacting us!',
          text: 'We will get back to you as soon as possible.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Oops!',
          text: 'Something went wrong. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
    setData(initialFormState);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <TopHeader
        imageSrc='https://res.cloudinary.com/dpvmwsbq8/image/upload/v1725034167/efloraldesigns/0ce0548a6772770aebbfeca8994acac6.jpg'
        imageAlt='Contact Us'
        title='Contact Us'
        headerText='We would love to hear from you! Please feel free to reach out to us with any questions or comments you may have.'
      />
      <section className='mb-20'>
        <form
          className='flex flex-col w-96 sm:w-1/3 justify-center mx-auto border rounded-2xl py-6 px-10 shadow-xl'
          onSubmit={handleSubmit}
        >
          <h2 className='text-2xl font-bold text-center mb-2'>Contact Us</h2>
          <hr className=' mb-5' />
          <label htmlFor='name' className={labelStyles}>
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className={inputStyles}
            placeholder='Your Name'
            required
            value={data.name}
            onChange={handleChange}
          />
          <label htmlFor='email' className={labelStyles}>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className={inputStyles}
            placeholder='name@mail.com'
            required
            value={data.email}
            onChange={handleChange}
          />
          <label htmlFor='phone' className={labelStyles}>
            Phone
          </label>
          <input
            type='tel'
            id='phone'
            name='phone'
            className={inputStyles}
            placeholder='123-456-7890'
            required
            value={data.phone}
            onChange={handleChange}
          />
          <label htmlFor='message' className={labelStyles}>
            Message
          </label>
          <textarea
            id='message'
            name='message'
            className='bg-gray-100 py-3 rounded-lg mb-5 resize-none h-40 pl-3'
            placeholder='Describe your thoughts'
            required
            value={data.message}
            onChange={handleChange}
          />
          <button type='submit' className={`mt-5 ${buttonStyles}`}>
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
