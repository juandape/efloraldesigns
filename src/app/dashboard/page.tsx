'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import TopHeader from '@/components/TopHeader';
import Weddings from './components/Weddings';
import Birthday from './components/Birthday';
import Anniversary from './components/Anniversary';
import Mothers from './components/Mothers';
import Valentine from './components/Valentines';
import Christmas from './components/Christmas';
import { GetRole, token } from '@/components/GetRole';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/visibility-settings`;

export default function Dashboard() {
  const [settings, setSettings] = useState({
    showSpecialOccasions: false,
    dropdownItems: [
      { name: "Valentine's Day", visible: false },
      { name: "Mother's Day", visible: false },
      { name: 'Christmas', visible: false },
    ],
  });

  const role = GetRole();

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role,
        },
      });
      setSettings(response.data);
    };

    fetchSettings();
  }, []);

  return (
    <div className='mb-10'>
      <TopHeader
        imageSrc='https://res.cloudinary.com/dpvmwsbq8/image/upload/v1725034120/efloraldesigns/e2d267e6915cf593b563ad20b2762331.webp'
        imageAlt='Homebanner'
        title='E FLORAL DESIGNS'
        headerText='Your better choice for any occasions'
      />
      {settings.showSpecialOccasions && (
        <section className='mt-10'>
          <hr className='w-80 sm:w-1/2 mx-auto border-3' />
          <h2 className='text-center text-2xl sm:text-3xl my-10 font-bold'>
            Special Occasions
          </h2>
          <hr className='w-80 sm:w-1/2 mx-auto border-3' />
          {settings.dropdownItems.find(
            (item) => item.name === "Valentine's Day"
          )?.visible && <Valentine />}
          {settings.dropdownItems.find((item) => item.name === "Mother's Day")
            ?.visible && <Mothers />}
          {settings.dropdownItems.find((item) => item.name === 'Christmas')
            ?.visible && <Christmas />}
        </section>
      )}
      <section className='mt-10'>
        <hr className='w-80 sm:w-1/2 mx-auto border-3' />
        <h2 className='text-center text-2xl sm:text-3xl my-10 font-bold'>
          Ocassions
        </h2>
        <hr className='w-80 sm:w-1/2 mx-auto border-3' />
        <Anniversary />
        <Weddings />
        <Birthday />
      </section>
    </div>
  );
}
