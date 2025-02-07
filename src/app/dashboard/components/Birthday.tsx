import React from 'react';
import FlowerCarousel from './FlowerCarousel';

const Birthday: React.FC = () => {
  return (
    <FlowerCarousel
      occasion='birthday'
      title='Birthdays'
      link='occasions/birthday'
    />
  );
};

export default Birthday;
