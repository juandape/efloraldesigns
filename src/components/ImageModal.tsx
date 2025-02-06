import React from 'react';
import ReactDOM from 'react-dom';

interface ImageModalProps {
  item: {
    name: string;
    image?: string;
    video?: string;
    description?: string;
  };
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ item, onClose }) => {
  return ReactDOM.createPortal(
    <div className='fixed h-screen inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
      <div className='relative'>
        <img
          src={item.image}
          alt={item.name}
          className='md:w-[700px] md:h-[700px] object-cover px-5 mx-auto'
        />
        <h2 className='text-white text-xl font-bold mt-5 text-center'>
          {item.name}
        </h2>
        <p className='text-white text-lg mt-5 text-center'>
          {item.description}
        </p>

        <button
          className='absolute top-2 right-8 text-white p-3.5 text-2xl font-bold bg-slate-400 rounded-xl w-6 h-6 flex items-center justify-center hover:bg-slate-500 transition duration-300'
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ImageModal;
