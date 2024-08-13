'use client';

import axios from 'axios';
import { useState } from 'react';
import { buttonStyles, labelStyles, inputStyles } from '@/styles/Styles';
import Swal from 'sweetalert2';
import { FaRegEye, FaEyeSlash } from 'react-icons/fa';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/users`;

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (data.password !== data.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
        showCloseButton: true,
      });
      setLoading(false);
      return;
    }

    if (data.password.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password must be at least 8 characters!',
        showCloseButton: true,
      });
      setLoading(false);
      return;
    }

    try {
      await axios.post(url, data).then((res) => {
        console.log('user', res.data);
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Account created successfully',
          showCloseButton: true,
        });
        setData(initialFormState);

      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-full bg-pink pb-20'>
      <h1 className='text-3xl font-bold text-center mb-10 mx-5 mt-20 text-blue-sky'>
        Welcome to E Floral Designs Miami
      </h1>

      <form
        className='flex flex-col w-96 sm:w-1/3 mx-auto bg-white p-10 rounded-xl shadow-lg animate-slide-in'
        onSubmit={handleSubmit}
      >
        <p className='mb-10 ml-2'>Please fill the form to get started!</p>
        <label htmlFor='Name' className={labelStyles}>
          Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          className={inputStyles}
          placeholder='Your Name'
          onChange={handleChange}
          value={data.name}
          required
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
          onChange={handleChange}
          value={data.email}
          required
        />
        <label htmlFor='phone' className={labelStyles}>
          Phone number
        </label>
        <input
          type='tel'
          id='phone'
          name='phone'
          className={inputStyles}
          placeholder='123-456-7890'
          onChange={handleChange}
          value={data.phone}
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
            placeholder='Enter a 8 character password'
            onChange={handleChange}
            value={data.password}
            required
          />
          <span className='absolute right-5 top-12'>
            {showPassword ? (
              <FaRegEye
                onClick={handleShowPassword}
                className='text-blue-sky cursor-pointer'
              />
            ) : (
              <FaEyeSlash
                onClick={handleShowPassword}
                className='text-blue-sky cursor-pointer'
              />
            )}
          </span>
        </div>
        <div className='relative flex flex-col'>
          <label htmlFor='confirmPassword' className={labelStyles}>
            Confirm password
          </label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id='confirmPassword'
            name='confirmPassword'
            className={inputStyles}
            placeholder='Re-enter your password'
            onChange={handleChange}
            value={data.confirmPassword}
            required
          />
          <span className='absolute right-5 top-12'>
            {showConfirmPassword ? (
              <FaRegEye
                onClick={handleShowConfirmPassword}
                className='text-blue-sky cursor-pointer'
              />
            ) : (
              <FaEyeSlash
                onClick={handleShowConfirmPassword}
                className='text-blue-sky cursor-pointer'
              />
            )}
          </span>
        </div>
        <button className={`mt-10 ${buttonStyles}`} disabled={loading}>
          {loading ? 'Filling up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
