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
  ocassion?: string;
}

export default function MediaManager() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [editingMediaId, setEditingMediaId] = useState<string | null>(null);
  const [updatedName, setUpdatedName] = useState<string>('');
  const [updatedOcassion, setUpdatedOcassion] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>(''); // New state for search term
  const role = GetRole();

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
    setUpdatedName(media.imageName || media.videoName || ''); // Load current name
    setUpdatedOcassion(media.ocassion || ''); // Load current ocassion
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

    try {
      await axios.patch(
        `${url}/${editingMediaId}`,
        {
          imageName: updatedName,
          videoName: updatedName,
          ocassions: updatedOcassion,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-User-Role': role,
          },
        }
      );

      setMediaItems((prevItems) =>
        prevItems.map((item) =>
          item._id === editingMediaId
            ? { ...item, imageName: updatedName, videoName: updatedName } // Update only the name fields
            : item
        )
      );

      setEditingMediaId(null);
      setUpdatedName(''); // Reset input field

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUpdatedName(e.target.value);
    setUpdatedOcassion(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update search term state
  };

  // Filter media items based on search term
  const filteredMediaItems = mediaItems.filter(
    (media) =>
      media.imageName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      media.videoName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      media.ocassion?.toLowerCase().includes(searchTerm.toLowerCase())
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
            {media.type === 'video' ? (
              <video
                src={media.video}
                controls
                className='w-full h-auto mb-3'
              ></video>
            ) : (
              <img
                src={media.image}
                alt={media.imageName}
                className='w-80 mb-3 mx-auto'
              />
            )}

            <h3 className='mb-2 text-center'>
              <span className='font-bold'>Name:</span>{' '}
              {media.imageName || media.videoName}
            </h3>
            <h3 className='mb-5 text-center'>
              <span className='font-bold'>Ocassion:</span> {media.ocassion}
            </h3>

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
                <div className='ml-20'>
                  <label className='mr-12'>Edit Name</label>
                  <input
                    type='text'
                    value={updatedName}
                    onChange={handleChange}
                    className={inputStyles}
                  />
                </div>
                <div className='ml-20'>
                  <label className='mr-5'>Edit Ocassion</label>
                  <select
                    value={updatedOcassion}
                    onChange={handleChange}
                    className={`w-56 ${inputStyles}`}
                  >
                    <option value='anniversary'>Anniversary</option>
                    <option value='birthday'>Birthday</option>
                    <option value='weddings'>Wedding</option>
                  </select>
                </div>
                <div className='flex gap-4 w-60 mx-auto'>
                  <button onClick={handleUpdate} className={buttonStyles}>
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setEditingMediaId(null);
                      setUpdatedName(''); // Reset input field on cancel
                    }}
                    className={buttonStyles}
                  >
                    Cancel
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
