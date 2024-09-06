'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GetRole, token } from '@/components/GetRole';
import { tableHeaderStyles, tableRowStyles } from '@/styles/Styles';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import EditUserModal, { User } from '@/components/EditUserModal';
import { MdOutlineBackspace } from 'react-icons/md';
import TopHeader from '../components/TopHeader';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/users`;

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const role = GetRole();

  useEffect(() => {
    if (!token) {
      return;
    }

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role,
        },
      })
      .then((response) => {
        const usersData = response.data.users;
        if (Array.isArray(usersData)) {
          setUsers(usersData);
        } else {
          console.error('Unexpected data format:', response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDelete = (userId: number) => {
    console.log('delete', userId);
    if (!token) {
      return;
    }
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this user!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${url}/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
                'X-User-Role': role,
              },
            })
            .then(() => {
              setUsers((prevUsers) =>
                prevUsers.filter((user) => user._id !== userId)
              );
              Swal.fire('Deleted!', 'The user has been deleted.', 'success');
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'The user is safe :)', 'error');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (userId: number) => {
    const user = users.find((user) => user._id === userId);
    if (user) {
      setCurrentUser(user);
      setShowEditModal(true);
    }
  };

  const handleSave = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
  };

  return (
    <div className='relative p-6 h-screen bg-pink'>
      <TopHeader
        title='Registered Users'
        headerText='View and edit all registered users'
      />
      <div className='flex flex-col my-5 items-start sm:items-center overflow-x-auto'>
        <div className='flex'>
          <div className={tableHeaderStyles}>User</div>
          <div className={tableHeaderStyles}>Email</div>
          <div className={tableHeaderStyles}>Phone</div>
          <div className={tableHeaderStyles}>Created At</div>
          <div className='px-4 py-3 border w-28 text-sm font-medium text-gray-900 bg-gray-50'>
            Actions
          </div>
        </div>
        {Array.isArray(users) &&
          users.map((user) => (
            <div key={user._id} className='bg-white flex items-center'>
              <div className={tableRowStyles}>{user.name}</div>
              <a href={`mailto:${user.email}`} className={tableRowStyles}>
                {user.email}
              </a>
              <div className={tableRowStyles}>{user.phone}</div>
              <div className={tableRowStyles}>{formatDate(user.createdAt)}</div>
              <div className='py-3 px-6 w-28 border text-left text-sm text-gray-500 flex gap-5'>
                <span
                  className='text-blue-sky cursor-pointer text-xl hover:text-blue-500'
                  onClick={() => handleEdit(user._id)}
                >
                  <RiEdit2Line />
                </span>
                <span
                  className='text-red-500 cursor-pointer text-xl hover:text-red-700'
                  onClick={() => handleDelete(user._id)}
                >
                  <RiDeleteBinLine />
                </span>
              </div>
            </div>
          ))}
      </div>
      {showEditModal && currentUser && (
        <EditUserModal
          user={currentUser}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleSave}
        />
      )}
    </div>
  );
}
