'use server'

import { createClient } from '@supabase/supabase-js'
import { getErrorRedirect, getStatusRedirect } from 'utils/helpers';
import { v4 as uuid } from 'uuid';

export async function storePhotoInBucket(photo: File, user: Record<string, unknown> | undefined) {

     // Create a single supabase client for interacting with your database
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    console.log("What is the result of createClient?", supabase);

    const userId: string = uuid(user);
    const { data, error } = await supabase.storage.from('photos').upload(userId + '/' + 'file_path', photo);

    console.log('Was something uploaded?', data, error);

    // Getting a 403 - Unauthorized
    // Policy created – does it work now?

    if (error) {
    return getErrorRedirect(
        '/upload',
        'Your photo could not be updated',
        error.message
    );
    } else {
        console.log("The data returned from successful upload, ", data);
        return data;
    }
  }