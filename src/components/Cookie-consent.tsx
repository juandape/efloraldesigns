'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function CookieConsent() {
  const [isCookieConfirmed, setIsCookieConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New state variable for initial loading

  useEffect(() => {
    const cookieAcepted = Cookies.get('cookieAcepted');
    if (cookieAcepted) {
      setIsCookieConfirmed(true);
    }
    setIsLoading(false); // Update loading state once the initial check is done
  }, []);

  const handleConfirm = () => {
    Cookies.set('cookieAcepted', 'true', { expires: 7 });
    setIsCookieConfirmed(true);
  };

  if (isLoading || isCookieConfirmed) {
    // Display nothing while initial loading is in progress
    return null;
  }

  return (
    <div className='fixed bottom-10 left-0 w-full animate-slide-left'>
      <div className='flex flex-col mx-auto h-30 w-2/3 bg-pink relative p-2 border-2 border-black rounded-xl shadow-xl'>
        <p className='my-2 text-sm sm:text-base text-center font-bold'>
          This website uses cookies to ensure you get the best experience on our
          website.
        </p>
        <p className='my-2 text-sm sm:text-base text-center font-bold'>
          If you continue to use this site, you agree to the use of cookies.
        </p>
        <div className='text-center'>
          <Link
            className='text-xs underline hover:text-blue-sky'
            href='/cookies-policy'
          >
            Cookies Policy
          </Link>
        </div>
        <button onClick={handleConfirm} className='bg-white w-20 mx-auto rounded-lg mt-2 hover:bg-blue-sky border-blue-sky border-2 hover:text-white transition duration-300'> Accept </button>
      </div>
    </div>
  );
}
