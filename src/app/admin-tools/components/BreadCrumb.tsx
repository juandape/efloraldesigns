import Link from 'next/link';

export default function BreadCrumb({ name }: { name: string }) {
  if (name === 'Admin Tools') {
    return (
      <nav className='flex mt-4 z-[9999]'>
        <Link href='/' className='hover:underline ml-6 text-xs cursor-pointer'>
          Home
        </Link>
        <span className='mx-2 text-xs'>/</span>
        <span className='text-gray-800 text-xs'>{name}</span>
      </nav>
    );
  }

  return (
    <nav className='flex mt-4 z-[9999]'>
      <Link href='/' className='hover:underline ml-6 text-xs cursor-pointer'>
        Home
      </Link>
      <span className='mx-2 text-xs'>/</span>
      <Link
        href='/admin-tools'
        className='hover:underline text-xs cursor-pointer'
      >
        Admin Tools
      </Link>
      <span className='mx-2 text-xs'>/</span>
      <span className='text-gray-800 text-xs'>{name}</span>
    </nav>
  );
}
