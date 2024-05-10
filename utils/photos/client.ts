'use client'

import { createClient } from '@/utils/supabase/client';
import { v4 as uuid } from 'uuid';

interface FileToUpload {
  name: string;
  file: FormDataEntryValue
}

interface UploadResponse {
  id: string | null;
  path: string | null;
  fullPath: string | null;
  message: string | null;
}

interface UpdateUserResponse {
  user: {
    user_metadata: {
      imageUrl: string
    }
  } | null;
  message: string | null;
}

export async function uploadPhoto(e: React.FormEvent<HTMLFormElement>, userid: string) {
  // Prevent default form submission refresh
  e.preventDefault();

  const supabase = createClient()

  const photo = new FormData(e.currentTarget).get('photo');

  if (photo instanceof File) {
    const { data, error } = await supabase.storage.from('photos').upload(userid + '/' + uuid() + '-' + photo.name, photo, {
      cacheControl: '3600',
      upsert: false
    }) as unknown as { data: UploadResponse; error: UploadResponse };
  
    if (error) {
      return error;
    } else {
      return data;
    }
  } else {
    return { id: null, path: null, fullPath: null, message: 'No file was attached' };
  }
}

export async function updateUserWithPhoto(photo: UploadResponse) {

  const supabase = createClient()

  const { data, error } = await supabase.auth.updateUser({
    data: { imageURL: photo.id }
  }) as unknown as { data: UpdateUserResponse; error: UpdateUserResponse }

  if (error) {
    return error;
  }
  else {
    return data;
  }
}

export async function getSignedURL(photo: UploadResponse) {

  const supabase = createClient()

  const { data } = await supabase.storage.from('photos').createSignedUrl(photo.path!, 3600, {
    transform: {
      width: 400
    }
  })

  return data;
}