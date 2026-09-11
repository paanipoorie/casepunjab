export interface NodeMetadata {
  category?: string;
  description?: string;
  subtitle?: string;
  badge?: string;
  icon?: string;
  customFields?: Record<string, string | number>;
}

export interface NodeData<T = string> {
  id: string;
  conceptualAddress: string; // e.g., "Node #01"
  data: T;
  metadata?: NodeMetadata;
  nextId: string | null;
}

export type OperationType = 'add_end' | 'add_beginning' | 'insert_after' | 'delete' | 'search' | 'traverse' | 'reset';

export interface CodeLineExplanation {
  lineNum: number;
  code: string;
  explanation: string;
}

export interface OperationStep<T = string> {
  stepIndex: number;
  title: string;
  description: string;
  activeNodeId?: string | null;
  targetNodeId?: string | null;
  affectedNextNodeId?: string | null;
  newNodeData?: NodeData<T> | null;
  highlightedCodeLine?: number;
  visitedNodeIds?: string[];
  pointerStateDescription?: string;
  status: 'idle' | 'checking' | 'found' | 'not_found' | 'inserting' | 'reconnecting' | 'deleting' | 'complete';
}

export interface OperationResult<T = string> {
  success: boolean;
  message: string;
  operation: OperationType;
  steps: OperationStep<T>[];
  codeSnippet: CodeLineExplanation[];
  complexity: {
    time: string;
    space: string;
    explanation: string;
  };
  beforeState: NodeData<T>[];
  afterState: NodeData<T>[];
  searchedValue?: string;
  foundIndex?: number;
  totalComparisons?: number;
}

export interface HistoryItem<T = string> {
  id: string;
  index: number;
  timestamp: string;
  operation: OperationType;
  summary: string;
  detail: string;
  nodeSnapshot: NodeData<T>[];
  result: OperationResult<T>;
}
