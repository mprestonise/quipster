'use server'

import { createClient } from '@supabase/supabase-js'
import { getErrorRedirect, getStatusRedirect } from 'utils/helpers';

export async function storePhotoInBucket(photo: File) {

     // Create a single supabase client for interacting with your database
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    const { data, error } = await supabase.storage.from('photos').upload('file_path', photo);

    console.log('Was something uploaded?', data, error);

    // Getting a 403 - Unauthorized
    // const supabase = createClient('your_project_url', 'your_supabase_api_key') << That might be the fix?

    if (error) {
    return getErrorRedirect(
        '/upload',
        'Your photo could not be updated',
        error.message
    );
    } else {
        console.log("The data returned from successful upload, ", data);
        return getStatusRedirect(
            '/upload',
            'Uploaded successfully',
            `Nice photo! Quippy is excited to write a caption for you`
        );
    }
  }