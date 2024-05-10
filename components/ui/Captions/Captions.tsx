'use client';

import { useState, useEffect } from 'react';
import useClipboard from "react-use-clipboard";
import Button from '@/components/ui/Button';
import Claude from '@/components/ui/Claude/Claude';
import Uploader from '@/components/ui/Uploader/Uploader';

interface CaptionsProps {
    userid: string;
}

export default function Captions({ userid }: CaptionsProps) {
    const [photo, setPhoto] = useState({ url: '' });
    const [caption, setCaption] = useState<string | undefined>(undefined);
    const [isCopied, setCopied] = useClipboard(caption ? caption: 'text');

    useEffect(() => {
        //Runs on the first render
        //And any time any dependency value changes
        console.log('What is photo in Captions?', photo);
      }, [photo]);

    return (
    <div className="max-w-2xl m-auto mt-5 text-sm sm:text-center sm:text-xs">
        <h3 className="mt-24 text-2xl font-bold text-white sm:text-center sm:text-3xl">Let's start with uploading a photo and using known brand settings</h3>
        <Uploader userid={userid} updatePhotoURL={(url: string) => setPhoto({ url })} />
        {photo.url !== '' ? <img className="mt-5 preview-image" src={photo.url} alt="Uploaded photo" /> : null}
        <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">Brand settings: Witty, Friendly, and Quirky</p>
        <Claude photo={photo} updateCaption={setCaption} />
        {caption ? <div><p className="mt-5">{caption}</p><Button onClick={setCopied}>{isCopied ? 'Copied' : 'Copy'}</Button></div> : <p className="mt-5">Click the button above to generate a caption</p>}
    </div>
    );
  }