import type { Language, GameVariables } from '@/types/game';
import { StatsBar } from './StatsBar';

interface EndScreenProps {
  language: Language;
  variables: GameVariables;
  onRestart: () => void;
  onMainMenu: () => void;
}

export function EndScreen({ language, variables, onRestart, onMainMenu }: EndScreenProps) {
  const texts = {
    es: {
      title: 'Fin de la Historia',
      subtitle: 'Gracias por jugar',
      stats: 'Tus estadísticas finales',
      restart: 'Jugar de Nuevo',
      menu: 'Menú Principal',
      message: 'Cada elección que hiciste te llevó a este momento. El amor es un viaje, no un destino.',
    },
    ru: {
      title: 'Конец Истории',
      subtitle: 'Спасибо за игру',
      stats: 'Ваши финальные показатели',
      restart: 'Играть Снова',
      menu: 'Главное Меню',
      message: 'Каждый выбор, который ты сделала, привёл тебя к этому моменту. Любовь — это путешествие, а не пункт назначения.',
    },
  };

  const t = texts[language];

  return (
    <div className="end-screen">
      <div className="end-content">
        <h1 className="end-title">{t.title}</h1>
        <p className="end-subtitle">{t.subtitle}</p>
        
        <div className="end-message">
          <p>{t.message}</p>
        </div>

        <div className="end-stats">
          <h2 className="end-stats-title">{t.stats}</h2>
          <StatsBar variables={variables} language={language} />
        </div>

        <div className="end-buttons">
          <button 
            className="end-button end-button-primary"
            onClick={onRestart}
          >
            {t.restart}
          </button>
          <button 
            className="end-button"
            onClick={onMainMenu}
          >
            {t.menu}
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="end-decoration">
        <span className="end-flower">🌸</span>
        <span className="end-cat">🐱</span>
        <span className="end-shawarma">🌯</span>
      </div>
    </div>
  );
}
