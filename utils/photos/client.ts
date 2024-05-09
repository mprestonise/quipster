'use client'

import { storePhotoInBucket } from './server';

// Define a function to create a Claude client for client-side operations
export async function uploadPhoto(file: File, user: Record<string, unknown> | undefined) {
    const uploadedPhoto = await storePhotoInBucket(file, user);
    return uploadedPhoto;
}