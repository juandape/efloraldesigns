'use client';

import HandleOccasion from '@/components/HandleOccasion';

const Christmas = () => {
  const subcategories = {
    Decorations:
      'Our Christmas decorations are the perfect gift for your loved one.',
    Gifts: 'Our Christmas gifts are the perfect gift for your loved one.',
  };

  return (
    <HandleOccasion
      occasion='christmas'
      headerImageSrc='https://res.cloudinary.com/dpvmwsbq8/image/upload/v1725034060/efloraldesigns/c1ba2e6a8db10b5b718c900c17105701.webp'
      headerImageAlt='Christmas'
      headerTitle='Christmas'
      headerText='Celebrate your Christmas with our beautiful flowers'
      subcategories={subcategories}
    />
  );
};

export default Christmas;


// 'use client';

// import { useEffect } from 'react';
// import TopHeader from '@/components/TopHeader';
// import Carousel from '@/components/Carousel';
// import { useFetchFlowersByOccasion } from '@/components/useFetchFlowersByOcassion';

// export default function Christmas() {
//   const { flowers, error } = useFetchFlowersByOccasion('christmas');

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
//         imageAlt='Christmas'
//         title='Christmas'
//         headerText='An unforgettable Christmas with our beautiful flowers'
//       />
//       <section>
//         <Carousel
//           items={displayedItems}
//           title='Bouquetes'
//           carouselDescription='Our Christmas bouquetes are the perfect gift for your loved one.'
//           elementId='slider'
//           visibleClass='animate-slide-right'
//           hiddenClass='block'
//           limit={10}
//         />
//         <Carousel
//           items={displayedItems}
//           title='Flowers'
//           carouselDescription='Our Christmas flowers are the perfect gift for your loved one.'
//           elementId='slider2'
//           visibleClass='animate-slide-right'
//           hiddenClass='block'
//           limit={10}
//         />
//       </section>
//     </div>
//   );
// }
