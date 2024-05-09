'use server'

import { createClient } from '@supabase/supabase-js'
import { v4 as uuid } from 'uuid';

export async function storePhotoInBucket(file: File, user: Record<string, unknown> | undefined) {

     // Create a single supabase client for interacting with your database
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    const userId: string = uuid(user);
    const { data, error } = await supabase.storage.from('photos').upload('file_path', file);

    console.log('Was something uploaded?', data, error);

    if (error) {
    return error.message;
    } else {
        console.log("The data returned from successful upload, ", data);
        return data;
    }
  }