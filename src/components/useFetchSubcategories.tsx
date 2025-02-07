import { useState, useEffect } from 'react';
import axios from 'axios';
import { GetRole, token } from '@/components/GetRole';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/sub-categories`;

export const useFetchSubCategories = () => {
  const [occasions, setOccasions] = useState<any[]>([]);
  const role = GetRole();

  useEffect(() => {
    async function fetchSubcategories() {
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}`, 'X-User-Role': role },
        });

        if (Array.isArray(response.data?.subCategories)) {
          setOccasions(response.data.subCategories); // Guardar las ocasiones con sus subcategorías
        } else {
          setOccasions([]);
        }
      } catch (error) {
        console.error(error);
        setOccasions([]);
      }
    }

    fetchSubcategories();
  }, []);

  return occasions;
};

export default useFetchSubCategories;
