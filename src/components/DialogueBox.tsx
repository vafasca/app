import { useState, useEffect, useRef } from 'react';
import type { StoryNode, Character, Language } from '@/types/game';

interface DialogueBoxProps {
  node: StoryNode | null;
  character: Character | null;
  language: Language;
  onComplete?: () => void;
}

export function DialogueBox({ node, character, language, onComplete }: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const textIndexRef = useRef(0);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!node) return;

    const text = language === 'es' ? node.text_es : node.text_ru;
    
    // Reset typing state
    setDisplayedText('');
    setCurrentText(text);
    textIndexRef.current = 0;
    setIsTyping(true);

    // Clear any existing interval
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    // Start typing effect
    typingIntervalRef.current = setInterval(() => {
      if (textIndexRef.current < text.length) {
        setDisplayedText(prev => prev + text[textIndexRef.current]);
        textIndexRef.current++;
      } else {
        setIsTyping(false);
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
        }
        onComplete?.();
      }
    }, 30);

    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, [node, language, onComplete]);

  const handleClick = () => {
    if (isTyping) {
      // Skip typing animation
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
      setDisplayedText(currentText);
      setIsTyping(false);
      onComplete?.();
    }
  };

  const characterName = character 
    ? (language === 'es' ? character.name_es : character.name_ru)
    : '';

  const isNarrator = !node?.character;

  return (
    <div 
      className="dialogue-box"
      onClick={handleClick}
      role="region"
      aria-live="polite"
      aria-label={language === 'es' ? 'Diálogo' : 'Диалог'}
    >
      {/* Character Name */}
      {!isNarrator && characterName && (
        <div className="dialogue-name">
          {characterName}
        </div>
      )}

      {/* Text Content */}
      <div className="dialogue-text">
        {displayedText}
        {isTyping && <span className="dialogue-cursor">|</span>}
      </div>

      {/* Continue Indicator */}
      {!isTyping && (
        <div className="dialogue-continue">
          <span className="dialogue-continue-arrow">▼</span>
        </div>
      )}
    </div>
  );
}
