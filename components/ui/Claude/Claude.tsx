'use client';

import Button from '@/components/ui/Button';
import { useState } from 'react';
import { requestCaption } from '@/utils/claude/client';

export default function Claude() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [caption, setCaption] = useState('');

    const handleClaudeRequest = async () => {
        setIsSubmitting(true);
        const generatedCaption = await requestCaption('witty, friendly, and quirky');
        setCaption(generatedCaption);
        setIsSubmitting(false);
      };

    return (
    <div className="max-w-2xl m-auto mt-5 text-sm sm:text-center sm:text-xs">
        <Button
        variant="slim"
        onClick={handleClaudeRequest}
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {caption ? 'Get another caption' : 'Get caption'}
      </Button>
      {caption ? <p className="mt-5">{caption}</p> : <p className="mt-5">Click the button above to generate a caption</p>}
    </div>
    );
  }