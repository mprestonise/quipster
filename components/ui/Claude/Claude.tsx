'use client';

import Button from '@/components/ui/Button';
import { useState } from 'react';
import Anthropic from '@anthropic-ai/sdk';

export default function Claude() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    let caption;
    const handleClaudeRequest = async () => {
        setIsSubmitting(true);
        const anthropic = new Anthropic({ apiKey: process.env["ANTHROPIC_API_KEY"] });
        // const image_url = "https://i.etsystatic.com/18298644/r/il/785cfa/5510810648/il_1140xN.5510810648_flu0.jpg"
        const image_media_type = "image/jpeg"
        // const image_array_buffer = await ((await fetch(image_url)).arrayBuffer());
        // const image_data = Buffer.from(image_array_buffer).toString('base64');

        const image_data = Buffer.from('/statement-trapezoid.jpg').toString('base64');
    
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
        setIsSubmitting(false);
        caption = generatedCaption;
      };

    return (
    <div>
        <Button
        variant="slim"
        onClick={handleClaudeRequest}
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        Get caption
      </Button>
      {caption ? <p>Caption: {caption}</p> : <p>Click the button above to generate a caption</p>}
    </div>
    );
  }