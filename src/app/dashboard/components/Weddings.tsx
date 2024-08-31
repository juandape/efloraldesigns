'use client';

import React, { useEffect } from 'react';
import Carousel from '@/components/Carousel';
import { useFetchFlowersByOccasion } from '@/components/useFetchFlowersByOcassion';

const Weddings: React.FC = () => {
  const { flowers, error } = useFetchFlowersByOccasion('weddings');

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const flowersItems = flowers
    .map((flower) => ({
      name: flower.imageName,
      image: flower.image,
      ocassion: flower.ocassion,
      position: flower.position || 1,
    }))
    .sort((a, b) => a.position - b.position);

  return (
    <Carousel
      items={flowersItems}
      title='Weddings'
      elementId='slider'
      visibleClass='animate-slide-in'
      hiddenClass='block'
      limit={4}
    />
  );
};

export default Weddings;
