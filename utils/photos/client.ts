'use client'

import { storePhotoInBucket } from './server';

// Define a function to create a Claude client for client-side operations
export async function uploadPhoto(e: React.FormEvent<HTMLFormElement>, user: Record<string, unknown> | undefined) {
    const uploadedPhoto = await storePhotoInBucket(e, user);
    console.log("What is uploadedPhoto in client.ts?", uploadedPhoto);
    return uploadedPhoto;
}