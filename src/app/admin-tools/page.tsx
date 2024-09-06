import Link from 'next/link';
import {
  RiEdit2Line,
  RiImageEditFill,
  RiEditBoxLine,
  RiFileUploadFill,
} from 'react-icons/ri';
import TopHeader from './components/TopHeader';

export default function AdminTools() {
  return (
    <section className='relative h-screen p-6 bg-pink'>
      <TopHeader
        title='Admin Tools'
      />
      <div className='flex flex-col my-5 border w-96 sm:w-1/3 mx-auto bg-white py-10 rounded-xl shadow-xl animate-slideUp mt-20'>
        <p className='text-base sm:text-3xl text-center mt-5 mb-2 mx-5 sm:mx-20 font-semibold'>
          Manage your website
        </p>
        <hr className='mb-10 w-60 sm:w-96 mx-auto' />
        <div className='mx-auto sm:text-xl'>
          <Link
            href='/admin-tools/users'
            className='flex gap-3 mb-2 hover:text-blue-sky transition duration-300'
          >
            <RiEdit2Line className='text-2xl ml-2' />
            <p>View and edit all registered users</p>
          </Link>
          <Link
            href='/admin-tools/contact-messages'
            className='flex gap-3 mb-2 hover:text-blue-sky transition duration-300'
          >
            <RiEditBoxLine className='text-2xl ml-2' />
            <p>View and edit all contact messages</p>
          </Link>
          <Link
            href='/admin-tools/upload-files'
            className='flex gap-3 mb-2 hover:text-blue-sky transition duration-300'
          >
            <RiFileUploadFill className='text-2xl ml-2' />
            <p>Upload Images and videos</p>
          </Link>
          <Link
            href='/admin-tools/edit-files'
            className='flex gap-3 mb-2 hover:text-blue-sky transition duration-300'
          >
            <RiImageEditFill className='text-2xl ml-2' />
            <p>Edit Images and videos</p>
          </Link>
          <Link
            href='/admin-tools/visibility-settings'
            className='flex gap-3 mb-2 hover:text-blue-sky transition duration-300'
          >
            <RiEdit2Line className='text-2xl ml-2' />
            <p>Visibility settings for special ocassions</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
