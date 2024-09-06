import Link from 'next/link';

export default function BreadCrumb({ name }: { name: string }) {
  if (name === 'E FLORAL DESIGNS') {
    return null;
  }
  return (
    <nav className='flex mt-4 z-[9999]'>
      <Link href='/' className='hover:underline ml-6 text-xs cursor-pointer transition duration-300'>
        Home
      </Link>
      <span className='mx-2 text-xs'>/</span>
      <span className='text-gray-800 text-xs'>{name}</span>
    </nav>
  );
}
