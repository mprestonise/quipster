'use client'

import { createClient } from '@/utils/supabase/client';
import { v4 as uuid } from 'uuid';
import { storePhotoInBucket } from '@/utils/photos/server';

export async function uploadPhoto(e: React.FormEvent<HTMLFormElement>, userid: Record<string, unknown> | undefined) {
  // Prevent default form submission refresh
  e.preventDefault();

  const supabase = createClient()

  const formData = new FormData(e.currentTarget);
  let photo = formData.get('photo')!;
  const userId = uuid(userid);
  const clientSide = await supabase.storage.from('photos').upload(userId + '/' + 'photo', photo, {
    cacheControl: '3600',
    upsert: false
});
  // const uploadedPhoto = await storePhotoInBucket(formData, userid);

  return clientSide;
}