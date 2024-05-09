'use server'

import { createClient } from '@supabase/supabase-js'
import { v4 as uuid } from 'uuid';

export async function storePhotoInBucket(formData: FormData, user: Record<string, unknown> | undefined) {
    // Get form data
    let photo = formData.get('photo')!;
    const userid = uuid(user);

     // Create a single supabase client for interacting with your database
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const { data, error } = await supabase.storage.from('photos').upload(userid + '/' + 'photo', photo, {
        cacheControl: '3600',
        upsert: false
    });

    console.log('Was something uploaded?', data, error);

    if (error) {
        return error;
      } else {
        return data;
      }
  }