'use client';

import Button from '@/components/ui/Button';
import { useState } from 'react';
import { uploadPhoto } from '@/utils/photos/client';

export default function Uploader() {
    const [isUploading, setIsUploading] = useState(false);
    const [photo, setPhoto] = useState('');

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsUploading(true);
        console.log('What is the e.currentTarget.files object?', e.currentTarget.files);
        e.preventDefault();
        const uploadedPhoto = await uploadPhoto(e.currentTarget.files);
        setPhoto(uploadedPhoto);
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