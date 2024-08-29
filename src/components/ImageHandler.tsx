'use client';

import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { GetRole } from './GetRole';
import { buttonStyles, inputStyles, labelStyles } from '@/styles/Styles';
import Cookies from 'js-cookie';

const token = Cookies.get('token');

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/flowers`;

const InitialForm = {
  imageName: '',
  image: [] as string[],
  ocassion: '',
};

export default function ImageHandler() {
  const [form, setForm] = useState(InitialForm);
  const [files, setFiles] = useState([]);
  const role = GetRole();

  const handleUpload = (e: { target: { files: any } }) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      if (role !== 'admin') {
        Swal.fire({
          title: 'You are not authorized to upload images',
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

      const imageUrl = result.map(
        (image: { secure_url: string }) => image.secure_url
      );

      const data = {
        ...form,
        image: [...imageUrl],
      };

      await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role,
        },
      });

      Swal.fire({
        title: 'Image uploaded successfully',
        icon: 'success',
      });
      setForm(InitialForm);
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

    if (name === 'images' && files) {
      handleUpload({ target: { files } });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col w-1/2 border mx-auto p-10'
      >
        <label className={labelStyles}>Select images</label>
        <input
          type='file'
          name='images'
          onChange={handleChange}
          accept='image/*'
          className={inputStyles}
        />
        <label className={labelStyles}>Name of the image</label>
        <input
          type='text'
          name='imageName'
          value={form.imageName}
          onChange={handleChange}
          className={inputStyles}
        />
        <label className={labelStyles}>Ocassion Type</label>
        <select name='ocassion' onChange={handleChange} className={inputStyles}>
          <option value='Select ocassion' hidden>
            Select ocassion
          </option>
          <option value='birthday'>Birthday</option>
          <option value='anniversary'>Anniversary</option>
          <option value='weddings'>Weddings</option>
        </select>
        <button type='submit' className={buttonStyles}>
          Upload
        </button>
      </form>
    </div>
  );
}
