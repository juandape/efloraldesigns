import React from 'react';
import Carousel from './Carousel';
import logo from '@/images/logo.png';

const flowersItems = [
  {
    name: 'flower 1',
    image: logo.src,
  },
  {
    name: 'flower 2',
    image: logo.src,
  },
  {
    name: 'flower 3',
    image: logo.src,
  },
  {
    name: 'flower 4',
    image: logo.src,
  },
  // Add more items as needed
];

const Weddings: React.FC = () => {
  return (
    <Carousel
      items={flowersItems}
      title='Weddings'
      elementId='slider'
      visibleClass='animate-slide-right'
      hiddenClass='block'
    />
  );
};

export default Weddings;
