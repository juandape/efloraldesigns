'use client';

import TopHeader from '@/components/TopHeader';
import flores from '@/images/flores.webp';
import Weddings from './components/Weddings';
import Birthday from './components/Birthday';
import Anniversary from './components/Anniversary';

export default function Dashboard() {
  const imageSrc = flores.src;
  return (
    <div className='mb-10'>
      <TopHeader
        imageSrc={imageSrc}
        imageAlt='banner'
        title='E Floral Designs'
        headerText='Your better choice for your special occasions'
      />
      <Anniversary />
      <Weddings />
      <Birthday />
    </div>
  );
}
