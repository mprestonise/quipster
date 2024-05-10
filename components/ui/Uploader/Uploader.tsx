'use client';

import Button from '@/components/ui/Button';
import { useState } from 'react';
import { uploadPhoto, updateUserWithPhoto } from '@/utils/photos/client';

export default function Uploader(userid: Record<string, unknown> | undefined) {

    const [isUploading, setIsUploading] = useState(false);
    const [photo, setPhoto] = useState(Object);

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsUploading(true);
        const uploadedPhoto = await uploadPhoto(e, userid);
        console.log(uploadedPhoto);
        if (!uploadedPhoto.message) {
            const userIsUpdated = await updateUserWithPhoto(uploadedPhoto, userid);
            if (!userIsUpdated.message) {
                // use the imageURL field to get a signed URL for displaying in the UI and sending to Claude
                console.log('userIsUpdated', userIsUpdated?.user)
            }
        }
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
    </div>
    );
  }