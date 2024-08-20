'use client';

import TopHeader from '@/components/TopHeader';
import wedbanner from '@/images/flores/wedbanner.png';
import Carousel from '@/components/Carousel';
import flor5 from '@/images/flores/flor5.jpeg';
import flor6 from '@/images/flores/flor6.webp';
import flor7 from '@/images/flores/flor7.jpeg';
import flor8 from '@/images/flores/flor8.jpeg';

export default function Weddings() {
  return (
    <div className='mb-10'>
      <TopHeader
        imageSrc={wedbanner.src}
        imageAlt='Weddings'
        title='Weddings'
        headerText='We have the perfect flowers for your special day'
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
          description='Our wedding bouquetes are the perfect gift for your loved one.'
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
          title='Gifts'
          description='Our wedding gifts are the perfect gift for your loved one.'
          elementId='slider'
          visibleClass='animate-slide-right'
          hiddenClass='block'
        />
      </section>
    </div>
  );
}
