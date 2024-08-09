'use client';

import { useState } from 'react';
import { buttonStyles, inputStyles, labelStyles } from '@/styles/Styles';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const initialFormState = {
  username: '',
  password: '',
};

export default function Login({ toggleModal }: { toggleModal: () => void }) {
  const [data, setData] = useState(initialFormState);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setData(initialFormState);
    Swal.fire({
      title: `Welcome Back ${data.username}!`,
      text: 'You have successfully signed in!',
      icon: 'success',
      confirmButtonText: 'OK',
    });
    toggleModal();
    router.push('/admin-tools');
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
        <label htmlFor='username' className={labelStyles}>
          User
        </label>
        <input
          type='text'
          id='username'
          name='username'
          className={inputStyles}
          placeholder='Username'
          value={data.username}
          onChange={handleChange}
        />
        <label htmlFor='password' className={labelStyles}>
          Password
        </label>
        <input
          type='password'
          id='password'
          name='password'
          className={inputStyles}
          placeholder='Your Password'
          value={data.password}
          onChange={handleChange}
        />
        <button type='submit' className={`mt-5 ${buttonStyles}`}>
          Sign In
        </button>
      </form>
    </section>
  );
}
