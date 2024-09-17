'use client';

import HandleOccasion from '@/components/HandleOccasion';

const Weddings = () => {
  const subcategories = {
    Boutonnieres: '',
    Bouquetes: '',
    Corsages: '',
    Ceremony: '',
    'Runners Arches': '',
    Huppah: '',
    Cocktails: '',
    'Sign in Table': '',
    'Seatings Assignments': '',
    'Desserts Table': '',
    'Cake Table': '',
    'Bar Arrangements': '',
    'Ceiling Structures': '',
    'Sweetheart Table': '',
    'Guest Tables': '',
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
