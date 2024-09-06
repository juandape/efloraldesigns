'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { GetRole, token } from '@/components/GetRole';
import { buttonStyles, labelStyles } from '@/styles/Styles';
import { MdOutlineBackspace } from 'react-icons/md';
import TopHeader from '../components/TopHeader';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/visibility-settings`;

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
      const response = await axios.get(url);
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
    location.reload();
  };

  return (
    <div className='relative p-6 bg-pink'>
      <TopHeader
        title='Manage Visibility Settings'
        headerText='Customize the visibility settings for special occasions'
      />

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
            className='-mt-2 w-4 h-4 transition duration-300'
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
              className='-mt-2 w-4 h-4 transition duration-300'
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
