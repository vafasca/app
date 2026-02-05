import { useState } from 'react';
import type { Choice, ChoiceRequirement, Language, GameVariables } from '@/types/game';

interface ChoicesListProps {
  choices: Choice[];
  language: Language;
  variables: GameVariables;
  onChoice: (nextNodeId: string, effects?: Choice['effects']) => void;
  disabled?: boolean;
}

export function ChoicesList({ 
  choices, 
  language, 
  variables, 
  onChoice, 
  disabled = false 
}: ChoicesListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const checkRequirements = (requires?: ChoiceRequirement): boolean => {
    if (!requires) return true;

    return Object.entries(requires).every(([key, condition]) => {
      if (!condition) return true;
      
      const value = variables[key as keyof GameVariables];
      
      if (condition.min !== undefined && value < condition.min) return false;
      if (condition.max !== undefined && value > condition.max) return false;
      
      return true;
    });
  };

  const getRequirementTooltip = (requires?: ChoiceRequirement): string | null => {
    if (!requires) return null;

    const requirements: string[] = [];
    
    Object.entries(requires).forEach(([key, condition]) => {
      if (condition?.min !== undefined) {
        requirements.push(
          `${key}: ≥ ${condition.min}`
        );
      }
      if (condition?.max !== undefined) {
        requirements.push(
          `${key}: ≤ ${condition.max}`
        );
      }
    });

    return requirements.length > 0 
      ? (language === 'es' 
          ? `Requiere: ${requirements.join(', ')}` 
          : `Требуется: ${requirements.join(', ')}`)
      : null;
  };

  return (
    <div className="choices-list">
      {choices.map((choice, index) => {
        const text = language === 'es' ? choice.text_es : choice.text_ru;
        const isAvailable = checkRequirements(choice.requires);
        const tooltip = getRequirementTooltip(choice.requires);

        return (
          <button
            key={index}
            className={`
              choice-button
              ${!isAvailable ? 'choice-button-disabled' : ''}
              ${hoveredIndex === index && isAvailable ? 'choice-button-hover' : ''}
            `}
            onClick={() => isAvailable && !disabled && onChoice(choice.next, choice.effects)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            disabled={!isAvailable || disabled}
            title={tooltip || text}
            aria-label={text}
          >
            <span className="choice-text">{text}</span>
            {!isAvailable && tooltip && (
              <span className="choice-lock">🔒</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
