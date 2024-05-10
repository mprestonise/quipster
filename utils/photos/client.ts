'use client'

import { createClient } from '@/utils/supabase/client';
import { v4 as uuid } from 'uuid';

interface UploadResponse {
  id: string | null;
  path: string | null;
  fullPath: string | null;
  message: string | null;
}

export async function uploadPhoto(e: React.FormEvent<HTMLFormElement>, userid: Record<string, unknown> | undefined) {
  // Prevent default form submission refresh
  e.preventDefault();

  const supabase = createClient()

  const formData = new FormData(e.currentTarget);
  let photo = formData.get('photo')!;

  const { data, error } = await supabase.storage.from('photos').upload(userid?.userid + '/' + uuid(), photo, {
    cacheControl: '3600',
    upsert: false
  }) as unknown as { data: UploadResponse; error: UploadResponse };

  if (error) {
    return error;
  } else {
    return data;
  }
}

export async function updateUserWithPhoto(photo: UploadResponse, userid: Record<string, unknown> | undefined) {

  const supabase = createClient()

  console.log("Trying to update the user with the imageURL", userid?.userid, photo);

  const { data, error } = await supabase.auth.updateUser({
    data: { imageURL: photo.id }
  })

  if (error) {
    return error;
  }
  else {
    console.log('What was returned from updateUser?', data);
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