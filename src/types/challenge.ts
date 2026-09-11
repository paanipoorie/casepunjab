import { OperationType } from './linked-list';

export interface ChallengeOption {
  operation: OperationType;
  targetNodeName?: string;
  newNodeName?: string;
}

export interface Challenge {
  id: string;
  title: string;
  prompt: string;
  scenarioId: string;
  taskDescription: string;
  hint: string;
  expectedOperation: OperationType;
  expectedTarget?: string;
  expectedNewValue?: string;
  explanation: string;
}
