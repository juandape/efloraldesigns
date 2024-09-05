'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { GetRole, token } from '@/components/GetRole';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/visibility-settings`;
import Swal from 'sweetalert2';

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Mostrar "Special Occasions":
        <input
          type='checkbox'
          name='showSpecialOccasions'
          checked={settings.showSpecialOccasions}
          onChange={handleChange}
        />
      </label>
      <h3>Items del dropdown:</h3>
      {settings.dropdownItems.map((item, index) => (
        <div key={index}>
          <label>
            {item.name}:
            <input
              type='checkbox'
              checked={item.visible}
              onChange={() => handleDropdownChange(index)}
            />
          </label>
        </div>
      ))}
      <button type='submit'>Guardar</button>
    </form>
  );
};

export default AdminSettings;
