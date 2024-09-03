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
      <Anniversary />
      <Weddings />
      <Birthday />
      <section>
        Special Ocassions
        <Mothers />
        <Valentine />
        <Christmas />
      </section>
    </div>
  );
}
