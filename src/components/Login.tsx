'use client';

import { useState } from 'react';
import { buttonStyles, inputStyles, labelStyles } from '@/styles/Styles';
import { FaRegEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/auth/local/login`;

interface Props {
  toggleModal: () => void;
}

const initialFormState = {
  email: '',
  password: '',
};

export default function Login({ toggleModal }: Props) {
  const [data, setData] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(data, url);
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        Cookies.set('token', res.data.token, { expires: 7 });
        Cookies.set('user', JSON.stringify(res.data.profile), { expires: 7 });
        Swal.fire({
          title: `Welcome Back ${res.data.profile.name}!`,
          text: 'You have successfully signed in!',
          icon: 'success',
          confirmButtonText: 'OK',
          preConfirm: () => {
            if (res.data.profile.role === 'admin') {
              router.push('/admin-tools');
            } else {
              router.push('/');
            }
            toggleModal();
            return new Promise<void>((resolve) => {
              setTimeout(() => {
                location.reload();
                resolve();
              }, 0);
            });
          },
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: 'Oops...',
          text: 'Bad credentials, please try again!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className='p-6 rounded-xl'>
      <h2 className='text-2xl font-bold text-center text-blue-sky mb-2'>
        Sign In
      </h2>
      <hr className='border-blue-sky' />
      <form className='flex flex-col my-5' onSubmit={handleSubmit}>
        <label htmlFor='email' className={labelStyles}>
          Email
        </label>
        <input
          type='email'
          id='email'
          name='email'
          className={inputStyles}
          placeholder='Your registered email'
          value={data.email}
          onChange={handleChange}
        />
        <div className='relative flex flex-col'>
          <label htmlFor='password' className={labelStyles}>
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            name='password'
            className={inputStyles}
            placeholder='Your Password'
            value={data.password}
            onChange={handleChange}
          />
          <span className='absolute right-5 top-12'>
            {showPassword ? (
              <FaRegEye
                onClick={togglePassword}
                className='text-blue-sky cursor-pointer'
              />
            ) : (
              <FaEyeSlash
                onClick={togglePassword}
                className='text-blue-sky cursor-pointer'
              />
            )}
          </span>
        </div>

        <button type='submit' className={`mt-5 ${buttonStyles}`}>
          Sign In
        </button>
      </form>
      <p className='text-sm mt-10 text-right'>
        Don't have an account?{' '}
        <span
          className='text-blue-sky hover:text-blue-500 cursor-pointer transition duration-300'
          onClick={() => {
            toggleModal();
            setTimeout(() => {
              router.push('/signup');
            }, 0);
          }}
        >
          Sign up
        </span>
      </p>
    </section>
  );
}
