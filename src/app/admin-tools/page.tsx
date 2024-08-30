import Link from 'next/link';
import { RiEdit2Line, RiImageEditFill, RiEditBoxLine } from 'react-icons/ri';

export default function AdminTools() {
  return (
    <section className='p-6 h-screen bg-pink'>
      <div className='flex items-center justify-center'>
        <h2 className='text-2xl xl:text-5xl mt-10 font-semibold w-80 xl:w-2/5 text-center rounded-xl py-4 sm:py-6 bg-gray-200 opacity-80 shadow-sm shadow-gray-400 animate-fadeIn'>
          Admin Tools
        </h2>
      </div>
      <div className='flex flex-col my-5 border w-96 sm:w-1/3 mx-auto bg-white py-10 rounded-xl shadow-xl animate-slideUp mt-20'>
      <p className='text-blue-sky text-base sm:text-3xl text-center mt-5 mb-2 mx-5 sm:mx-20 font-semibold'>
        Manage your website
        </p>
        <hr className='border-blue-sky mb-10 w-60 sm:w-96 mx-auto'/>
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
            <RiImageEditFill className='text-2xl ml-2' />
            <p>Upload Images and videos</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
