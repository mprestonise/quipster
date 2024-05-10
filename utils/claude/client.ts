'use client'

import { generateCaption } from './server';

// Define a function to create a Claude client for client-side operations
export async function requestCaption(file: string, prompt: string) {
    const caption = await generateCaption(file, prompt);
    console.log("What is the result of generateCaption in client.ts?", caption);
    return caption;
}