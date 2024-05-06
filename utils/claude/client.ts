'use client'

import { generateCaption } from './server';

// Define a function to create a Claude client for client-side operations
export async function requestCaption(prompt: string) {
    const caption = await generateCaption(prompt)
    return caption;
}