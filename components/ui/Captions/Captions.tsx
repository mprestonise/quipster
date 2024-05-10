'use client';

import { useState } from 'react';
import Claude from '@/components/ui/Claude/Claude';
import Uploader from '@/components/ui/Uploader/Uploader';

export default function Captions(userid: Record<string, unknown>) {
    const [photo, setPhoto] = useState({ url: '' });
    const [caption, setCaption] = useState<string | undefined>(undefined);

    console.log('What is userid in Captions?', userid);

    return (
    <div className="max-w-2xl m-auto mt-5 text-sm sm:text-center sm:text-xs">
        <h3 className="mt-24 text-2xl font-bold text-white sm:text-center sm:text-3xl">Let's start with uploading a photo and using known brand settings</h3>
        <Uploader userid={userid} updatePhotoURL={setPhoto} />
        <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">Brand settings: Witty, Friendly, and Quirky</p>
        <Claude photo={photo} updateCaption={setCaption} />
        {caption ? <p className="mt-5">{caption}</p> : <p className="mt-5">Click the button above to generate a caption</p>}
    </div>
    );
  }