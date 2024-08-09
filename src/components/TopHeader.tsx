import React from 'react';

interface TopHeaderProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  headerText?: string;
}

export default function TopHeader({
  imageSrc,
  imageAlt,
  title,
  headerText,
}: TopHeaderProps) {
  return (
    <section className="relative">
      <img
        src={imageSrc}
        className="w-full h-auto sm:h-[500px] object-cover shadow-sm"
        alt={imageAlt}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-2xl xl:text-5xl font-semibold mb-4  w-80 xl:w-2/5 text-center rounded-xl py-6 bg-gray-200 opacity-80 -mt-8 sm:-mt-12 shadow-sm shadow-gray-400">
          {title}
        </h2>
      </div>
      <p className="text-blue-sky text-base sm:text-3xl text-center my-20 mx-5 sm:mx-20 font-semibold">
        {headerText}
      </p>
    </section>
  );
}