'use client';

import { useEffect } from 'react';
import TopHeader from '@/components/TopHeader';
import Carousel from '@/components/Carousel';
import { useFetchFlowersByOccasion } from '@/components/useFetchFlowersByOcassion';

export default function Anniversary() {
  const { flowers, error } = useFetchFlowersByOccasion('anniversary');

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const displayedItems = flowers
    .map((flower) => ({
      name: flower.imageName,
      image: flower.image,
      ocassion: flower.ocassion,
      position: flower.position || 1,
      description: flower.description,
    }))
    .sort((a, b) => a.position - b.position);

  return (
    <div className='mb-10'>
      <TopHeader
        imageSrc='https://res.cloudinary.com/dpvmwsbq8/image/upload/v1725034060/efloraldesigns/c1ba2e6a8db10b5b718c900c17105701.webp'
        imageAlt='Anniversary'
        title='Anniversary'
        headerText='Celebrate your anniversary with our beautiful flowers'
      />
      <section>
        <Carousel
          items={displayedItems}
          title='Bouquetes'
          carouselDescription='Our anniversary bouquetes are the perfect gift for your loved one.'
          elementId='slider'
          visibleClass='animate-slide-right'
          hiddenClass='block'
          limit={10}
        />

        <Carousel
          items={displayedItems}
          title='Gifts'
          carouselDescription='Our anniversary gifts are the perfect gift for your loved one.'
          elementId='slider'
          visibleClass='animate-slide-right'
          hiddenClass='block'
          limit={10}
        />
      </section>
    </div>
  );
}
