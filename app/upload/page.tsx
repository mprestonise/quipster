'use client';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Button from '@/components/ui/Button';
import Anthropic from '@anthropic-ai/sdk';
import { useState } from 'react';

export default async function Upload() {
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  let caption;

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  if (error) {
    console.log(error);
  }

  if (!user) {
    return redirect('/signin');
  }

  if (!subscription) {
    return redirect('/');
  }

  const handleClaudeRequest = async () => {
    setIsSubmitting(true);
    const anthropic = new Anthropic();
    const image_url = "https://i.etsystatic.com/18298644/r/il/785cfa/5510810648/il_1140xN.5510810648_flu0.jpg"
    const image_media_type = "image/jpeg"
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
    setIsSubmitting(false);
    caption = generatedCaption;
  };

  return (
    <section className="mb-32 bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Ready to post?
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            Upload your photo for Quippy to write a caption for
          </p>
          <h3>Let's start with a dummy photo and known brand settings</h3>
          <img src="https://i.etsystatic.com/18298644/r/il/785cfa/5510810648/il_1140xN.5510810648_flu0.jpg" alt="Statement Trapezoids" height="100" />
          <p>Brand settings: Witty, Friendly, and Quirky</p>
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
      </div>
    </section>
  );
}
