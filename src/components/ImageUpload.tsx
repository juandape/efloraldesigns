'use client';

import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { GetRole, token } from '@/components/GetRole';
import { buttonStyles, inputStyles, labelStyles } from '@/styles/Styles';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/flowers`;

const InitialForm = {
  imageName: '',
  image: [] as string[],
  videoName: '',
  video: [] as string[],
  ocassion: '',
};

export default function ImageUpload() {
  const [form, setForm] = useState(InitialForm);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const role = GetRole();

  const handleUpload = (e: { target: { name: string; files: FileList } }) => {
    const { name, files } = e.target;

    if (name === 'images') {
      setImageFiles(Array.from(files));
    } else if (name === 'video') {
      setVideoFiles(Array.from(files));
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const formData = new FormData();

    imageFiles.forEach((file) => {
      formData.append('files', file);
    });

    videoFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      if (role !== 'admin') {
        Swal.fire({
          title: 'You are not authorized to upload files',
          icon: 'error',
        });
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/api/upload/files`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-User-Role': role,
          },
        }
      );
      const result = response.data;

      const imageUrls = result
        .filter((item: any) => item.resource_type === 'image')
        .map((image: { secure_url: string }) => image.secure_url);

      const videoUrls = result
        .filter((item: any) => item.resource_type === 'video')
        .map((video: { secure_url: string }) => video.secure_url);

      const data = {
        ...form,
        image: imageUrls,
        video: videoUrls,
      };

      await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role,
        },
      });

      if (response.status === 200) {
        Swal.fire({
          title: 'Files uploaded successfully',
          icon: 'success',
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'An error occurred',
        icon: 'error',
      });
    }
  };

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | { target: { name: any; value: any; files?: FileList } }
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setForm({ ...form, [name]: value });

    if (files) {
      handleUpload({ target: { name, files } });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col w-96 sm:w-1/3 border mx-auto p-10 bg-white rounded-lg shadow-lg mb-10'
    >
      <label className={labelStyles}>Select images</label>
      <input
        type='file'
        name='images'
        onChange={handleChange}
        accept='image/*'
        className={inputStyles}
        multiple
      />
      <label className={labelStyles}>Name of the image</label>
      <input
        type='text'
        name='imageName'
        value={form.imageName}
        onChange={handleChange}
        className={inputStyles}
      />
      <label className={labelStyles}>Select videos</label>
      <input
        type='file'
        name='video'
        onChange={handleChange}
        accept='video/*'
        className={inputStyles}
        multiple
      />
      <label className={labelStyles}>Name of the video</label>
      <input
        type='text'
        name='videoName'
        value={form.videoName}
        onChange={handleChange}
        className={inputStyles}
      />
      <label className={labelStyles}>Ocassion Type</label>
      <select
        name='ocassion'
        onChange={handleChange}
        className={inputStyles}
        required
      >
        <option value='' hidden>
          Select ocassion
        </option>
        <option value='birthday'>Birthday</option>
        <option value='anniversary'>Anniversary</option>
        <option value='weddings'>Weddings</option>
        <option value='homepage'>HomePage</option>
      </select>
      <button type='submit' className={buttonStyles}>
        Upload
      </button>
    </form>
  );
}
