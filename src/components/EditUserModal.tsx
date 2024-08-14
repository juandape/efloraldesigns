import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { inputStyles, labelStyles } from '@/styles/Styles';

export interface User {
  _id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onUpdate: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  onClose,
  onUpdate,
}) => {
  const [editedUser, setEditedUser] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${BASE_URL}/api/users/`;

  const handleSave = () => {
    const token = Cookies.get('token');
    if (!token) {
      return;
    }

    axios
      .patch(`${url}/${user._id}`, editedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        onUpdate(response.data);
        Swal.fire('Updated!', 'The user has been updated.', 'success');
        onClose();
      })
      .catch((error) => {
        console.error(error);
        Swal.fire('Error', 'There was an issue updating the user.', 'error');
      });
  };

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96 animate-fadeIn'>
        <h3 className='text-lg font-semibold text-blue-sky text-center'>
          Edit User
        </h3>
        <hr className='border border-blue-sky w-40 mx-auto mb-5' />
        <div className='mb-4 flex flex-col'>
          <label className={labelStyles}>Name</label>
          <input
            type='text'
            value={editedUser.name}
            onChange={(e) =>
              setEditedUser({ ...editedUser, name: e.target.value })
            }
            className={inputStyles}
          />
        </div>
        <div className='mb-4 flex flex-col'>
          <label className={labelStyles}>Email</label>
          <input
            type='email'
            value={editedUser.email}
            onChange={(e) =>
              setEditedUser({ ...editedUser, email: e.target.value })
            }
            className={inputStyles}
          />
        </div>
        <div className='mb-4 flex flex-col'>
          <label className={labelStyles}>Phone</label>
          <input
            type='text'
            value={editedUser.phone}
            onChange={(e) =>
              setEditedUser({ ...editedUser, phone: e.target.value })
            }
            className={inputStyles}
          />
        </div>
        <div className='flex gap-5 justify-center'>
          <button
            className='w-32 bg-blue-sky hover:border hover:text-blue-sky hover:bg-gray-100 hover:border-blue-sky text-white py-3 px-2 rounded-xl transition duration-300'
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className='w-32 bg-gray-400 hover:border hover:text-gray-600 hover:bg-gray-100 hover:border-gray-600 text-white py-3 px-2 rounded-xl transition duration-300'
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
