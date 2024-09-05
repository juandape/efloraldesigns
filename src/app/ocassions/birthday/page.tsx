'use client';

import HandleOccasion from '@/components/HandleOccasion';

const Birthday = () => {
  const subcategories = {
    'Party Supplies':
      'Our birthday party supplies are the perfect gift for your loved one.',
    Gifts: 'Our Birthday gifts are the perfect gift for your loved one.',
  };

  return (
    <HandleOccasion
      occasion='birthday'
      headerImageSrc='https://res.cloudinary.com/dpvmwsbq8/image/upload/v1725035176/efloraldesigns/birthdaybanner_p3qvyh.jpg'
      headerImageAlt='Birthday'
      headerTitle='Birthday'
      headerText='Celebrate your Birthday with our beautiful flowers'
      subcategories={subcategories}
    />
  );
};

export default Birthday;