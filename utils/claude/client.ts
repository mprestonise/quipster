import Anthropic from '@anthropic-ai/sdk';

// Define a function to create a Claude client for client-side operations
console.log("creating anthropic client");
export const anthropic = new Anthropic({ apiKey: process.env["ANTHROPIC_API_KEY"] });

console.log(anthropic);