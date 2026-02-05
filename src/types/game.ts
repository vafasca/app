export interface GameVariables {
  confianza: number;
  complicidad: number;
  autonomia: number;
  humor: number;
}

export interface ChoiceEffect {
  confianza?: number;
  complicidad?: number;
  autonomia?: number;
  humor?: number;
}

export interface ChoiceRequirement {
  confianza?: { min?: number; max?: number };
  complicidad?: { min?: number; max?: number };
  autonomia?: { min?: number; max?: number };
  humor?: { min?: number; max?: number };
}

export interface Choice {
  text_es: string;
  text_ru: string;
  next: string;
  effects?: ChoiceEffect;
  requires?: ChoiceRequirement;
}

export interface StoryNode {
  id: string;
  title: string;
  background: string;
  character?: string;
  imageFront?: string;
  text_es: string;
  text_ru: string;
  choices: Choice[];
  end?: boolean;
}

export interface Character {
  name_es: string;
  name_ru: string;
  image: string;
}

export interface StoryData {
  start: string;
  characters: Record<string, Character>;
  nodes: Record<string, StoryNode>;
}

export type Language = 'es' | 'ru';

export interface GameState {
  currentNodeId: string;
  variables: GameVariables;
  language: Language;
  history: string[];
}

export const DEFAULT_VARIABLES: GameVariables = {
  confianza: 50,
  complicidad: 50,
  autonomia: 50,
  humor: 50,
};

export const VARIABLE_LIMITS = {
  min: 0,
  max: 100,
};
