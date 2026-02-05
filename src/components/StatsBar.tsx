import type { GameVariables, Language } from '@/types/game';

interface StatsBarProps {
  variables: GameVariables;
  language: Language;
}

export function StatsBar({ variables, language }: StatsBarProps) {
  const labels = {
    es: {
      confianza: 'Confianza',
      complicidad: 'Complicidad',
      autonomia: 'Autonomía',
      humor: 'Humor',
    },
    ru: {
      confianza: 'Доверие',
      complicidad: 'Близость',
      autonomia: 'Автономия',
      humor: 'Юмор',
    },
  };

  const getBarColor = (value: number): string => {
    if (value >= 75) return 'stat-bar-high';
    if (value >= 40) return 'stat-bar-medium';
    return 'stat-bar-low';
  };

  return (
    <div className="stats-bar">
      {Object.entries(variables).map(([key, value]) => (
        <div key={key} className="stat-item">
          <div className="stat-header">
            <span className="stat-label">
              {labels[language][key as keyof GameVariables]}
            </span>
            <span className="stat-value">{value}</span>
          </div>
          <div className="stat-bar-container">
            <div 
              className={`stat-bar-fill ${getBarColor(value)}`}
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
