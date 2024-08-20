import React from 'react';
import Carousel from '@/components/Carousel';
import flor5 from '@/images/flores/flor5.jpeg';
import flor6 from '@/images/flores/flor6.webp';
import flor7 from '@/images/flores/flor7.jpeg';
import flor8 from '@/images/flores/flor8.jpeg';

const flowersItems = [
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
  // Add more items as needed
];

const Birthday: React.FC = () => {
  return (
    <Carousel
      items={flowersItems}
      title='Birthday'
      elementId='slider'
      visibleClass='animate-slide-right'
      hiddenClass='block'
    />
  );
};

export default Birthday;
