'use client';

import TopHeader from '@/components/TopHeader';
import anniversarybanner from '@/images/flores/anniversarybanner.webp';
import Carousel from '@/components/Carousel';
import flor5 from '@/images/flores/flor5.jpeg';
import flor6 from '@/images/flores/flor6.webp';
import flor7 from '@/images/flores/flor7.jpeg';
import flor8 from '@/images/flores/flor8.jpeg';

export default function Anniversary() {
  return (
    <div className='mb-10'>
      <TopHeader
        imageSrc={anniversarybanner.src}
        imageAlt='Anniversary'
        title='Anniversary'
        headerText='Celebrate your anniversary with our beautiful flowers'
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
              image:  flor7.src,
            },
            {
              name: 'Ballons',
              image:  flor8.src,
            },
          ]}
          title='Bouquetes'
          description='Our anniversary bouquetes are the perfect gift for your loved one.'
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
              image:  flor7.src,
            },
            {
              name: 'Ballons',
              image:  flor8.src,
            },
          ]}
          title='Gifts'
          description='Our anniversary gifts are the perfect gift for your loved one.'
          elementId='slider'
          visibleClass='animate-slide-right'
          hiddenClass='block'
        />
      </section>
    </div>
  );
}
