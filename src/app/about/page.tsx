import TopHeader from '@/components/TopHeader';

export default function About() {
  return (
    <>
      <TopHeader
        imageSrc='https://res.cloudinary.com/dpvmwsbq8/image/upload/v1725034144/efloraldesigns/d3d3836b507ea90e0b716a52780d9c59.webp'
        imageAlt='About Us'
        title='About Us'
        headerText='We are a floral design company that specializes in creating unique and
        beautiful arrangements for all occasions. Our team of talented florists
        work hard to bring your vision to life and create stunning bouquets that
        will make your special day even more memorable.'
      />
      <section>
        <p className='text-center text-lg sm:text-2xl font-semibold my-10 mx-5 sm:mx-20'>
          At E Floral Designs, we believe that flowers are an essential part of
          any celebration. Whether you are planning a wedding, birthday party,
          or anniversary celebration, our team of expert florists will work with
          you to create the perfect arrangement for your special day. We take
          pride in our attention to detail and our commitment to providing
          exceptional customer service. Let us help you make your event
          unforgettable with our stunning floral designs.
        </p>
      </section>
    </>
  );
}
