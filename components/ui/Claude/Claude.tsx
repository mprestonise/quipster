'use client';

import Button from '@/components/ui/Button';
import { useState } from 'react';
import { requestCaption } from '@/utils/claude/client';

export default function Claude() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    let caption;
    const handleClaudeRequest = async () => {
        setIsSubmitting(true);
        caption = await requestCaption('do something');
        console.log("We got a caption in Claude.tsx", caption);
        setIsSubmitting(false);
        return caption;
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