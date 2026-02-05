import type { Language } from '@/types/game';

interface StartScreenProps {
  hasSave: boolean;
  language: Language;
  onNewGame: () => void;
  onContinue: () => void;
  onLanguageChange: (lang: Language) => void;
}

export function StartScreen({ 
  hasSave, 
  language, 
  onNewGame, 
  onContinue, 
  onLanguageChange 
}: StartScreenProps) {
  const texts = {
    es: {
      title: 'Feliz Cumpleaños princesa!',
      subtitle: 'Una novela visual sobre el amor y las decisiones',
      newGame: 'Nueva Partida',
      continue: 'Continuar',
      language: 'Idioma',
      names: 'Dasha & Bruno',
    },
    ru: {
      title: 'С днем ​​рождения, принцесса!',
      subtitle: 'Визуальная новелла о любви и решениях',
      newGame: 'Новая Игра',
      continue: 'Продолжить',
      language: 'Язык',
      names: 'Даша и Бруно',
    },
  };

  const t = texts[language];

  return (
    <div className="start-screen">
      {/* Background Image */}
      <div className="start-background">
        <img 
          src="assets/backgrounds/menu_background.jpg" 
          alt="Dasha y Bruno en Kemerovo" 
          className="start-background-image"
        />
        <div className="start-background-overlay" />
      </div>

      <div className="start-screen-content">
        <div className="start-names">{t.names}</div>
        <h1 className="start-title">{t.title}</h1>
        <p className="start-subtitle">{t.subtitle}</p>
        
        <div className="start-buttons">
          {hasSave && (
            <button 
              className="start-button start-button-primary"
              onClick={onContinue}
            >
              {t.continue}
            </button>
          )}
          
          <button 
            className="start-button"
            onClick={onNewGame}
          >
            {t.newGame}
          </button>
        </div>

        <div className="start-language">
          <span className="start-language-label">{t.language}:</span>
          <div className="start-language-buttons">
            <button
              className={`language-button ${language === 'es' ? 'active' : ''}`}
              onClick={() => onLanguageChange('es')}
            >
              ES
            </button>
            <button
              className={`language-button ${language === 'ru' ? 'active' : ''}`}
              onClick={() => onLanguageChange('ru')}
            >
              RU
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="start-decoration">
        <span className="start-flower">🌸</span>
        <span className="start-cat">🐱</span>
        <span className="start-shawarma">🌯</span>
      </div>
    </div>
  );
}
