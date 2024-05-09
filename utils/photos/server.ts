'use server'

import { createClient } from '@supabase/supabase-js'
import { v4 as uuid } from 'uuid';

export async function storePhotoInBucket(photo: File, user: Record<string, unknown> | undefined) {

     // Create a single supabase client for interacting with your database
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    const userId: string = uuid(user);
    console.log("Are we getting a photo?", typeof photo);
    const { data, error } = await supabase.storage.from('photos').upload('file_path', photo);

    console.log('Was something uploaded?', data, error);

    // Getting a 403 - Unauthorized
    // Policy created – does it work now?

    if (error) {
    return error.message;
    } else {
        console.log("The data returned from successful upload, ", data);
        return data;
    }
  }