'use client';

import Button from '@/components/ui/Button';
import { useState } from 'react';
import { uploadPhoto, updateUserWithPhoto, getSignedURL } from '@/utils/photos/client';

export default function Uploader(userid: Record<string, unknown> | undefined) {

    const [isUploading, setIsUploading] = useState(false);
    const [photo, setPhoto] = useState(Object);

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsUploading(true);
        const uploadedPhoto = await uploadPhoto(e, userid);
        if (!uploadedPhoto.message) {
            const userIsUpdated = await updateUserWithPhoto(uploadedPhoto);
            if (!userIsUpdated.message) {
                const signedURL = await getSignedURL(uploadedPhoto);
                console.log('what is the signedURL?', signedURL)
                setPhoto(signedURL?.signedUrl);
                setIsUploading(false);
            }
        } else {
            setIsUploading(false);
        }
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
            Upload
      </Button>
      {photo ? <img className="mt-5" src={photo} alt="Uploaded photo" /> : null}
    </div>
    );
  }