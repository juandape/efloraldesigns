'use client';

import { useEffect } from 'react';
import TopHeader from '@/components/TopHeader';
import Carousel from '@/components/Carousel';
import { useFetchFlowersByOccasion } from '@/components/useFetchFlowersByOcassion';

export default function Weddings() {
  const { flowers, error } = useFetchFlowersByOccasion('weddings');

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
    }))
    .sort((a, b) => a.position - b.position);

  return (
    <div className='mb-10'>
      <TopHeader
        imageSrc='https://res.cloudinary.com/dpvmwsbq8/image/upload/v1725034086/efloraldesigns/122282e1a1f1846019313044fedbdbfb.png'
        imageAlt='Weddings'
        title='Weddings'
        headerText='We have the perfect flowers for your special day'
      />
      <section>
        <Carousel
          items={displayedItems}
          title='Bouquetes'
          description='Our wedding bouquetes are the perfect gift for your loved one.'
          elementId='slider'
          visibleClass='animate-slide-right'
          hiddenClass='block'
          limit={10}
        />
        <Carousel
          items={displayedItems}
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
