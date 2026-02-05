import { useState, useEffect, useCallback } from 'react';
import type { StoryData, Language, StoryNode } from '@/types/game';
import { useGameState } from '@/hooks/useGameState';
import { Scene } from '@/components/Scene';
import { DialogueBox } from '@/components/DialogueBox';
import { ChoicesList } from '@/components/ChoicesList';
import { StatsBar } from '@/components/StatsBar';
import { StartScreen } from '@/components/StartScreen';
import { EndScreen } from '@/components/EndScreen';
import { GameUI } from '@/components/GameUI';
import './App.css';

type GameScreen = 'start' | 'game' | 'final_scene' | 'end';

function App() {
  const [storyData, setStoryData] = useState<StoryData | null>(null);
  const [screen, setScreen] = useState<GameScreen>('start');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogueComplete, setDialogueComplete] = useState(false);
  const [finalNode, setFinalNode] = useState<StoryNode | null>(null);

  const {
    gameState,
    hasSave,
    makeChoice,
    setLanguage,
    saveGame,
    loadGame,
    resetGame,
    goBack,
    getCurrentNode,
    getCharacter,
  } = useGameState(storyData);

  // Load story data
  useEffect(() => {
    fetch('./story.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load story');
        return res.json();
      })
      .then((data: StoryData) => {
        setStoryData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Check if current node is an ending - show final scene first
  useEffect(() => {
    const node = getCurrentNode();
    if (node?.end && screen === 'game') {
      // Store the final node and show the final scene first
      setFinalNode(node);
      setScreen('final_scene');
      setDialogueComplete(false);
    }
  }, [gameState.currentNodeId, screen, getCurrentNode]);

  const handleNewGame = useCallback(() => {
    resetGame();
    setScreen('game');
    setFinalNode(null);
  }, [resetGame]);

  const handleContinue = useCallback(() => {
    const loaded = loadGame();
    if (loaded) {
      setScreen('game');
      setFinalNode(null);
    }
  }, [loadGame]);

  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
  }, [setLanguage]);

  const handleSave = useCallback(() => {
    saveGame();
    // Show save notification
    const notification = document.createElement('div');
    notification.className = 'save-notification';
    notification.textContent = gameState.language === 'es' ? '¡Guardado!' : 'Сохранено!';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
  }, [saveGame, gameState.language]);

  const handleReset = useCallback(() => {
    if (window.confirm(
      gameState.language === 'es' 
        ? '¿Estás segura de que quieres reiniciar? Se perderá el progreso no guardado.'
        : 'Вы уверены, что хотите сбросить? Несохраненный прогресс будет потерян.'
    )) {
      resetGame();
      setFinalNode(null);
    }
  }, [resetGame, gameState.language]);

  const handleMainMenu = useCallback(() => {
    setScreen('start');
    setFinalNode(null);
  }, []);

  const handleChoice = useCallback((nextNodeId: string, effects?: { confianza?: number; complicidad?: number; autonomia?: number; humor?: number }) => {
    setDialogueComplete(false);
    makeChoice(nextNodeId, effects);
  }, [makeChoice]);

  const handleDialogueComplete = useCallback(() => {
    setDialogueComplete(true);
  }, []);

  const handleShowFinalEnd = useCallback(() => {
    setScreen('end');
  }, []);

  const handleRestart = useCallback(() => {
    resetGame();
    setScreen('game');
    setFinalNode(null);
  }, [resetGame]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">🌸</div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <p>Error: {error}</p>
      </div>
    );
  }

  const currentNode = getCurrentNode();
  const currentCharacter = currentNode?.character 
    ? getCharacter(currentNode.character) 
    : null;
  
  const finalCharacter = finalNode?.character 
    ? getCharacter(finalNode.character) 
    : null;

  return (
    <div className="app">
      {screen === 'start' && (
        <StartScreen
          hasSave={hasSave}
          language={gameState.language}
          onNewGame={handleNewGame}
          onContinue={handleContinue}
          onLanguageChange={handleLanguageChange}
        />
      )}

      {screen === 'game' && (
        <div className="game-container">
          <GameUI
            language={gameState.language}
            onSave={handleSave}
            onLanguageChange={handleLanguageChange}
            onReset={handleReset}
            onMainMenu={handleMainMenu}
            onBack={goBack}
            canGoBack={gameState.history.length > 0}
          />

          <div className="game-main">
            <Scene 
              node={currentNode} 
              character={currentCharacter}
              language={gameState.language}
            />

            <div className="game-interface">
              <StatsBar 
                variables={gameState.variables} 
                language={gameState.language} 
              />

              <DialogueBox
                node={currentNode}
                character={currentCharacter}
                language={gameState.language}
                onComplete={handleDialogueComplete}
              />

              {dialogueComplete && currentNode && !currentNode.end && (
                <ChoicesList
                  choices={currentNode.choices}
                  language={gameState.language}
                  variables={gameState.variables}
                  onChoice={handleChoice}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Final Scene - Show the ending node content first */}
      {screen === 'final_scene' && finalNode && (
        <div className="game-container">
          <GameUI
            language={gameState.language}
            onSave={handleSave}
            onLanguageChange={handleLanguageChange}
            onReset={handleReset}
            onMainMenu={handleMainMenu}
            onBack={goBack}
            canGoBack={false}
          />

          <div className="game-main">
            <Scene 
              node={finalNode} 
              character={finalCharacter}
              language={gameState.language}
            />

            <div className="game-interface">
              <StatsBar 
                variables={gameState.variables} 
                language={gameState.language} 
              />

              <DialogueBox
                node={finalNode}
                character={finalCharacter}
                language={gameState.language}
                onComplete={handleDialogueComplete}
              />

              {dialogueComplete && (
                <div className="final-scene-choices">
                  <button 
                    className="final-scene-button"
                    onClick={handleShowFinalEnd}
                  >
                    {gameState.language === 'es' ? 'Ver el final de la historia →' : 'Увидеть конец истории →'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {screen === 'end' && (
        <EndScreen
          language={gameState.language}
          variables={gameState.variables}
          onRestart={handleRestart}
          onMainMenu={handleMainMenu}
        />
      )}
    </div>
  );
}

export default App;
