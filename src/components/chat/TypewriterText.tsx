'use client';

import { useState, useEffect, useRef } from 'react';
import { TypewriterCursor } from './TypewriterCursor';

interface TypewriterTextProps {
  content: string;
  isStreaming: boolean;
  /** Milliseconds per character. Default 15 for a fast typewriter feel. */
  speed?: number;
}

const DEFAULT_SPEED = 15;

export function TypewriterText({
  content,
  isStreaming,
  speed = DEFAULT_SPEED,
}: TypewriterTextProps) {
  const [displayedLength, setDisplayedLength] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (displayedLength >= content.length) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setDisplayedLength((prev) => {
        const next = prev + 1;
        if (next >= content.length && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return Math.min(next, content.length);
      });
    }, speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [content, speed]);

  // Reset displayed length when content is replaced with something shorter (e.g. error message)
  useEffect(() => {
    setDisplayedLength((prev) => (content.length < prev ? content.length : prev));
  }, [content]);

  const displayed = content.slice(0, displayedLength);
  const isTyping = displayedLength < content.length;

  return (
    <>
      {displayed}
      {isTyping && <TypewriterCursor />}
    </>
  );
}
