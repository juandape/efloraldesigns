'use client';

import HandleOccasion from '@/components/HandleOccasion';

const Mothers = () => {
  const subcategories = {
    Flowers: 'Our Mothers decorations are the perfect gift for your loved one.',
    Gifts: 'Our Mothers gifts are the perfect gift for your loved one.',
  };

  return (
    <HandleOccasion
      occasion='mothers'
      headerImageSrc='https://res.cloudinary.com/dpvmwsbq8/image/upload/v1725034060/efloraldesigns/c1ba2e6a8db10b5b718c900c17105701.webp'
      headerImageAlt="Mother's Day"
      headerTitle="Mother's Day"
      headerText='Celebrate your Mothers with our beautiful flowers'
      subcategories={subcategories}
    />
  );
};

export default Mothers;
