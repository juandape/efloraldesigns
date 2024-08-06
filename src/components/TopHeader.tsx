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
        className="w-full h-auto sm:h-[500px] object-cover shadow"
        alt={imageAlt}
      />
      <div className="flex mx-auto justify-center">
        <h2 className="text-pink text-2xl xl:text-5xl font-semibold mb-4 border-2 border-purple w-80 xl:w-2/5 text-center rounded-xl py-4 bg-white -mt-8 sm:-mt-12 shadow-xl">
          {title}
        </h2>
      </div>
      <p className="text-blue-sky text-base sm:text-3xl text-center my-20 mx-5 sm:mx-20 font-semibold">
        {headerText}
      </p>
    </section>
  );
}