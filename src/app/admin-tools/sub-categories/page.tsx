'use client';

import TopHeader from '../components/TopHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { GetRole, token } from '@/components/GetRole';
import { buttonStyles, labelStyles } from '@/styles/Styles';
import Swal from 'sweetalert2';

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
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error fetching subcategories',
        })
        setOccasions([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedOccasion) {
      // Filtrar todas las coincidencias de la ocasión seleccionada
      const filteredSubCategories = occasions
        .filter((o) => o.occasion === selectedOccasion)
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

    // Buscar el _id correcto de la ocasión
    const selectedOccasionObj = occasions.find(
      (o) => o.occasion === selectedOccasion || o.title === selectedOccasion
    );

    if (!selectedOccasionObj?._id) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid occasion ID',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (!subcategoryToUpdate._id) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid subcategory ID',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      const urlToUpdate = `${url}/${selectedOccasionObj._id}/${subcategoryToUpdate._id}`;

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

      Swal.fire({
        icon: 'success',
        title: 'Subcategory updated successfully',
        showConfirmButton: false,
        timer: 1500,
      });

      // Actualizar la subcategoría en la lista de subcategorías
      setSubCategories((prevSubCategories) => {
        const updatedSubCategories = [...prevSubCategories];
        updatedSubCategories[index] = subcategoryToUpdate;
        return updatedSubCategories;
      });
    } catch (error: unknown | Error) {
      console.error('Error updating subcategory:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error updating subcategory',
      });
    }
  };

  const handleDeleteSubcategory = async (index: number) => {
    const subcategoryToDelete = subCategories[index];
    const selectedOccasionObj = occasions.find(
      (o) => o.occasion === selectedOccasion || o.title === selectedOccasion
    );

    if (!selectedOccasionObj?._id) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid occasion ID',
        text: 'Please select a valid occasion.',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (!subcategoryToDelete?._id) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid subcategory ID',
        text: 'The selected subcategory is not valid.',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // 🔴 Mover la confirmación antes de hacer la petición
    const result = await Swal.fire({
      title: 'Are you sure you want to delete this subcategory?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) {
      return; // Si el usuario cancela, no hacer nada
    }

    try {
      const urlToDelete = `${url}/${selectedOccasionObj._id}/${subcategoryToDelete._id}`;

      await axios.delete(urlToDelete, {
        headers: { Authorization: `Bearer ${token}`, 'X-User-Role': role },
      });

      // 🔵 Solo mostrar mensaje de éxito si la eliminación fue exitosa
      setSubCategories((prevSubCategories) =>
        prevSubCategories.filter((_, i) => i !== index)
      );

      Swal.fire({
        icon: 'success',
        title: 'Subcategory deleted successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error deleting subcategory',
        text: 'An error occurred while trying to delete the subcategory. Please try again later.',
      });
    }
  };

  const handleAddSubcategory = async () => {
    if (!selectedOccasion) {
      Swal.fire({
        icon: 'error',
        title: 'Please select an occasion',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (!newSubcategoryName.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Please enter a subcategory name',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      const response = await axios.post(
        url,
        {
          occasion: selectedOccasion,
          subCategories: [
            {
              name: newSubcategoryName,
              description: newSubcategoryDescription,
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
      Swal.fire({
        icon: 'success',
        title: 'Subcategory added successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.reload();
    } catch (error) {
      console.error('Error adding subcategory:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error adding subcategory',
      });
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
