'use client';

import Button from '@/components/ui/Button';
import { useState } from 'react';
import { uploadPhoto, updateUserWithPhoto, getSignedURL } from '@/utils/photos/client';

export default function Uploader(userid: Record<string, unknown>, updatePhotoURL: Function) {

    const [isUploading, setIsUploading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [photo, setPhoto] = useState('');

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsUploading(true);
        const uploadedPhoto = await uploadPhoto(e, userid);
        if (!uploadedPhoto.message) {
            const userIsUpdated = await updateUserWithPhoto(uploadedPhoto);
            if (!userIsUpdated.message) {
                const signedURL = await getSignedURL(uploadedPhoto);
                setPhoto(signedURL!.signedUrl);
                setIsUploading(false);
                console.log("About to call updatePhotoURL from inside Uploader.tsx", isUploading);
                updatePhotoURL(signedURL!.signedUrl);
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
                onChange={(e) => setIsEmpty(e.target.files?.length == 0)}
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
            disabled={isUploading || isEmpty}
        >
            Upload
      </Button>
      {photo !== '' ? <img className="mt-5 preview-image" src={photo} alt="Uploaded photo" /> : null}
    </div>
    );
  }