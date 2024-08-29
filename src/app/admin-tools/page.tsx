import Link from 'next/link';
import { RiEdit2Line, RiImageEditFill, RiEditBoxLine } from 'react-icons/ri';

export default function AdminTools() {
  return (
    <section className='p-6 h-screen bg-pink'>
      <div className='flex flex-col my-5 border w-96 sm:w-1/3 mx-auto bg-white py-10 rounded-xl shadow-xl animate-slideUp mt-20'>
      <h2 className='text-2xl font-bold text-center text-blue-sky mb-2'>
        Admin Tools
      </h2>
      <hr className='border-blue-sky w-40 mx-auto mb-10' />
        <div className='mx-auto'>
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
