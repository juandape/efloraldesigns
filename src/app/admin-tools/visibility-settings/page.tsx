'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { GetRole, token } from '@/components/GetRole';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/visibility-settings`;
import Swal from 'sweetalert2';
import { buttonStyles, labelStyles } from '@/styles/Styles';
import { MdOutlineBackspace } from 'react-icons/md';

const AdminSettings = () => {
  interface Settings {
    showSpecialOccasions: boolean;
    dropdownItems: DropdownItem[];
  }
  const role = GetRole();

  const [settings, setSettings] = useState<Settings>({
    showSpecialOccasions: false,
    dropdownItems: [
      { name: "Valentine's Day", visible: false },
      { name: "Mother's Day", visible: false },
      { name: 'Christmas', visible: false },
    ],
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role,
        },
      });
      setSettings(response.data);
    };

    fetchSettings();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  interface DropdownItem {
    name: string;
    visible: boolean;
  }

  const handleDropdownChange = (index: number) => {
    const newDropdownItems: DropdownItem[] = [...settings.dropdownItems];
    newDropdownItems[index].visible = !newDropdownItems[index].visible;
    setSettings((prevSettings) => ({
      ...prevSettings,
      dropdownItems: newDropdownItems,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axios.post(url, settings, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-User-Role': role,
      },
    });
    Swal.fire('Success!', 'Settings saved successfully!', 'success');
    location.reload();
  };

  return (
    <div className='pb-10 bg-pink h-screen'>
      <a href='/admin-tools' className='absolute left-96 mt-10'>
        <MdOutlineBackspace className='text-3xl text-blue-sky hover:text-blue-600' />
      </a>
      <div className='flex items-center justify-center'>
        <h2 className='text-2xl xl:text-5xl mt-10 font-semibold w-80 xl:w-2/5 text-center rounded-xl py-4 sm:py-6 bg-gray-200 opacity-80 shadow-sm shadow-gray-400 animate-fadeIn'>
          Manage Visibility Settings
        </h2>
      </div>
      <p className='text-blue-sky text-base sm:text-3xl text-center my-20 mx-5 sm:mx-20 font-semibold'>
        Customize the visibility settings for special occasions
      </p>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col w-96 sm:w-1/3 border mx-auto p-10 bg-white rounded-lg shadow-lg mb-10'
      >
        <h3 className=' mb-5 text-2xl font-bold'>Tab:</h3>
        <div className='flex items-center'>
          <input
            type='checkbox'
            name='showSpecialOccasions'
            checked={settings.showSpecialOccasions}
            onChange={handleChange}
            className='-mt-2'
          />
          <label className={labelStyles}>Show "Special Occasions" tab</label>
        </div>

        <h3 className=' mb-5 mt-10 text-2xl font-bold'>Dropdown Items:</h3>
        {settings.dropdownItems.map((item, index) => (
          <div key={index} className='flex items-center mb-2'>
            <input
              type='checkbox'
              checked={item.visible}
              onChange={() => handleDropdownChange(index)}
              className='-mt-2'
            />
            <label className={labelStyles}>{item.name}</label>
          </div>
        ))}
        <button className={buttonStyles}>Save</button>
      </form>
    </div>
  );
};

export default AdminSettings;
