export default function Footer() {
  return (
    <footer className='bg-black flex flex-col sm:flex-row w-full h-16 inset-0 justify-center items-center sm:justify-between text-white sm:text-sm text-xs sm:px-20'>
      <p>
        Copyright &copy; 2024
        <strong> E Floral Designs </strong>- Miami, Flo
        <a className='text-blue-sky'></a>
      </p>
      <p>
        Powered by{' '}
        <a href='https://juandape.dev' target='blank'>
          <span className='italic hover:text-ocre'>Juandape.dev</span>
        </a>
      </p>
    </footer>
  );
}
