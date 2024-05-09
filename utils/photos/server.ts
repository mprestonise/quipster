'use server'

import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation';
import { getErrorRedirect, getStatusRedirect } from 'utils/helpers';
import { v4 as uuid } from 'uuid';
import clouds from '@/public/og.png';

export async function redirectToPath(path: string) {
    return redirect(path);
  }

export async function storePhotoInBucket(formData: FormData, user: Record<string, unknown> | undefined) {

    // Get form data
    let photo = formData.get('photo')!;
    console.log("what is photo?", photo);

     // Create a single supabase client for interacting with your database
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    const userId: string = uuid(user);
    const { data, error } = await supabase.storage.from('photos').upload(userId + '/' + 'photo', photo, {
        cacheControl: '3600',
        upsert: false
    });

    console.log('Was something uploaded?', data, error);

    if (error) {
        return getErrorRedirect(
          '/upload',
          'Your photo could not be uploaded.',
          error.message
        );
      } else {
        console.log("The data returned from successful upload, ", data);
        return getStatusRedirect(
          '/upload',
          'Success!',
          'Your photo has been uploaded.'
        );
      }
  }