'use client';

import { useState, useCallback } from 'react';
import { generateScrambleFrames, generateFullHash } from '@/lib/hash-utils';

export function useHashAnimation(duration = 2000) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentFrame, setCurrentFrame] = useState('');
  const [finalHash, setFinalHash] = useState('');

  const animate = useCallback(
    (input: string, technique: string) => {
      const fullHash = generateFullHash(input, technique);
      const frames = generateScrambleFrames(fullHash, 30);
      const frameDelay = duration / frames.length;

      setIsAnimating(true);
      setFinalHash('');

      let frameIndex = 0;
      const interval = setInterval(() => {
        if (frameIndex < frames.length) {
          setCurrentFrame(frames[frameIndex]);
          frameIndex++;
        } else {
          clearInterval(interval);
          setCurrentFrame(fullHash);
          setFinalHash(fullHash);
          setIsAnimating(false);
        }
      }, frameDelay);

      return () => clearInterval(interval);
    },
    [duration]
  );

  return { isAnimating, currentFrame, finalHash, animate };
}
