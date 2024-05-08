'use server'

import { createClient } from '@/utils/supabase/server';
import { getErrorRedirect, getStatusRedirect } from 'utils/helpers';

export async function storePhotoInBucket(photo: File) {

    const supabase = createClient();

    const { data, error } = await supabase.storage.from('photos').upload('file_path', photo);

    console.log('Was something uploaded?', data, error);
    
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