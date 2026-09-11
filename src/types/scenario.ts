import { NodeMetadata } from './linked-list';

export type ScenarioId = 'punjab' | 'music' | 'train' | 'browser';

export interface ScenarioNodeSeed {
  name: string;
  metadata?: NodeMetadata;
}

export interface ScenarioDef {
  id: ScenarioId;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  nodeLabel: string;
  accentColor: string;
  accentBorder: string;
  accentBg: string;
  initialNodes: ScenarioNodeSeed[];
  presetInsertCandidates: ScenarioNodeSeed[];
  searchSuggestions: string[];
}
