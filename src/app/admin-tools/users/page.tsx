'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { tableHeaderStyles, tableRowStyles } from '@/styles/Styles';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import Swal from 'sweetalert2';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/users`;

export interface User {
  _id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      return;
    }

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const usersData = response.data.users;
        if (Array.isArray(usersData)) {
          setUsers(usersData);
          console.log(usersData);
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
    const token = Cookies.get('token');
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
    const token = Cookies.get('token');
    if (!token) {
      return;
    }
  };

  return (
    <section className='p-6 h-screen'>
      <h2 className='text-2xl font-bold text-center text-blue-sky mb-2'>
        Registered Users
      </h2>
      <hr className='border-blue-sky w-60 mx-auto mb-10' />
      <div className='flex flex-col my-5 items-center'>
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
    </section>
  );
}
