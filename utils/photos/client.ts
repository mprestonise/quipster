'use client'

import { storePhotoInBucket } from './server';

// Define a function to create a Claude client for client-side operations
export async function uploadPhoto(photo: File, user: string) {
    const uploadedPhoto = await storePhotoInBucket(photo, user);
    return uploadedPhoto;
}