'use client'

import { createClient } from '@/utils/supabase/client';
import { v4 as uuid } from 'uuid';

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

  // https://ocuwiawvhyywobpnmhyl.supabase.co/storage/v1/object/sign/photos/0bb5404e-442d-45b2-872f-c88a66d9e8ba/c994f2fd-8e46-4aad-8837-2d0864878b97?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwaG90b3MvMGJiNTQwNGUtNDQyZC00NWIyLTg3MmYtYzg4YTY2ZDllOGJhL2M5OTRmMmZkLThlNDYtNGFhZC04ODM3LTJkMDg2NDg3OGI5NyIsImlhdCI6MTcxNTMwOTU0NywiZXhwIjoxNzE1OTE0MzQ3fQ.M1OkvDUz6GOFD8Lb-0eHacOCnYveifrZqV6YALnS6ZA&t=2024-05-10T02%3A52%3A27.605Z
}