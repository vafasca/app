import { useState, useEffect } from 'react';
import type { StoryNode, Character, Language } from '@/types/game';

interface SceneProps {
  node: StoryNode | null;
  character: Character | null;
  language: Language;
}

export function Scene({ node, character, language }: SceneProps) {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [characterLoaded, setCharacterLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (node) {
      setIsTransitioning(true);
      setBackgroundLoaded(false);
      setCharacterLoaded(false);
      
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [node?.id]);

  if (!node) {
    return (
      <div className="scene-container">
        <div className="scene-loading">Cargando...</div>
      </div>
    );
  }

  const characterName = character 
    ? (language === 'es' ? character.name_es : character.name_ru)
    : '';

  return (
    <div className="scene-container">
      {/* Background Layer */}
      <div className={`scene-background-wrapper ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
        <img
          src={node.background}
          alt={node.title}
          className="scene-background"
          onLoad={() => setBackgroundLoaded(true)}
        />
        {!backgroundLoaded && (
          <div className="scene-background-placeholder" />
        )}
      </div>

      {/* Character Layer */}
      {node.character && character && (
        <div className={`scene-character-wrapper ${isTransitioning ? 'slide-out' : 'slide-in'}`}>
          <img
            src={character.image}
            alt={characterName}
            className="scene-character"
            onLoad={() => setCharacterLoaded(true)}
          />
          {!characterLoaded && (
            <div className="scene-character-placeholder" />
          )}
        </div>
      )}

      {/* Future Overlay Image (if present) */}
      {node.imageFront && (
        <div className={`scene-overlay-wrapper ${isTransitioning ? 'scale-out' : 'scale-in'}`}>
          <img
            src={node.imageFront}
            alt="Future"
            className="scene-overlay-image"
          />
        </div>
      )}
    </div>
  );
}
