import ImageUpload from '@/components/ImageUpload';
import TopHeader from '../components/TopHeader';

export default function UploadFiles() {
  return (
    <div className='relative p-6 bg-pink'>
      <TopHeader
        title='Upload Files'
        headerText='Upload images and videos to the website'
      />
      <ImageUpload />
    </div>
  );
}
