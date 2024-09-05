'use client';

import TopHeader from '@/components/TopHeader';
import Weddings from './components/Weddings';
import Birthday from './components/Birthday';
import Anniversary from './components/Anniversary';
import Mothers from './components/Mothers';
import Valentine from './components/Valentines';
import Christmas from './components/Christmas';

export default function Dashboard() {
  return (
    <div className='mb-10'>
      <TopHeader
        imageSrc='https://res.cloudinary.com/dpvmwsbq8/image/upload/v1725034120/efloraldesigns/e2d267e6915cf593b563ad20b2762331.webp'
        imageAlt='Homebanner'
        title='E Floral Designs'
        headerText='Your better choice for your special occasions'
      />
      <section className='mt-10'>
        <hr className='w-80 sm:w-1/2 mx-auto border-3' />
        <h2 className='text-center text-2xl sm:text-4xl my-10 font-bold'>
          Ocassions
        </h2>
        <hr className='w-80 sm:w-1/2 mx-auto border-3' />
        <Anniversary />
        <Weddings />
        <Birthday />
      </section>
      <section className='mt-10'>
        <hr className='w-80 sm:w-1/2 mx-auto border-3' />
        <h2 className='text-center text-2xl sm:text-4xl my-10 font-bold'>
          Special Ocassions
        </h2>
        <hr className='w-80 sm:w-1/2 mx-auto border-3' />
        <Valentine />
        <Mothers />
        <Christmas />
      </section>
    </div>
  );
}
