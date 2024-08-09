import Link from 'next/link';

export default function AdminTools() {
  return (
    <section className='p-6 rounded-xl'>
      <h2 className='text-2xl font-bold text-center text-blue-sky mb-2'>
        Admin Tools
      </h2>
      <hr className='border-blue-sky' />
      <div className='flex flex-col my-5'>
        <Link
          href='/admin-tools/users'
          className='bg-blue-sky text-white text-center py-2 rounded-xl my-2 hover:bg-blue-500'
        >
          Users
        </Link>
        <Link
          href='/admin-tools/products'
          className='bg-blue-sky text-white text-center py-2 rounded-xl my-2 hover:bg-blue-500'
        >
          ProductsZ
        </Link>
        <Link
          href='/admin-tools/orders'
          className='bg-blue-sky text-white text-center py-2 rounded-xl my-2 hover:bg-blue-500'
        >
          Orders
        </Link>
      </div>
    </section>
  );
}
