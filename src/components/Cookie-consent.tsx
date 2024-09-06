'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CookieConsent() {
  const [isCookieConfirmed, setIsCookieConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New state variable for initial loading

  useEffect(() => {
    const cookieAcepted = localStorage.getItem('cookieAcepted');
    if (cookieAcepted) {
      setIsCookieConfirmed(true);
    }
    setIsLoading(false); // Update loading state once the initial check is done
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('cookieAcepted', 'true');
    setIsCookieConfirmed(true);
  };

  if (isLoading || isCookieConfirmed) {
    // Display nothing while initial loading is in progress
    return null;
  }

  return (
    <div className='fixed bottom-10 left-0  bg-black/[0.5] animate-slide-left'>
      <div className='flex flex-col w-screen bg-black h-30 relative rounded-lg p-2'>
        <p className='my-2 text-sm sm:text-base text-center font-bold text-white'>
          This website uses cookies to ensure you get the best experience on our website.
        </p>
        <p>
          If you continue to use this site, you agree to the use of cookies.
        </p>
        <div className='text-center'>
          <Link
            className='text-xs text-white hover:underline'
            href='/cookies-policy'
          >
            Cookies Policy
          </Link>
        </div>
        <button onClick={handleConfirm}> Accept </button>
      </div>
    </div>
  );
}