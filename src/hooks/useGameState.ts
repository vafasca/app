import { useState, useCallback, useEffect } from 'react';
import type {
  GameState,
  GameVariables,
  ChoiceEffect,
  ChoiceRequirement,
  Language,
  StoryData,
} from '@/types/game';
import {
  DEFAULT_VARIABLES,
  VARIABLE_LIMITS,
} from '@/types/game';

const STORAGE_KEY = 'flores_gatitos_shawarma_save_v1';

export function useGameState(storyData: StoryData | null) {
  const [gameState, setGameState] = useState<GameState>({
    currentNodeId: storyData?.start || 'intro',
    variables: { ...DEFAULT_VARIABLES },
    language: 'es',
    history: [],
  });

  const [hasSave, setHasSave] = useState(false);

  // Check for saved game on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setHasSave(true);
    }
  }, []);

  // Update current node when story data loads
  useEffect(() => {
    if (storyData && !gameState.currentNodeId) {
      setGameState(prev => ({
        ...prev,
        currentNodeId: storyData.start,
      }));
    }
  }, [storyData]);

  const applyEffects = useCallback((effects?: ChoiceEffect) => {
    if (!effects) return;

    setGameState(prev => {
      const newVariables = { ...prev.variables };
      
      Object.entries(effects).forEach(([key, value]) => {
        if (value !== undefined && key in newVariables) {
          const newValue = newVariables[key as keyof GameVariables] + value;
          newVariables[key as keyof GameVariables] = Math.max(
            VARIABLE_LIMITS.min,
            Math.min(VARIABLE_LIMITS.max, newValue)
          );
        }
      });

      return {
        ...prev,
        variables: newVariables,
      };
    });
  }, []);

  const checkRequirements = useCallback((requires?: ChoiceRequirement): boolean => {
    if (!requires) return true;

    return Object.entries(requires).every(([key, condition]) => {
      if (!condition) return true;
      
      const value = gameState.variables[key as keyof GameVariables];
      
      if (condition.min !== undefined && value < condition.min) return false;
      if (condition.max !== undefined && value > condition.max) return false;
      
      return true;
    });
  }, [gameState.variables]);

  const navigateToNode = useCallback((nodeId: string) => {
    setGameState(prev => ({
      ...prev,
      currentNodeId: nodeId,
      history: [...prev.history, prev.currentNodeId],
    }));
  }, []);

  const makeChoice = useCallback((nextNodeId: string, effects?: ChoiceEffect) => {
    applyEffects(effects);
    navigateToNode(nextNodeId);
  }, [applyEffects, navigateToNode]);

  const setLanguage = useCallback((language: Language) => {
    setGameState(prev => ({
      ...prev,
      language,
    }));
  }, []);

  const saveGame = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    setHasSave(true);
  }, [gameState]);

  const loadGame = useCallback((): boolean => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setGameState(parsed);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }, []);

  const resetGame = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHasSave(false);
    setGameState({
      currentNodeId: storyData?.start || 'intro',
      variables: { ...DEFAULT_VARIABLES },
      language: 'es',
      history: [],
    });
  }, [storyData]);

  const goBack = useCallback(() => {
    setGameState(prev => {
      if (prev.history.length === 0) return prev;
      
      const newHistory = [...prev.history];
      const previousNode = newHistory.pop();
      
      if (!previousNode) return prev;
      
      return {
        ...prev,
        currentNodeId: previousNode,
        history: newHistory,
      };
    });
  }, []);

  const getCurrentNode = useCallback(() => {
    if (!storyData) return null;
    return storyData.nodes[gameState.currentNodeId] || null;
  }, [storyData, gameState.currentNodeId]);

  const getCharacter = useCallback((characterId: string) => {
    if (!storyData) return null;
    return storyData.characters[characterId] || null;
  }, [storyData]);

  return {
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
    checkRequirements,
    applyEffects,
  };
}
