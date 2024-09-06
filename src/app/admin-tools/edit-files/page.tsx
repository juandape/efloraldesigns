import ImageEdit from '@/components/ImageEdit';
import { MdOutlineBackspace } from 'react-icons/md';

export default function EditFiles() {
  return (
    <div className='pb-10 bg-pink'>
      <a href='/admin-tools' className='absolute left-96 mt-10'>
        <MdOutlineBackspace className='text-3xl text-blue-sky hover:text-blue-600' />
      </a>
      <div className='flex items-center justify-center'>
        <h2 className='text-2xl xl:text-5xl mt-10 font-semibold w-80 xl:w-2/5 text-center rounded-xl py-4 sm:py-6 bg-gray-200 opacity-80 shadow-sm shadow-gray-400 animate-fadeIn'>
          Edit Files
        </h2>
      </div>
      <p className='text-base sm:text-3xl text-center my-20 mx-5 sm:mx-20 font-semibold'>
        Edit images and videos from the website
      </p>
        <ImageEdit />
    </div>
  );
}
