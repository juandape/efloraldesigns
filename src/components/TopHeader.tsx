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
        className="w-full h-40 sm:h-[500px] object-cover shadow-sm"
        alt={imageAlt}
      />
      <div className="sm:absolute sm:inset-0 flex items-center justify-center">
        <h2 className="text-2xl xl:text-5xl -mt-8 font-semibold w-80 xl:w-2/5 text-center rounded-xl py-4 sm:py-6 bg-gray-200 opacity-80 shadow-sm shadow-gray-400 animate-fadeIn">
          {title}
        </h2>
      </div>
      <p className="text-blue-sky text-base sm:text-3xl text-center my-20 mx-5 sm:mx-20 font-semibold">
        {headerText}
      </p>
    </section>
  );
}