import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { LinkedList } from '../lib/linked-list-engine';
import { NodeData, NodeMetadata, OperationResult, OperationStep, OperationType, HistoryItem } from '../types/linked-list';
import { ScenarioDef, ScenarioId } from '../types/scenario';
import { SCENARIOS } from '../data/scenarios';
import confetti from 'canvas-confetti';

interface AppStateContextType {
  // Scenario & Data
  scenario: ScenarioDef;
  scenarioId: ScenarioId;
  switchScenario: (id: ScenarioId) => void;
  
  // Linked List State
  nodes: NodeData[];
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  headId: string | null;
  tailId: string | null;
  size: number;
  
  // View mode
  viewMode: 'route' | 'pointer';
  setViewMode: (mode: 'route' | 'pointer') => void;
  
  // Active Animation & Execution State
  isAnimating: boolean;
  animationSpeed: number; // in ms per step (e.g., 900, 1400, 2000)
  setAnimationSpeed: (ms: number) => void;
  currentResult: OperationResult | null;
  currentStepIndex: number;
  currentStep: OperationStep | null;
  activeOperation: OperationType | null;
  setActiveOperation: (op: OperationType | null) => void;
  
  // Step navigation controls
  stepForward: () => void;
  stepBackward: () => void;
  pauseAnimation: () => void;
  resumeAnimation: () => void;
  replayCurrentOperation: () => void;
  
  // Linked List Operations
  executeAddEnd: (data: string, metadata?: NodeMetadata) => Promise<OperationResult>;
  executeAddBeginning: (data: string, metadata?: NodeMetadata) => Promise<OperationResult>;
  executeInsertAfter: (targetIdOrName: string, data: string, metadata?: NodeMetadata) => Promise<OperationResult>;
  executeDelete: (targetIdOrName: string) => Promise<OperationResult>;
  executeSearch: (query: string) => Promise<OperationResult>;
  executeTraverse: () => Promise<OperationResult>;
  executeReset: () => void;
  
  // History
  history: HistoryItem[];
  revisitHistoryItem: (item: HistoryItem) => void;
  clearHistory: () => void;
  
  // Notification / Status Message
  bannerMessage: { text: string; type: 'info' | 'success' | 'warning' | 'error' } | null;
  setBannerMessage: (msg: { text: string; type: 'info' | 'success' | 'warning' | 'error' } | null) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scenarioId, setScenarioId] = useState<ScenarioId>('punjab');
  const scenario = SCENARIOS[scenarioId] || SCENARIOS.punjab;

  // Real Linked List instance held in ref
  const listRef = useRef<LinkedList<string>>(new LinkedList<string>());
  
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'route' | 'pointer'>('route');
  
  // Operations & Animation
  const [activeOperation, setActiveOperation] = useState<OperationType | null>(null);
  const [currentResult, setCurrentResult] = useState<OperationResult | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] = useState<number>(1100);
  const isPausedRef = useRef<boolean>(false);
  const animationTimerRef = useRef<number | null>(null);

  // History
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [bannerMessage, setBannerMessage] = useState<{ text: string; type: 'info' | 'success' | 'warning' | 'error' } | null>(null);

  // Initialize or reset list based on current scenario
  const initializeWithScenario = useCallback((sc: ScenarioDef) => {
    const list = new LinkedList<string>();
    list.fromSeeds(sc.initialNodes);
    listRef.current = list;
    const initialNodes = list.toArray();
    setNodes(initialNodes);
    setSelectedNodeId(null);
    setCurrentResult(null);
    setCurrentStepIndex(0);
    setIsAnimating(false);
    
    // Add initial history record
    const initHistory: HistoryItem = {
      id: `hist_${Date.now()}_0`,
      index: 1,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      operation: 'reset',
      summary: `Initialized ${sc.title}`,
      detail: `Initial route configured with ${initialNodes.length} stops.`,
      nodeSnapshot: initialNodes,
      result: {
        success: true,
        message: `Initialized ${sc.title} with ${initialNodes.length} landmarks.`,
        operation: 'reset',
        steps: [{
          stepIndex: 1,
          title: `Initialized ${sc.title}`,
          description: `Loaded starting sequence starting from HEAD.`,
          status: 'complete',
          pointerStateDescription: `HEAD -> ${initialNodes[0]?.conceptualAddress || 'NULL'}`
        }],
        codeSnippet: [],
        complexity: { time: "O(n)", space: "O(n)", explanation: "Initialized nodes in memory." },
        beforeState: [],
        afterState: initialNodes,
      }
    };
    setHistory([initHistory]);
    setBannerMessage({
      text: `Loaded "${sc.title}" with ${initialNodes.length} ${sc.nodeLabel.toLowerCase()}s.`,
      type: 'info'
    });
  }, []);

  // Run initial mount setup
  useEffect(() => {
    initializeWithScenario(scenario);
  }, [scenarioId, initializeWithScenario]);

  // Handle scenario switch
  const switchScenario = (id: ScenarioId) => {
    if (id === scenarioId) return;
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }
    setScenarioId(id);
  };

  // Sync current array state helper
  const syncStateFromList = () => {
    setNodes(listRef.current.toArray());
  };

  // Clean animation runner
  const playStepAnimation = useCallback((result: OperationResult, onComplete?: () => void) => {
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }

    setCurrentResult(result);
    setCurrentStepIndex(0);
    setIsAnimating(true);
    isPausedRef.current = false;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stepDuration = prefersReducedMotion ? 150 : animationSpeed;

    let step = 0;
    const totalSteps = result.steps.length;

    const tick = () => {
      if (isPausedRef.current) return;

      if (step < totalSteps - 1) {
        step++;
        setCurrentStepIndex(step);
        animationTimerRef.current = window.setTimeout(tick, stepDuration);
      } else {
        setIsAnimating(false);
        if (onComplete) onComplete();
      }
    };

    if (totalSteps > 1) {
      animationTimerRef.current = window.setTimeout(tick, stepDuration);
    } else {
      setIsAnimating(false);
      if (onComplete) onComplete();
    }
  }, [animationSpeed]);

  const addHistoryRecord = (op: OperationType, summary: string, detail: string, res: OperationResult) => {
    setHistory(prev => {
      const newItem: HistoryItem = {
        id: `hist_${Date.now()}_${prev.length + 1}`,
        index: prev.length + 1,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        operation: op,
        summary,
        detail,
        nodeSnapshot: listRef.current.toArray(),
        result: res
      };
      return [newItem, ...prev];
    });
  };

  // Operation: Add End
  const executeAddEnd = async (data: string, metadata?: NodeMetadata): Promise<OperationResult> => {
    const result = listRef.current.insertAtEndWithSteps(data, metadata);
    syncStateFromList();
    setActiveOperation('add_end');
    setBannerMessage({ text: result.message, type: result.success ? 'success' : 'error' });
    addHistoryRecord('add_end', `Added "${data}" at end`, `Connected to tail node. Total nodes: ${listRef.current.size()}`, result);
    playStepAnimation(result);
    return result;
  };

  // Operation: Add Beginning
  const executeAddBeginning = async (data: string, metadata?: NodeMetadata): Promise<OperationResult> => {
    const result = listRef.current.insertAtBeginningWithSteps(data, metadata);
    syncStateFromList();
    setActiveOperation('add_beginning');
    setBannerMessage({ text: result.message, type: result.success ? 'success' : 'error' });
    addHistoryRecord('add_beginning', `Added "${data}" at start`, `Assigned as new HEAD. Total nodes: ${listRef.current.size()}`, result);
    playStepAnimation(result);
    return result;
  };

  // Operation: Insert After
  const executeInsertAfter = async (targetIdOrName: string, data: string, metadata?: NodeMetadata): Promise<OperationResult> => {
    const result = listRef.current.insertAfterWithSteps(targetIdOrName, data, metadata);
    if (result.success) {
      syncStateFromList();
    }
    setActiveOperation('insert_after');
    setBannerMessage({ text: result.message, type: result.success ? 'success' : 'error' });
    addHistoryRecord('insert_after', `Inserted "${data}" after "${targetIdOrName}"`, result.message, result);
    playStepAnimation(result);
    return result;
  };

  // Operation: Delete
  const executeDelete = async (targetIdOrName: string): Promise<OperationResult> => {
    const result = listRef.current.deleteWithSteps(targetIdOrName);
    if (result.success) {
      syncStateFromList();
    }
    setActiveOperation('delete');
    setBannerMessage({ text: result.message, type: result.success ? 'success' : 'error' });
    addHistoryRecord('delete', `Deleted "${targetIdOrName}"`, result.message, result);
    playStepAnimation(result);
    return result;
  };

  // Operation: Search
  const executeSearch = async (query: string): Promise<OperationResult> => {
    const result = listRef.current.searchWithSteps(query);
    setActiveOperation('search');
    setBannerMessage({ text: result.message, type: result.success ? 'success' : 'warning' });
    addHistoryRecord('search', `Searched for "${query}"`, result.message, result);
    
    playStepAnimation(result, () => {
      if (result.success) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    });
    return result;
  };

  // Operation: Traverse
  const executeTraverse = async (): Promise<OperationResult> => {
    const result = listRef.current.traverseWithSteps();
    setActiveOperation('traverse');
    setBannerMessage({ text: result.message, type: 'info' });
    addHistoryRecord('traverse', `Traversed entire route`, `Visited all ${listRef.current.size()} nodes sequentially.`, result);
    playStepAnimation(result);
    return result;
  };

  // Operation: Reset
  const executeReset = () => {
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }
    initializeWithScenario(scenario);
  };

  // History Replay
  const revisitHistoryItem = (item: HistoryItem) => {
    setCurrentResult(item.result);
    setCurrentStepIndex(item.result.steps.length - 1);
    setActiveOperation(item.operation);
    setBannerMessage({ text: `Viewing snapshot from: ${item.summary}`, type: 'info' });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  // Step control functions
  const pauseAnimation = () => {
    isPausedRef.current = true;
    setIsAnimating(false);
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }
  };

  const resumeAnimation = () => {
    if (!currentResult) return;
    if (currentStepIndex >= currentResult.steps.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsAnimating(true);
    isPausedRef.current = false;
    
    const totalSteps = currentResult.steps.length;
    let step = currentStepIndex;

    const tick = () => {
      if (isPausedRef.current) return;
      if (step < totalSteps - 1) {
        step++;
        setCurrentStepIndex(step);
        animationTimerRef.current = window.setTimeout(tick, animationSpeed);
      } else {
        setIsAnimating(false);
      }
    };
    animationTimerRef.current = window.setTimeout(tick, animationSpeed);
  };

  const stepForward = () => {
    pauseAnimation();
    if (currentResult && currentStepIndex < currentResult.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const stepBackward = () => {
    pauseAnimation();
    if (currentResult && currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const replayCurrentOperation = () => {
    if (!currentResult) return;
    playStepAnimation(currentResult);
  };

  const headId = nodes[0]?.id || null;
  const tailId = nodes[nodes.length - 1]?.id || null;
  const currentStep = currentResult?.steps[currentStepIndex] || null;

  return (
    <AppStateContext.Provider
      value={{
        scenario,
        scenarioId,
        switchScenario,
        nodes,
        selectedNodeId,
        setSelectedNodeId,
        headId,
        tailId,
        size: nodes.length,
        viewMode,
        setViewMode,
        isAnimating,
        animationSpeed,
        setAnimationSpeed,
        currentResult,
        currentStepIndex,
        currentStep,
        activeOperation,
        setActiveOperation,
        stepForward,
        stepBackward,
        pauseAnimation,
        resumeAnimation,
        replayCurrentOperation,
        executeAddEnd,
        executeAddBeginning,
        executeInsertAfter,
        executeDelete,
        executeSearch,
        executeTraverse,
        executeReset,
        history,
        revisitHistoryItem,
        clearHistory,
        bannerMessage,
        setBannerMessage,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
