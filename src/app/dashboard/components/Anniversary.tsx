'use client';

import React, { useEffect } from 'react';
import Carousel from '@/components/Carousel';
import axios from 'axios';
import { token, GetRole } from '@/components/GetRole';
import Swal from 'sweetalert2';
import flor9 from '@/images/flores/flor9.webp';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/flowers`;

interface Flower {
  imageName: string;
  ocassion: string;
  image: string;
}

const Anniversary: React.FC = () => {
  const [flowers, setFlowers] = React.useState<Flower[]>([]);
  const role = GetRole();

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await axios.get(url);
        setFlowers(response.data.flowers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFlowers();
  }, []);

  const flowersItems = flowers
    .filter((flower) => flower.ocassion === 'anniversary') // Filter by ocassion
    .slice(0, 4) // Show only 4 items
    .map((flower) => {
      return {
        name: flower.imageName,
        image: flower.image,
      };
    });

  return (
    <Carousel
      items={flowersItems}
      title='Anniversary'
      elementId='slider'
      visibleClass='animate-slide-right'
      hiddenClass='block'
    />
  );
};

export default Anniversary;
