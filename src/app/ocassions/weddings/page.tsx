'use client';

import HandleOccasion from '@/components/HandleOccasion';

const Weddings = () => {
  const subcategories = {
    Bouquets: 'Our wedding bouquets are the perfect gift for your loved one.',
    Decorations:
      'Our wedding decorations are the perfect touch for your celebration.',
  };

  return (
    <HandleOccasion
      occasion='weddings'
      headerImageSrc='https://res.cloudinary.com/dpvmwsbq8/image/upload/v1725034086/efloraldesigns/122282e1a1f1846019313044fedbdbfb.png'
      headerImageAlt='Weddings'
      headerTitle='Weddings'
      headerText='We have the perfect flowers for your special day'
      subcategories={subcategories}
    />
  );
};

export default Weddings;
