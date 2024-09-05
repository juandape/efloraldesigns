'use client';

import HandleOccasion from '@/components/HandleOccasion';

const Valentines = () => {
  const subcategories = {
    Roses: 'Our Valentines roses are the perfect gift for your loved one.',
    Chocolates:
      'Our Valentines chocolates are the perfect gift for your loved one.',
  };

  return (
    <HandleOccasion
      occasion='valentines'
      headerImageSrc='https://res.cloudinary.com/dpvmwsbq8/image/upload/v1725034060/efloraldesigns/c1ba2e6a8db10b5b718c900c17105701.webp'
      headerImageAlt="Valentine's Day"
      headerTitle="Valentine's Day"
      headerText='Celebrate your Valentines with our beautiful flowers'
      subcategories={subcategories}
    />
  );
};

export default Valentines;

// 'use client';

// import { useEffect } from 'react';
// import TopHeader from '@/components/TopHeader';
// import Carousel from '@/components/Carousel';
// import { useFetchFlowersByOccasion } from '@/components/useFetchFlowersByOcassion';

// export default function Valentines() {
//   const { flowers, error } = useFetchFlowersByOccasion('valentine');

//   useEffect(() => {
//     if (error) {
//       console.error(error);
//     }
//   }, [error]);

//   const displayedItems = flowers
//     .map((flower) => ({
//       name: flower.imageName,
//       image: flower.image,
//       ocassion: flower.ocassion,
//       position: flower.position || 1,
//       description: flower.description,
//     }))
//     .sort((a, b) => a.position - b.position);

//   return (
//     <div className='mb-10'>
//       <TopHeader
//         imageSrc='https://res.cloudinary.com/dpvmwsbq8/image/upload/v1725035176/efloraldesigns/birthdaybanner_p3qvyh.jpg'
//         imageAlt='Valentines'
//         title="Valentine's Day"
//         headerText='Celebrate your Valentine with our beautiful flowers'
//       />
//       <section>
//         <Carousel
//           items={displayedItems}
//           title='Bouquetes'
//           carouselDescription='Our valentine bouquetes are the perfect gift for your loved one.'
//           elementId='slider'
//           visibleClass='animate-slide-right'
//           hiddenClass='block'
//           limit={10}
//         />
//         <Carousel
//           items={displayedItems}
//           title='Flowers'
//           carouselDescription='Our valentine flowers are the perfect gift for your loved one.'
//           elementId='slider2'
//           visibleClass='animate-slide-right'
//           hiddenClass='block'
//           limit={10}
//         />
//       </section>
//     </div>
//   );
// }
