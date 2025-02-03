import ImageEdit from '@/components/ImageEdit';
import TopHeader from '../components/TopHeader';

export default function EditFiles() {
  return (
    <div className='relative p-6 bg-pink'>
      <TopHeader
        title='Edit Files'
        headerText='Edit images and videos from the website'
      />
        <ImageEdit />
    </div>
  );
}
