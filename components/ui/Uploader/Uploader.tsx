'use client';

import Button from '@/components/ui/Button';
import { useState } from 'react';
import { uploadPhoto } from '@/utils/photos/client';

export default function Uploader(uuid: Record<string, unknown> | undefined) {

    const [isUploading, setIsUploading] = useState(false);
    const [photo, setPhoto] = useState<any>();

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsUploading(true);
        e.preventDefault();
        console.log("What is the event?", e);
        const uploadedPhoto = await uploadPhoto('hello', uuid);
        console.log("What is uploadedPhoto in Uploader.tsx?", uploadedPhoto);
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