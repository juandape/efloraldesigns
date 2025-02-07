'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { GetRole, token } from '@/components/GetRole';
import { buttonStyles, inputStyles, labelStyles } from '@/styles/Styles';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/flowers`;

interface MediaItem {
  _id: string;
  type: 'image' | 'video';
  image?: string;
  imageName?: string;
  video?: string;
  videoName?: string;
  occasion?: string;
  subcategory?: string;
  position?: number;
  description?: string;
}

export default function MediaManager() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [editingMediaId, setEditingMediaId] = useState<string | null>(null);
  const [updatedImageName, setUpdatedImageName] = useState<string>('');
  const [updatedVideoName, setUpdatedVideoName] = useState<string>('');
  const [updatedOccasion, setUpdatedOccasion] = useState<string>('');
  const [updatedPosition, setUpdatedPosition] = useState<number>(1);
  const [updatedDescription, setUpdatedDescription] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [updatedSubcategory, setUpdatedSubcategory] = useState<string>('');
  const [occasions, setOccasions] = useState<any[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<string>('');
  const [subCategories, setSubCategories] = useState<
    { name: string; description: string; _id?: string }[]
  >([]);

  const role = GetRole();

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/sub-categories`, {
          headers: { Authorization: `Bearer ${token}`, 'X-User-Role': role },
        });

        if (Array.isArray(response.data?.subCategories)) {
          setOccasions(response.data.subCategories); // Guardar las ocasiones con sus subcategorías
        } else {
          setOccasions([]);
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error fetching subcategories',
        });
        setOccasions([]);
      }
    };

    fetchSubcategories();
  }, []);

  useEffect(() => {
    // Verificar que selectedOccasion no esté vacío
    if (selectedOccasion) {
      const occasion = occasions.find(
        (occasion) =>
          occasion.occasion === selectedOccasion ||
          occasion.title === selectedOccasion
      );

      // Verificar que se encontró la ocasión y luego establecer subcategorías
      if (occasion) {
        setSubCategories(occasion.subCategories);
      } else {
        setSubCategories([]); // Si no se encuentra la ocasión, limpiar las subcategorías
      }
    } else {
      setSubCategories([]); // Si no hay ocasión seleccionada, limpiar las subcategorías
    }
  }, [selectedOccasion, occasions]);

  useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-User-Role': role,
          },
        });
        setMediaItems(response.data.flowers);
      } catch (error) {
        Swal.fire({
          title: 'Error fetching media',
          icon: 'error',
        });
      }
    };

    fetchMediaItems();
  }, [role]);

  const handleEdit = (media: MediaItem) => {
    setEditingMediaId(media._id);
    setUpdatedImageName(media.imageName || '');
    setUpdatedVideoName(media.videoName || '');
    setSelectedOccasion(media.occasion || '');
    setUpdatedOccasion(media.occasion || '');
    setUpdatedPosition(media.position || 1);
    setUpdatedDescription(media.description || '');
    setUpdatedSubcategory(media.subcategory || '');
  };

  const handleDelete = async (mediaId: string) => {
    try {
      if (role !== 'admin') {
        Swal.fire({
          title: 'You are not authorized to delete files',
          icon: 'error',
        });
        return;
      }

      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      });

      if (result.isConfirmed) {
        await axios.delete(`${url}/${mediaId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-User-Role': role,
          },
        });

        setMediaItems(mediaItems.filter((item) => item._id !== mediaId));

        Swal.fire({
          title: 'Media deleted successfully',
          icon: 'success',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error deleting media',
        icon: 'error',
      });
    }
  };

  const handleUpdate = async () => {
    if (!editingMediaId) return;

    const FormData = {
      imageName: updatedImageName,
      videoName: updatedVideoName,
      occasion: updatedOccasion,
      subcategory: updatedSubcategory,
      position: updatedPosition,
      description: updatedDescription,
    };

    try {
      await axios.patch(`${url}/${editingMediaId}`, FormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role,
        },
      });

      setMediaItems((prevItems) =>
        prevItems.map((item) =>
          item._id === editingMediaId
            ? {
                ...item,
                imageName: updatedImageName,
                videoName: updatedVideoName,
                occasion: updatedOccasion,
                subcategory: updatedSubcategory,
                position: updatedPosition,
                description: updatedDescription,
              }
            : item
        )
      );

      setEditingMediaId(null);
      setUpdatedImageName('');
      setUpdatedVideoName('');
      setUpdatedOccasion('');
      setUpdatedPosition(1);
      setUpdatedDescription('');
      setUpdatedSubcategory('');

      Swal.fire({
        title: 'Media updated successfully',
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error updating media',
        icon: 'error',
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === 'occasion') {
      setSelectedOccasion(value);
      setUpdatedSubcategory(''); // Reset subcategory when occasion changes
    } else if (name === 'subcategory') {
      setUpdatedSubcategory(value);
    } else if (name === 'imageName') {
      setUpdatedImageName(value);
    } else if (name === 'videoName') {
      setUpdatedVideoName(value);
    } else if (name === 'position') {
      setUpdatedPosition(Number(value));
    } else if (name === 'description') {
      setUpdatedDescription(value);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredMediaItems = mediaItems.filter(
    (media) =>
      media.imageName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      media.videoName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      media.occasion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='media-manager'>
      <div className='search-bar mb-4 text-center'>
        <input
          type='text'
          placeholder='Search by name or occasion'
          value={searchTerm}
          onChange={handleSearchChange}
          className={`w-80 ${inputStyles}`}
        />
      </div>
      <div className='media-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-5'>
        {filteredMediaItems.map((media) => (
          <div
            key={media._id}
            className='media-item border p-4 rounded-lg shadow-lg'
          >
            {media.videoName ? (
              <video
                src={media.video}
                controls
                className='w-80 mx-auto mb-3'
              ></video>
            ) : (
              <img
                src={media.image}
                alt={media.imageName}
                className='w-80 mb-3 mx-auto'
              />
            )}
            <div className='mx-auto w-80'>
              <h3 className='mb-2'>
                <span className='font-bold'>Name:</span>{' '}
                {media.imageName || media.videoName}
              </h3>
              <h3 className='mb-2'>
                <span className='font-bold'>Occasion:</span> {media.occasion}
              </h3>
              <h3 className='mb-5'>
                <span className='font-bold'>Subcategory:</span>{' '}
                {media.subcategory}
              </h3>
            </div>

            <div className='flex gap-4 w-60 mx-auto'>
              {editingMediaId !== media._id && (
                <>
                  <button
                    onClick={() => handleEdit(media)}
                    className={buttonStyles}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(media._id)}
                    className={`bg-red-600 hover:border-red-600 hover:text-red-600 ${buttonStyles}`}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>

            {editingMediaId === media._id && (
              <div className='edit-media mt-4'>
                <div className='flex flex-col mx-5 sm:mx-10'>
                  <label className={labelStyles}>Occasion</label>
                  <select
                    name='occasion'
                    value={selectedOccasion}
                    onChange={handleChange}
                    className={inputStyles}
                  >
                    <option value=''>Select occasion</option>
                    {occasions.map((occasion) => (
                      <option key={occasion._id} value={occasion.occasion}>
                        {occasion.occasion}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='flex flex-col mx-5 sm:mx-10'>
                  <label className={labelStyles}>Subcategory</label>
                  <select
                    name='subcategory'
                    value={updatedSubcategory}
                    onChange={handleChange}
                    className={inputStyles}
                    disabled={!selectedOccasion}
                  >
                    <option value=''>Select subcategory</option>
                    {subCategories.length > 0 ? (
                      subCategories.map((subcategory) => (
                        <option key={subcategory._id} value={subcategory.name}>
                          {subcategory.name}
                        </option>
                      ))
                    ) : (
                      <option value='' disabled>
                        No subcategories available
                      </option>
                    )}
                  </select>
                </div>
                <div className='flex flex-col mx-5 sm:mx-10'>
                  <label className={labelStyles}>Position</label>
                  <input
                    type='number'
                    name='position'
                    value={updatedPosition}
                    onChange={handleChange}
                    className={inputStyles}
                  />
                </div>
                <div className='flex flex-col mx-5 sm:mx-10'>
                  <label className={labelStyles}>Description</label>
                  <textarea
                    name='description'
                    value={updatedDescription}
                    onChange={handleChange}
                    className={inputStyles}
                  />
                </div>
                <div className='text-center'>
                  <button
                    onClick={handleUpdate}
                    className={`mt-5 ${buttonStyles}`}
                  >
                    Update
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
