'use client';

import Button from '@/components/ui/Button';
import { useState } from 'react';
import { requestCaption } from '@/utils/claude/client';

interface ClaudeProps {
  photo: { url: string };
  updateCaption: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function Claude({ photo, updateCaption }: ClaudeProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClaudeRequest = async () => {
        setIsSubmitting(true);
        const generatedCaption = await requestCaption(photo.url, 'witty, friendly, and quirky');
        updateCaption(generatedCaption);
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
        Get caption
      </Button>
    </div>
    );
  }