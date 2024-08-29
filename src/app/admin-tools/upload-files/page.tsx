import ImageHandler from '@/components/ImageHandler';
import TopHeader from '@/components/TopHeader';

export default function UploadFiles() {
  return (
    <div className='mb-10'>
      <TopHeader
        imageSrc=''
        imageAlt='Upload'
        title='Upload Files'
        headerText='Upload images and videos to the website'
      />
      <section>
        <ImageHandler />
      </section>
    </div>
  );
}
