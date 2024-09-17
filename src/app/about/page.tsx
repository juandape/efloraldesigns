import TopHeader from '@/components/TopHeader';

export default function About() {
  return (
    <>
      <TopHeader
        imageSrc='https://res.cloudinary.com/dpvmwsbq8/image/upload/v1725034144/efloraldesigns/d3d3836b507ea90e0b716a52780d9c59.webp'
        imageAlt='About Us'
        title='About Us'
        headerText=''
      />
      <section className='mb-20'>
        <p className='text-justify text-lg sm:text-2xl font-semibold my-10 mx-5 sm:mx-20'>
          Eudely our design director, has led our team with her talent and years
          of experience in the world of floral designs. Her ability to create
          completely unique and creative floral designs sets her apart in the
          design field.
        </p>
        <p className='text-justify text-lg sm:text-2xl font-semibold my-10 mx-5 sm:mx-20'>
          Eudely is known for her innovative approach and her capacity to
          transform flowers into true works of art.
        </p>
        <p className='text-justify text-lg sm:text-2xl font-semibold my-10 mx-5 sm:mx-20'>
          Eudely will design and create your florals for your special occasion,
          always striving to translate your floral ideas into exquisite floral
          designs. Her designs will not only enhance but bring life to the
          surroundings where they are used. Always using the best and freshest
          flowers to make your occasion more special.
        </p>
      </section>
    </>
  );
}
