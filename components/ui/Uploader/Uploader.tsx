'use client';

import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { uploadPhoto } from '@/utils/photos/client';
import { storePhotoInBucket } from '@/utils/photos/server';

export default function Uploader(uuid: Record<string, unknown> | undefined) {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const [photo, setPhoto] = useState();

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsUploading(true);
        uploadPhoto(e, uuid, storePhotoInBucket, router);
        setIsUploading(false);
      };

    return (
    <div className="max-w-2xl m-auto mt-5 text-sm sm:text-center sm:text-xs">
        <form id="imageUploadForm" onSubmit={(e) => handleUpload(e)}>
            <input
                type='file'
                id='photo'
                name='photo'
                accept='image/webp, image/png, image/jpeg'
                disabled={isUploading}
            ></input>
        </form>
        <Button
            variant="slim"
            type="submit"
            form="imageUploadForm"
            loading={isUploading}
            disabled={isUploading}
        >
            {photo ? 'Uploaded' : 'Upload'}
      </Button>

      {photo ? <p>A photo was uploaded!</p> : null}
    </div>
    );
  }