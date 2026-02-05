import type { Language } from '@/types/game';
import { Save, Globe, RotateCcw, Home, ChevronLeft } from 'lucide-react';

interface GameUIProps {
  language: Language;
  onSave: () => void;
  onLanguageChange: (lang: Language) => void;
  onReset: () => void;
  onMainMenu: () => void;
  onBack: () => void;
  canGoBack: boolean;
}

export function GameUI({ 
  language, 
  onSave, 
  onLanguageChange, 
  onReset, 
  onMainMenu,
  onBack,
  canGoBack 
}: GameUIProps) {
  const texts = {
    es: {
      save: 'Guardar',
      language: 'Idioma',
      reset: 'Reiniciar',
      menu: 'Menú',
      back: 'Atrás',
    },
    ru: {
      save: 'Сохранить',
      language: 'Язык',
      reset: 'Сброс',
      menu: 'Меню',
      back: 'Назад',
    },
  };

  const t = texts[language];

  return (
    <div className="game-ui">
      <div className="game-ui-left">
        <button 
          className="ui-button"
          onClick={onMainMenu}
          title={t.menu}
        >
          <Home size={20} />
          <span className="ui-button-text">{t.menu}</span>
        </button>
        
        <button 
          className="ui-button"
          onClick={onBack}
          disabled={!canGoBack}
          title={t.back}
        >
          <ChevronLeft size={20} />
          <span className="ui-button-text">{t.back}</span>
        </button>
      </div>

      <div className="game-ui-right">
        <button 
          className="ui-button"
          onClick={() => onLanguageChange(language === 'es' ? 'ru' : 'es')}
          title={t.language}
        >
          <Globe size={20} />
          <span className="ui-button-text">{language.toUpperCase()}</span>
        </button>
        
        <button 
          className="ui-button"
          onClick={onSave}
          title={t.save}
        >
          <Save size={20} />
          <span className="ui-button-text">{t.save}</span>
        </button>
        
        <button 
          className="ui-button ui-button-danger"
          onClick={onReset}
          title={t.reset}
        >
          <RotateCcw size={20} />
          <span className="ui-button-text">{t.reset}</span>
        </button>
      </div>
    </div>
  );
}
