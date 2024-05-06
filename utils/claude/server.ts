'use server'

import Anthropic from '@anthropic-ai/sdk';

export async function generateCaption(prompt: string) {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const image_url = "https://quipster.vercel.app/tiny-clouds.png"
    const image_media_type = "image/png"
    const image_array_buffer = await ((await fetch(image_url)).arrayBuffer());
    const image_data = Buffer.from(image_array_buffer).toString('base64');

    const generatedCaption = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      messages: [
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": image_media_type,
                            "data": image_data,
                        },
                    },
                    {
                      "type": "text",
                      "text": "The client wants you to write a witty, friendly, and quirky caption for this photo that they can use when publishing this photo to Instagram"
                  }
                ],
            }
          ]
    });
    return generatedCaption.content[0].text;
  }