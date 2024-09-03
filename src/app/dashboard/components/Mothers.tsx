'use client';

import React, { useEffect } from 'react';
import Carousel from '@/components/Carousel';
import { useFetchFlowersByOccasion } from '@/components/useFetchFlowersByOcassion';

const Mothers: React.FC = () => {
  const { flowers, error } = useFetchFlowersByOccasion('mothers');

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
      description: flower.description,
    }))
    .sort((a, b) => a.position - b.position);

  return (
    <Carousel
      items={flowersItems}
      title="Mother's Day"
      elementId='slider'
      visibleClass='animate-slide-in'
      hiddenClass='block'
      limit={4}
    />
  );
};

export default Mothers;
