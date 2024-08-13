'use client';
import { buttonStyles } from '@/styles/Styles';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/auth/local`;

export default function VerifyAccount() {
  const { token } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activationStatus, setActivationStatus] = useState('');

  async function handleClick() {
    try {
      await axios.post(`${url}/activate/${token}`).then((res) => {
        setActivationStatus(
          res.data.message || 'Account activated successfully'
        );
        console.log(res.data);
        Cookies.set('token', res.data.jwtToken, { expires: 7 });
        Cookies.set('user', JSON.stringify(res.data.profile), { expires: 7 });
        Swal.fire({
          icon: 'success',
          title: 'Account Activated',
          showCloseButton: true,
        });
        router.push('/');
        setLoading(false);
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Something went wrong!, ${(error as Error).message}`,
        showCloseButton: true,
      });
    }
  }

  return (
    <div className='flex flex-col h-screen bg-pink'>
      <h1 className='text-3xl font-bold text-center mb-10 mx-5 mt-20'>
        Welcome to E Floral Designs Miami
      </h1>
      <button
        onClick={handleClick}
        className={`w-48 mx-auto ${buttonStyles}`}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Verify Account'}
      </button>
      <p>{!token || activationStatus === 'Account activated'}</p>
    </div>
  );
}
