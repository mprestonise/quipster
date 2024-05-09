'use client'

import { storePhotoInBucket } from './server';

// Define a function to create a Claude client for client-side operations
export async function uploadPhoto(photo: File, user: Record<string, unknown> | undefined) {
    const uploadedPhoto = await storePhotoInBucket(photo, user);
    console.log("What is uploadedPhoto in client.ts?", uploadedPhoto);
    return uploadedPhoto;
}