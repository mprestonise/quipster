'use client';

import Button from '@/components/ui/Button';
import { useState } from 'react';
import { requestCaption } from '@/utils/claude/client';

export default function Claude() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [caption, setCaption] = useState('');

    const handleClaudeRequest = async () => {
        setIsSubmitting(true);
        const generatedCaption = await requestCaption('do something');
        setCaption(generatedCaption);
        setIsSubmitting(false);
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