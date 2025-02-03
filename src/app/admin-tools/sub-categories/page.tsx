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

  const [ocassions, setOcassions] = useState<any[]>([]);
  const [selectedOcassion, setSelectedOcassion] = useState<string>('');
  const [subCategories, setSubCategories] = useState<
    { name: string; description: string; _id?: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}`, 'X-User-Role': role },
        });

        if (Array.isArray(response.data?.subCategories)) {
          setOcassions(response.data.subCategories);
        } else {
          setOcassions([]);
        }
      } catch (error: any) {
        setMessage(
          error.response?.data?.message || 'Error fetching subcategories'
        );
        setOcassions([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const selected = ocassions.find((o) => o.ocassion === selectedOcassion);
    setSubCategories(selected ? selected.subCategories : []);
  }, [selectedOcassion, ocassions]);

  const handleOcassionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOcassion(e.target.value);
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

    try {
      if (subcategoryToUpdate._id) {
        // Editar una subcategoría existente
        const response = await axios.patch(
          `${url}/${subcategoryToUpdate._id}`,
          {
            ocassion: selectedOcassion,
            subCategories: [
              {
                name: subcategoryToUpdate.name,
                description: subcategoryToUpdate.description,
              },
            ],
          },
          {
            headers: { Authorization: `Bearer ${token}`, 'X-User-Role': role },
          }
        );
        console.log('Updated:', response.data);
      } else {
        // Crear una nueva subcategoría
        const response = await axios.post(
          url,
          {
            ocassion: selectedOcassion,
            subCategories: [
              {
                name: subcategoryToUpdate.name,
                description: subcategoryToUpdate.description,
              },
            ],
          },

          {
            headers: { Authorization: `Bearer ${token}`, 'X-User-Role': role },
          }
        );
        console.log('Created:', response.data);

        // Actualizar la subcategoría con el _id devuelto
        const newSubCategories = [...subCategories];
        newSubCategories[index] = { ...response.data };
        setSubCategories(newSubCategories);
      }
    } catch (error) {
      console.error('Error saving subcategory:', error);
    }
  };

  const handleDeleteSubcategory = async (index: number) => {
    const subcategoryToDelete = subCategories[index];

    if (!subcategoryToDelete._id) {
      // Si no tiene _id, solo eliminar del estado local
      setSubCategories(subCategories.filter((_, i) => i !== index));
      return;
    }

    try {
      await axios.delete(`${url}/${subcategoryToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}`, 'X-User-Role': role },
      });
      setSubCategories(subCategories.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  };

  const handleAddSubcategory = () => {
    setSubCategories([...subCategories, { name: '', description: '' }]);
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
              value={selectedOcassion}
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

          {selectedOcassion && (
            <>
              <h3 className='text-lg font-semibold mt-4'>
                Subcategories for {selectedOcassion}
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
                    {subcategory._id ? (
                      <button
                        type='button'
                        onClick={() => handleEditSubcategory(index)}
                        className='bg-blue-500 text-white px-3 py-1 rounded-md'
                      >
                        Save Changes
                      </button>
                    ) : (
                      <button
                        type='button'
                        onClick={() => handleEditSubcategory(index)}
                        className='bg-green-500 text-white px-3 py-1 rounded-md'
                      >
                        Save New Category
                      </button>
                    )}

                    {subcategory._id && (
                      <button
                        type='button'
                        onClick={() => handleDeleteSubcategory(index)}
                        className='bg-red-500 text-white px-3 py-1 rounded-md'
                      >
                        Delete Subcategory
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                type='button'
                onClick={handleAddSubcategory}
                className={buttonStyles}
              >
                Add New Subcategory
              </button>
            </>
          )}

          {message && <p className='text-center text-green-600'>{message}</p>}
        </form>
      )}
    </div>
  );
}
