'use client'

import { createClient } from '@/utils/supabase/client';
import { v4 as uuid } from 'uuid';

export async function uploadPhoto(e: React.FormEvent<HTMLFormElement>, userid: Record<string, unknown> | undefined) {
  // Prevent default form submission refresh
  e.preventDefault();

  const supabase = createClient()

  console.log("What is my userid right now?", userid);

  const formData = new FormData(e.currentTarget);
  let photo = formData.get('photo')!;
  const { data, error } = await supabase.storage.from('photos').upload(userid?.userid + '/' + uuid(), photo, {
    cacheControl: '3600',
    upsert: false
  });

  if (error) {
    return { path: 'Error!', message: error.message};
  } else {
    return data;
  }
}

export async function updateUserWithPhoto(photo: { path: string | null}, userid: Record<string, unknown> | undefined) {

  const supabase = createClient()

  const { data, error } = await supabase.auth.updateUser({
    data: { imageURL: photo.path }
  })

  if (error) {
    return error;
  }
  else {
    return data;
  }

  // else {
  //   const { signedData, signedError } = await supabase.storage.from('photos').createSignedUrl(data['fullPath'], 60000, {
  //     transform: {
  //       width: 400
  //     },
  //   })
  
  // https://quipster.vercel.app/photos/3f975a6c-ee1d-4064-85c2-d99cecf38a9b/93c07a59-b69f-467c-9453-10de54ba36ae
  
  // return signedError ? signedError : signedData.signedUrl;
}