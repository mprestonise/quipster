'use server'

import Anthropic from '@anthropic-ai/sdk';

export async function generateCaption(prompt: string) {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const image_url = "https://quipster.vercel.app/tiny-clouds.png"
    const image_media_type = "image/png"
    const image_array_buffer = await ((await fetch(image_url)).arrayBuffer());
    const image_data = Buffer.from(image_array_buffer).toString('base64');

    const generatedCaption = await anthropic.messages.create({
      model: 'claude-3-haiku-20240229',
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
                      "text": `Write an engaging, ${[prompt]} caption for this photo of a product so that it can be published to Instagram and engage buyers. Avoid adding anything other than the caption, avoid commentary, avoid any additional updates or notes`
                  }
                ],
            }
          ]
    });
    return generatedCaption.content[0].text;
  }