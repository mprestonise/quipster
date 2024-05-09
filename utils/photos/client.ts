'use client'

import { storePhotoInBucket } from './server';

// Define a function to create a Claude client for client-side operations
export async function uploadPhoto(text: string, user: Record<string, unknown> | undefined) {
    console.log("What is uploadedPhoto in client.ts?", text);
    const uploadedPhoto = await storePhotoInBucket(text, user);
    return uploadedPhoto;
}