'use client';

import TopHeader from '@/components/TopHeader';
import Carousel from '@/components/Carousel';
import flor5 from '@/images/flores/flor5.jpeg';
import flor6 from '@/images/flores/flor6.webp';
import flor7 from '@/images/flores/flor7.jpeg';
import flor8 from '@/images/flores/flor8.jpeg';

export default function Birthday() {
  return (
    <div className='mb-10'>
      <TopHeader
        imageSrc='https://res.cloudinary.com/dpvmwsbq8/image/upload/v1725035176/efloraldesigns/birthdaybanner_p3qvyh.jpg'
        imageAlt='Birthday'
        title='Birthday'
        headerText='Celebrate your birthday with our beautiful flowers'
      />
      <section>
        <Carousel
          items={[
            {
              name: 'Bear',
              image: flor5.src,
            },
            {
              name: 'Birthday bouquet',
              image: flor6.src,
            },
            {
              name: 'Bear with flowers',
              image: flor7.src,
            },
            {
              name: 'Ballons',
              image: flor8.src,
            },
          ]}
          title='Bouquetes'
          description='Our birthday bouquetes are the perfect gift for your loved one.'
          elementId='slider'
          visibleClass='animate-slide-right'
          hiddenClass='block'
        />
        <Carousel
          items={[
            {
              name: 'Bear',
              image: flor5.src,
            },
            {
              name: 'Birthday bouquet',
              image: flor6.src,
            },
            {
              name: 'Bear with flowers',
              image: flor7.src,
            },
            {
              name: 'Ballons',
              image: flor8.src,
            },
          ]}
          title='Flowers'
          description='Our birthday flowers are the perfect gift for your loved one.'
          elementId='slider2'
          visibleClass='animate-slide-right'
          hiddenClass='block'
        />
      </section>
    </div>
  );
}
