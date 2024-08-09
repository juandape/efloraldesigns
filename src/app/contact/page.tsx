import TopHeader from '../../components/TopHeader';
import contact from '../../images/contact.jpg';

export default function Contact() {
  return (
    <>
      <TopHeader
        imageSrc={contact.src}
        imageAlt='Contact Us'
        title='Contact Us'
        headerText='We would love to hear from you! Please feel free to reach out to us with any questions or comments you may have.'
      />
      <section>
        <form className='flex flex-col w-96 sm:w-1/3 justify-center mx-auto border rounded-2xl p-6 shadow-xl'>
          <label htmlFor='name' className='ml-5 mb-2 text-blue-sky font-bold'>
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='bg-gray-100 py-3 rounded-lg mb-5 pl-3'
            placeholder='Jhon Doe'
          />
          <label htmlFor='email' className='ml-5 mb-2 text-blue-sky font-bold'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='bg-gray-100 py-3 rounded-lg mb-5 pl-3'
            placeholder='name@mail.com'
          />
          <label
            htmlFor='message'
            className='ml-5 mb-2 text-blue-sky font-bold'
          >
            Message
          </label>
          <textarea
            id='message'
            name='message'
            className='bg-gray-100 py-3 rounded-lg mb-5 resize-none h-40 pl-3'
            placeholder='Describe your thoughts'
          />
          <button
            type='submit'
            className='bg-purple hover:border hover:text-purple hover:bg-gray-100 hover:border-purple text-white py-3 px-2 rounded-xl transition duration-300'
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
