'use client';

import TopHeader from '../components/TopHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { GetRole, token } from '@/components/GetRole';
import { buttonStyles, labelStyles } from '@/styles/Styles';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/sub-categories`;

export default function SubCategories() {
  const role = GetRole();

  const [occasions, setOccasions] = useState<any[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<string>('');
  const [subCategories, setSubCategories] = useState<
    { name: string; description: string; _id?: string }[]
  >([]);
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [newSubcategoryDescription, setNewSubcategoryDescription] =
    useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}`, 'X-User-Role': role },
        });

        if (Array.isArray(response.data?.subCategories)) {
          setOccasions(response.data.subCategories);
        } else {
          setOccasions([]);
        }
      } catch (error: any) {
        setMessage(
          error.response?.data?.message || 'Error fetching subcategories'
        );
        setOccasions([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedOccasion) {
      // Filtrar todas las coincidencias de la ocasión seleccionada
      const filteredSubCategories = occasions
        .filter((o) => o.ocassion === selectedOccasion)
        .flatMap((o) => o.subCategories); // Aplanar el array

      setSubCategories(filteredSubCategories);
    }
  }, [selectedOccasion, occasions]);

  const handleOcassionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOccasion(e.target.value);
  };

  const handleSubcategoryChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedSubcategories = [...subCategories];
    updatedSubcategories[index] = {
      ...updatedSubcategories[index],
      [field]: value,
    };
    setSubCategories(updatedSubcategories);
  };

  const handleEditSubcategory = async (index: number) => {
    const subcategoryToUpdate = subCategories[index];

    console.log('selectedOccasion:', selectedOccasion);
    console.log('occasions:', occasions);

    // Buscar el _id correcto de la ocasión
    const selectedOccasionObj = occasions.find(
      (o) => o.ocassion === selectedOccasion || o.title === selectedOccasion
    );

    console.log('selectedOccasionObj:', selectedOccasionObj);

    if (!selectedOccasionObj?._id) {
      setMessage('Invalid occasion ID.');
      return;
    }

    if (!subcategoryToUpdate._id) {
      setMessage('Invalid subcategory ID.');
      return;
    }

    try {
      const urlToUpdate = `${url}/${selectedOccasionObj._id}/${subcategoryToUpdate._id}`;

      console.log('Updating subcategory:', { url: urlToUpdate });

      await axios.patch(
        urlToUpdate,
        {
          subCategories: [
            {
              _id: subcategoryToUpdate._id,
              name: subcategoryToUpdate.name.trim(),
              description: subcategoryToUpdate.description?.trim() || '',
            },
          ],
        },
        {
          headers: { Authorization: `Bearer ${token}`, 'X-User-Role': role },
        }
      );

      setMessage('Subcategory updated successfully');
    } catch (error: any) {
      console.error('Error updating subcategory:', error);
      setMessage(error.response?.data?.message || 'Error updating subcategory');
    }
  };

  const handleDeleteSubcategory = async (index: number) => {
    const subcategoryToDelete = subCategories[index];

    if (!subcategoryToDelete._id) {
      setSubCategories(subCategories.filter((_, i) => i !== index));
      return;
    }

    try {
      await axios.delete(
        `${url}/${selectedOccasion}/${subcategoryToDelete._id}`,
        {
          headers: { Authorization: `Bearer ${token}`, 'X-User-Role': role },
        }
      );

      setSubCategories(subCategories.filter((_, i) => i !== index));
      setMessage('Subcategory deleted successfully');
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      setMessage('Error deleting subcategory');
    }
  };

  const handleAddSubcategory = async () => {
    if (!selectedOccasion) {
      setMessage('Please select an occasion first.');
      return;
    }

    if (!newSubcategoryName.trim()) {
      setMessage('Subcategory name is required.');
      return;
    }

    try {
      const response = await axios.post(
        url,
        {
          occasion: selectedOccasion,
          subCategories: [
            {
              name: newSubcategoryName.trim(),
              description: newSubcategoryDescription?.trim() || '',
            },
          ],
        },
        { headers: { Authorization: `Bearer ${token}`, 'X-User-Role': role } }
      );

      // Obtener la nueva subcategoría creada desde la respuesta
      const newSubcategory = response.data.subCategories[0];

      // 🔹 Insertar la nueva subcategoría en el array de la ocasión seleccionada
      setSubCategories((prevSubCategories) => [
        ...prevSubCategories,
        newSubcategory,
      ]);

      // Limpiar campos
      setNewSubcategoryName('');
      setNewSubcategoryDescription('');
      setMessage('Subcategory added successfully.');
    } catch (error) {
      console.error('Error adding subcategory:', error);
      setMessage('Error adding subcategory.');
    }
  };

  return (
    <div className='relative p-6 bg-pink'>
      <TopHeader
        title='Sub Categories'
        headerText='Manage subcategories by occasion'
      />

      {role !== 'admin' ? (
        <p className='text-red-500'>
          You do not have permission to manage subcategories.
        </p>
      ) : (
        <form className='mt-6 space-y-4 bg-white p-4 rounded-lg shadow-md'>
          <div>
            <label className={labelStyles}>Occasion Name</label>
            <select
              value={selectedOccasion}
              onChange={handleOcassionChange}
              className='w-full p-2 border rounded-md'
              required
            >
              <option value='' hidden>
                Select Occasion
              </option>
              <option value='anniversary'>Anniversary</option>
              <option value='birthday'>Birthday</option>
              <option value='weddings'>Wedding</option>
              <option value='valentines'>Valentine's Day</option>
              <option value='christmas'>Christmas</option>
              <option value='mothers'>Mother's Day</option>
            </select>
          </div>

          {selectedOccasion && (
            <>
              <h3 className='text-lg font-semibold mt-4'>
                Subcategories for {selectedOccasion}
              </h3>
              {subCategories.map((subcategory, index) => (
                <div
                  key={index}
                  className='border p-4 rounded-md flex flex-col gap-2'
                >
                  <label className={labelStyles}>Subcategory Name</label>
                  <input
                    type='text'
                    value={subcategory.name}
                    onChange={(e) =>
                      handleSubcategoryChange(index, 'name', e.target.value)
                    }
                    className='w-full p-2 border rounded-md'
                    required
                  />

                  <label className={labelStyles}>Description (Optional)</label>
                  <textarea
                    value={subcategory.description}
                    onChange={(e) =>
                      handleSubcategoryChange(
                        index,
                        'description',
                        e.target.value
                      )
                    }
                    className='w-full p-2 border rounded-md'
                  />

                  <div className='flex gap-2'>
                    <button
                      type='button'
                      onClick={() => handleEditSubcategory(index)}
                      className='bg-blue-500 text-white px-3 py-1 rounded-md'
                    >
                      Save Changes
                    </button>
                    <button
                      type='button'
                      onClick={() => handleDeleteSubcategory(index)}
                      className='bg-red-500 text-white px-3 py-1 rounded-md'
                    >
                      Delete Subcategory
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
          {message && <p className='text-center text-green-600'>{message}</p>}
        </form>
      )}

      <div className='mt-6 p-4 bg-gray-100 rounded-lg'>
        <h3 className='text-lg font-semibold'>Add a New Subcategory</h3>

        <label className={labelStyles}>Subcategory Name</label>
        <input
          type='text'
          value={newSubcategoryName}
          onChange={(e) => setNewSubcategoryName(e.target.value)}
          className='w-full p-2 border rounded-md'
          required
        />

        <label className={labelStyles}>Description (Optional)</label>
        <textarea
          value={newSubcategoryDescription}
          onChange={(e) => setNewSubcategoryDescription(e.target.value)}
          className='w-full p-2 border rounded-md'
        />

        <button
          type='button'
          onClick={handleAddSubcategory}
          className='mt-3 bg-green-500 text-white px-3 py-2 rounded-md'
        >
          Add Subcategory
        </button>
      </div>
    </div>
  );
}
