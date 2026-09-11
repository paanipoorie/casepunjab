import { NodeData, NodeMetadata, OperationResult, OperationStep, OperationType } from '../types/linked-list';
import { CODE_SNIPPETS } from './code-snippets';

export class LLNode<T = string> {
  public id: string;
  public conceptualAddress: string;
  public data: T;
  public metadata?: NodeMetadata;
  public next: LLNode<T> | null = null;

  constructor(id: string, conceptualAddress: string, data: T, metadata?: NodeMetadata) {
    this.id = id;
    this.conceptualAddress = conceptualAddress;
    this.data = data;
    this.metadata = metadata;
    this.next = null;
  }

  public toNodeData(): NodeData<T> {
    return {
      id: this.id,
      conceptualAddress: this.conceptualAddress,
      data: this.data,
      metadata: this.metadata,
      nextId: this.next ? this.next.id : null,
    };
  }
}

export class LinkedList<T = string> {
  public head: LLNode<T> | null = null;
  private nodeCounter: number = 1;

  constructor() {
    this.head = null;
    this.nodeCounter = 1;
  }

  private generateNodeId(): string {
    const id = `node_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    return id;
  }

  private generateConceptualAddress(): string {
    const num = this.nodeCounter++;
    return `Node #${num.toString().padStart(2, '0')}`;
  }

  public size(): number {
    let count = 0;
    let curr = this.head;
    while (curr) {
      count++;
      curr = curr.next;
    }
    return count;
  }

  public isEmpty(): boolean {
    return this.head === null;
  }

  public toArray(): NodeData<T>[] {
    const result: NodeData<T>[] = [];
    let curr = this.head;
    while (curr) {
      result.push(curr.toNodeData());
      curr = curr.next;
    }
    return result;
  }

  public getHead(): LLNode<T> | null {
    return this.head;
  }

  public fromSeeds(seeds: { name: T; metadata?: NodeMetadata }[]): void {
    this.head = null;
    this.nodeCounter = 1;
    let prev: LLNode<T> | null = null;

    for (const seed of seeds) {
      const newNode = new LLNode<T>(
        this.generateNodeId(),
        this.generateConceptualAddress(),
        seed.name,
        seed.metadata
      );
      if (!this.head) {
        this.head = newNode;
      } else if (prev) {
        prev.next = newNode;
      }
      prev = newNode;
    }
  }

  public clone(): LinkedList<T> {
    const cloned = new LinkedList<T>();
    let curr = this.head;
    let prev: LLNode<T> | null = null;
    while (curr) {
      const copy = new LLNode<T>(curr.id, curr.conceptualAddress, curr.data, curr.metadata);
      if (!cloned.head) {
        cloned.head = copy;
      } else if (prev) {
        prev.next = copy;
      }
      prev = copy;
      curr = curr.next;
    }
    cloned.nodeCounter = this.nodeCounter;
    return cloned;
  }

  /**
   * Insert at the end of the linked list
   */
  public insertAtEndWithSteps(data: T, metadata?: NodeMetadata): OperationResult {
    const beforeState = this.toArray();
    const steps: OperationStep[] = [];
    const newNode = new LLNode<T>(
      this.generateNodeId(),
      this.generateConceptualAddress(),
      data,
      metadata
    );

    // Step 1: Allocate new node
    steps.push({
      stepIndex: 1,
      title: `Allocate New Node: "${String(data)}"`,
      description: `Created new ${newNode.conceptualAddress} with data "${String(data)}" and next set to NULL.`,
      newNodeData: newNode.toNodeData(),
      highlightedCodeLine: 1,
      status: 'inserting',
      pointerStateDescription: `New Node (${newNode.conceptualAddress}) -> NULL`
    });

    if (!this.head) {
      // Step 2: Empty list case -> head = newNode
      this.head = newNode;
      steps.push({
        stepIndex: 2,
        title: "Assign as HEAD",
        description: "The list was empty. HEAD now points directly to this new node.",
        activeNodeId: newNode.id,
        highlightedCodeLine: 2,
        status: 'complete',
        pointerStateDescription: `HEAD -> ${newNode.conceptualAddress} -> NULL`
      });
    } else {
      // Step 2: Start traversal from head to find tail
      let current = this.head;
      const visitedIds: string[] = [current.id];

      steps.push({
        stepIndex: 2,
        title: "Start Traversal at HEAD",
        description: `Pointer current initialized at HEAD (${current.conceptualAddress}: "${String(current.data)}").`,
        activeNodeId: current.id,
        visitedNodeIds: [...visitedIds],
        highlightedCodeLine: 3,
        status: 'checking',
        pointerStateDescription: `current -> ${current.conceptualAddress}`
      });

      let stepNum = 3;
      while (current.next !== null) {
        current = current.next;
        visitedIds.push(current.id);
        steps.push({
          stepIndex: stepNum++,
          title: `Traverse towards tail -> ${current.conceptualAddress}`,
          description: `Advance current pointer to next node "${String(current.data)}" (current = current->next).`,
          activeNodeId: current.id,
          visitedNodeIds: [...visitedIds],
          highlightedCodeLine: 4,
          status: 'checking',
          pointerStateDescription: `current -> ${current.conceptualAddress}`
        });
      }

      // Found the tail! Now link current->next = newNode
      current.next = newNode;

      steps.push({
        stepIndex: stepNum,
        title: `Connect Tail (${current.conceptualAddress}) to New Node`,
        description: `Set ${current.conceptualAddress}->next = ${newNode.conceptualAddress}. The chain is now extended.`,
        activeNodeId: current.id,
        affectedNextNodeId: newNode.id,
        newNodeData: newNode.toNodeData(),
        highlightedCodeLine: 5,
        status: 'reconnecting',
        pointerStateDescription: `${current.conceptualAddress}->next = ${newNode.conceptualAddress}; ${newNode.conceptualAddress}->next = NULL`
      });

      steps.push({
        stepIndex: stepNum + 1,
        title: "Addition Complete",
        description: `"${String(data)}" is now the final landmark in the tour.`,
        activeNodeId: newNode.id,
        status: 'complete',
        pointerStateDescription: `Tail is now ${newNode.conceptualAddress}`
      });
    }

    const afterState = this.toArray();
    return {
      success: true,
      message: `Successfully added "${String(data)}" at the end of the route.`,
      operation: 'add_end',
      steps,
      codeSnippet: CODE_SNIPPETS.add_end,
      complexity: {
        time: "O(n) [without tail pointer] / O(1) [with tail pointer]",
        space: "O(1) auxiliary space",
        explanation: "Must traverse from HEAD through all n nodes to locate the current tail before linking."
      },
      beforeState,
      afterState,
    };
  }

  /**
   * Insert at the beginning of the linked list (new HEAD)
   */
  public insertAtBeginningWithSteps(data: T, metadata?: NodeMetadata): OperationResult {
    const beforeState = this.toArray();
    const steps: OperationStep[] = [];
    const newNode = new LLNode<T>(
      this.generateNodeId(),
      this.generateConceptualAddress(),
      data,
      metadata
    );

    steps.push({
      stepIndex: 1,
      title: `Allocate New Node: "${String(data)}"`,
      description: `Created new ${newNode.conceptualAddress} with data "${String(data)}".`,
      newNodeData: newNode.toNodeData(),
      highlightedCodeLine: 1,
      status: 'inserting',
      pointerStateDescription: `newNode (${newNode.conceptualAddress})`
    });

    newNode.next = this.head;
    steps.push({
      stepIndex: 2,
      title: "Point New Node's Next to Current HEAD",
      description: `Set newNode->next = head (${this.head ? this.head.conceptualAddress : 'NULL'}).`,
      newNodeData: newNode.toNodeData(),
      affectedNextNodeId: this.head ? this.head.id : null,
      highlightedCodeLine: 2,
      status: 'reconnecting',
      pointerStateDescription: `${newNode.conceptualAddress}->next = ${this.head ? this.head.conceptualAddress : 'NULL'}`
    });

    this.head = newNode;
    steps.push({
      stepIndex: 3,
      title: "Update HEAD Pointer",
      description: `Set head = newNode (${newNode.conceptualAddress}). New node is now the starting point!`,
      activeNodeId: newNode.id,
      highlightedCodeLine: 3,
      status: 'complete',
      pointerStateDescription: `HEAD -> ${newNode.conceptualAddress}`
    });

    const afterState = this.toArray();
    return {
      success: true,
      message: `Inserted "${String(data)}" at the beginning as new HEAD.`,
      operation: 'add_beginning',
      steps,
      codeSnippet: CODE_SNIPPETS.add_beginning,
      complexity: {
        time: "O(1)",
        space: "O(1)",
        explanation: "Constant time operation: only two pointer updates required regardless of list length."
      },
      beforeState,
      afterState,
    };
  }

  /**
   * Insert after a specific target node
   */
  public insertAfterWithSteps(targetIdentifier: string, data: T, metadata?: NodeMetadata): OperationResult {
    const beforeState = this.toArray();
    const steps: OperationStep[] = [];

    // Step 1: Find target node
    let current = this.head;
    const visitedIds: string[] = [];
    let found = false;

    while (current) {
      visitedIds.push(current.id);
      if (current.id === targetIdentifier || String(current.data).toLowerCase() === targetIdentifier.toLowerCase()) {
        found = true;
        break;
      }
      current = current.next;
    }

    if (!found || !current) {
      return {
        success: false,
        message: `Could not insert: landmark "${targetIdentifier}" was not found in the list.`,
        operation: 'insert_after',
        steps: [{
          stepIndex: 1,
          title: "Target Landmark Not Found",
          description: `Searched through route but could not find "${targetIdentifier}".`,
          status: 'not_found'
        }],
        codeSnippet: CODE_SNIPPETS.insert_after,
        complexity: {
          time: "O(n)",
          space: "O(1)",
          explanation: "Must locate the target node first, which takes O(n) traversal."
        },
        beforeState,
        afterState: beforeState,
      };
    }

    const targetNode = current;
    const successorNode = current.next;
    const newNode = new LLNode<T>(
      this.generateNodeId(),
      this.generateConceptualAddress(),
      data,
      metadata
    );

    // Step 1: Highlight current node
    steps.push({
      stepIndex: 1,
      title: `1. Identify Predecessor Node: "${String(targetNode.data)}"`,
      description: `Target located at ${targetNode.conceptualAddress} ("${String(targetNode.data)}"). Next pointer currently points to ${successorNode ? `${successorNode.conceptualAddress} ("${String(successorNode.data)}")` : 'NULL'}.`,
      activeNodeId: targetNode.id,
      affectedNextNodeId: successorNode ? successorNode.id : null,
      highlightedCodeLine: 1,
      status: 'checking',
      pointerStateDescription: `current is ${targetNode.conceptualAddress}`
    });

    // Step 2: Show new node created
    steps.push({
      stepIndex: 2,
      title: `2. Allocate New Node: "${String(data)}"`,
      description: `Created new node ${newNode.conceptualAddress} with data "${String(data)}".`,
      activeNodeId: targetNode.id,
      newNodeData: newNode.toNodeData(),
      highlightedCodeLine: 1,
      status: 'inserting',
      pointerStateDescription: `newNode = ${newNode.conceptualAddress}`
    });

    // Step 3: Connect newNode->next to current->next
    newNode.next = successorNode;
    steps.push({
      stepIndex: 3,
      title: `3. Connect New Node to Successor: (newNode->next = current->next)`,
      description: `Set ${newNode.conceptualAddress}->next = ${successorNode ? `${successorNode.conceptualAddress} ("${String(successorNode.data)}")` : 'NULL'}. Crucial order: preserves link to remaining chain!`,
      activeNodeId: targetNode.id,
      newNodeData: newNode.toNodeData(),
      affectedNextNodeId: successorNode ? successorNode.id : null,
      highlightedCodeLine: 2,
      status: 'reconnecting',
      pointerStateDescription: `${newNode.conceptualAddress}->next -> ${successorNode ? successorNode.conceptualAddress : 'NULL'}`
    });

    // Step 4: Reconnect current->next to newNode
    targetNode.next = newNode;
    steps.push({
      stepIndex: 4,
      title: `4. Connect Predecessor to New Node: (current->next = newNode)`,
      description: `Redirect ${targetNode.conceptualAddress}->next to ${newNode.conceptualAddress}. The new node is safely spliced into the list!`,
      activeNodeId: targetNode.id,
      targetNodeId: newNode.id,
      affectedNextNodeId: successorNode ? successorNode.id : null,
      highlightedCodeLine: 3,
      status: 'reconnecting',
      pointerStateDescription: `${targetNode.conceptualAddress}->next -> ${newNode.conceptualAddress}`
    });

    // Step 5: Settle
    steps.push({
      stepIndex: 5,
      title: "5. Insertion Complete",
      description: `Route updated: "${String(targetNode.data)}" -> "${String(newNode.data)}" -> "${successorNode ? String(successorNode.data) : 'NULL'}".`,
      activeNodeId: newNode.id,
      status: 'complete',
      pointerStateDescription: `Chain successfully reconnected.`
    });

    const afterState = this.toArray();
    return {
      success: true,
      message: `Successfully inserted "${String(data)}" after "${String(targetNode.data)}".`,
      operation: 'insert_after',
      steps,
      codeSnippet: CODE_SNIPPETS.insert_after,
      complexity: {
        time: "O(1) [pointer reconnection alone] / O(n) [with node lookup]",
        space: "O(1)",
        explanation: "Once the predecessor node pointer is in hand, inserting requires only two pointer reassignments (O(1))."
      },
      beforeState,
      afterState,
    };
  }

  /**
   * Delete a node by name or id
   */
  public deleteWithSteps(targetIdentifier: string): OperationResult {
    const beforeState = this.toArray();
    const steps: OperationStep[] = [];

    if (!this.head) {
      return {
        success: false,
        message: "Cannot delete: list is empty.",
        operation: 'delete',
        steps: [{
          stepIndex: 1,
          title: "List is Empty",
          description: "Head is NULL. There are no nodes to delete.",
          status: 'not_found'
        }],
        codeSnippet: CODE_SNIPPETS.delete,
        complexity: { time: "O(1)", space: "O(1)", explanation: "List is empty." },
        beforeState,
        afterState: beforeState,
      };
    }

    // Case 1: Deleting HEAD
    if (this.head.id === targetIdentifier || String(this.head.data).toLowerCase() === targetIdentifier.toLowerCase()) {
      const oldHead = this.head;
      const newHead = this.head.next;

      steps.push({
        stepIndex: 1,
        title: `1. Target Node is HEAD (${oldHead.conceptualAddress}: "${String(oldHead.data)}")`,
        description: `Target "${String(oldHead.data)}" is at the very beginning of the linked list.`,
        activeNodeId: oldHead.id,
        highlightedCodeLine: 1,
        status: 'checking',
        pointerStateDescription: `head is ${oldHead.conceptualAddress}`
      });

      steps.push({
        stepIndex: 2,
        title: `2. Advance HEAD Pointer: (head = head->next)`,
        description: `Point HEAD to successor ${newHead ? `${newHead.conceptualAddress} ("${String(newHead.data)}")` : 'NULL'}.`,
        activeNodeId: oldHead.id,
        affectedNextNodeId: newHead ? newHead.id : null,
        highlightedCodeLine: 1,
        status: 'deleting',
        pointerStateDescription: `HEAD -> ${newHead ? newHead.conceptualAddress : 'NULL'}`
      });

      this.head = newHead;

      steps.push({
        stepIndex: 3,
        title: `3. Deallocate Old Head: (delete temp)`,
        description: `Node "${String(oldHead.data)}" is unlinked and freed from memory.`,
        targetNodeId: oldHead.id,
        highlightedCodeLine: 6,
        status: 'complete',
        pointerStateDescription: `Deletion complete.`
      });

      const afterState = this.toArray();
      return {
        success: true,
        message: `Successfully deleted "${String(oldHead.data)}" from the beginning of the route.`,
        operation: 'delete',
        steps,
        codeSnippet: CODE_SNIPPETS.delete,
        complexity: {
          time: "O(1)",
          space: "O(1)",
          explanation: "Deleting the head node only requires updating the HEAD pointer to head->next."
        },
        beforeState,
        afterState,
      };
    }

    // Case 2: Deleting middle or tail node
    let current: LLNode<T> | null = this.head;
    const visitedIds: string[] = [current.id];
    let found = false;

    steps.push({
      stepIndex: 1,
      title: `1. Initialize Search for Target Predecessor`,
      description: `Start at HEAD (${current.conceptualAddress}: "${String(current.data)}") to find node preceding "${targetIdentifier}".`,
      activeNodeId: current.id,
      visitedNodeIds: [...visitedIds],
      highlightedCodeLine: 2,
      status: 'checking',
      pointerStateDescription: `current -> ${current.conceptualAddress}`
    });

    let stepNum = 2;
    while (current && current.next) {
      if (current.next.id === targetIdentifier || String(current.next.data).toLowerCase() === targetIdentifier.toLowerCase()) {
        found = true;
        break;
      }
      current = current.next;
      visitedIds.push(current.id);

      steps.push({
        stepIndex: stepNum++,
        title: `Traverse: Check ${current.conceptualAddress}`,
        description: `Examining "${String(current.data)}". Next node is "${current.next ? String(current.next.data) : 'NULL'}".`,
        activeNodeId: current.id,
        visitedNodeIds: [...visitedIds],
        highlightedCodeLine: 3,
        status: 'checking',
        pointerStateDescription: `current -> ${current.conceptualAddress}`
      });
    }

    if (!found || !current || !current.next) {
      return {
        success: false,
        message: `Cannot delete: landmark "${targetIdentifier}" was not found in the list.`,
        operation: 'delete',
        steps: [
          ...steps,
          {
            stepIndex: stepNum,
            title: "Target Landmark Not Found",
            description: `Reached end of route. "${targetIdentifier}" does not exist in the linked list.`,
            status: 'not_found'
          }
        ],
        codeSnippet: CODE_SNIPPETS.delete,
        complexity: {
          time: "O(n)",
          space: "O(1)",
          explanation: "Searched entire list of n nodes."
        },
        beforeState,
        afterState: beforeState,
      };
    }

    const predecessorNode = current;
    const targetNode = current.next;
    const successorNode = targetNode.next;

    // Step: Identify nodes
    steps.push({
      stepIndex: stepNum++,
      title: `2. Predecessor and Target Identified`,
      description: `Predecessor: ${predecessorNode.conceptualAddress} ("${String(predecessorNode.data)}"), Target to delete: ${targetNode.conceptualAddress} ("${String(targetNode.data)}"), Successor: ${successorNode ? `${successorNode.conceptualAddress} ("${String(successorNode.data)}")` : 'NULL'}.`,
      activeNodeId: predecessorNode.id,
      targetNodeId: targetNode.id,
      affectedNextNodeId: successorNode ? successorNode.id : null,
      highlightedCodeLine: 4,
      status: 'checking',
      pointerStateDescription: `current=${predecessorNode.conceptualAddress}, nodeToDelete=${targetNode.conceptualAddress}`
    });

    // Step: Pointer redirection
    predecessorNode.next = successorNode;
    steps.push({
      stepIndex: stepNum++,
      title: `3. Bypass Target Node: (current->next = current->next->next)`,
      description: `Redirect ${predecessorNode.conceptualAddress}->next to skip ${targetNode.conceptualAddress} and point directly to ${successorNode ? `${successorNode.conceptualAddress} ("${String(successorNode.data)}")` : 'NULL'}.`,
      activeNodeId: predecessorNode.id,
      targetNodeId: targetNode.id,
      affectedNextNodeId: successorNode ? successorNode.id : null,
      highlightedCodeLine: 5,
      status: 'deleting',
      pointerStateDescription: `${predecessorNode.conceptualAddress}->next -> ${successorNode ? successorNode.conceptualAddress : 'NULL'}`
    });

    // Step: Deallocation & completion
    steps.push({
      stepIndex: stepNum,
      title: `4. Free Node and Finalize`,
      description: `Node "${String(targetNode.data)}" is detached from the route and deleted from memory.`,
      targetNodeId: targetNode.id,
      highlightedCodeLine: 6,
      status: 'complete',
      pointerStateDescription: `Route successfully reconnected.`
    });

    const afterState = this.toArray();
    return {
      success: true,
      message: `Successfully deleted "${String(targetNode.data)}" from the route.`,
      operation: 'delete',
      steps,
      codeSnippet: CODE_SNIPPETS.delete,
      complexity: {
        time: "O(n)",
        space: "O(1)",
        explanation: "Must traverse sequentially to locate the predecessor node before updating its next pointer."
      },
      beforeState,
      afterState,
    };
  }

  /**
   * Search for a node by value
   */
  public searchWithSteps(query: string): OperationResult {
    const beforeState = this.toArray();
    const steps: OperationStep[] = [];
    const normalizedQuery = query.trim().toLowerCase();

    if (!this.head) {
      return {
        success: false,
        message: `Search failed: the route is empty.`,
        operation: 'search',
        steps: [{
          stepIndex: 1,
          title: "List is Empty",
          description: "Head is NULL. Cannot search an empty list.",
          status: 'not_found'
        }],
        codeSnippet: CODE_SNIPPETS.search,
        complexity: { time: "O(1)", space: "O(1)", explanation: "List is empty." },
        beforeState,
        afterState: beforeState,
        searchedValue: query,
        totalComparisons: 0
      };
    }

    let current: LLNode<T> | null = this.head;
    let index = 0;
    let foundNode: LLNode<T> | null = null;
    let foundIndex = -1;
    const visitedIds: string[] = [];

    // Step 1: Initialize pointer
    steps.push({
      stepIndex: 1,
      title: "1. Initialize Traversal at HEAD",
      description: `Set pointer current = HEAD (${current.conceptualAddress}). Searching for target: "${query}".`,
      activeNodeId: current.id,
      visitedNodeIds: [current.id],
      highlightedCodeLine: 1,
      status: 'checking',
      pointerStateDescription: `current -> ${current.conceptualAddress}`
    });

    let stepNum = 2;
    while (current) {
      visitedIds.push(current.id);
      const isMatch = String(current.data).trim().toLowerCase() === normalizedQuery;

      steps.push({
        stepIndex: stepNum++,
        title: `Checking Node #${(index + 1).toString().padStart(2, '0')}: "${String(current.data)}"`,
        description: `Comparing current->data ("${String(current.data)}") with target ("${query}")... ${isMatch ? 'MATCH FOUND!' : 'No match.'}`,
        activeNodeId: current.id,
        visitedNodeIds: [...visitedIds],
        highlightedCodeLine: 4,
        status: isMatch ? 'found' : 'checking',
        pointerStateDescription: `Comparing at index ${index}`
      });

      if (isMatch) {
        foundNode = current;
        foundIndex = index;
        break;
      }

      current = current.next;
      index++;

      if (current) {
        steps.push({
          stepIndex: stepNum++,
          title: `Advance Pointer: current = current->next`,
          description: `Move pointer to next node ${current.conceptualAddress} ("${String(current.data)}").`,
          activeNodeId: current.id,
          visitedNodeIds: [...visitedIds],
          highlightedCodeLine: 5,
          status: 'checking',
          pointerStateDescription: `current -> ${current.conceptualAddress}`
        });
      }
    }

    if (foundNode) {
      steps.push({
        stepIndex: stepNum,
        title: `Search Complete: Found "${String(foundNode.data)}"`,
        description: `Found landmark "${String(foundNode.data)}" at position #${foundIndex + 1} after ${foundIndex + 1} comparison(s).`,
        activeNodeId: foundNode.id,
        visitedNodeIds: [...visitedIds],
        status: 'found',
        pointerStateDescription: `Target reached successfully.`
      });

      return {
        success: true,
        message: `Found landmark "${String(foundNode.data)}" at position #${foundIndex + 1} (${foundIndex + 1} comparisons).`,
        operation: 'search',
        steps,
        codeSnippet: CODE_SNIPPETS.search,
        complexity: {
          time: `O(k) where k=${foundIndex + 1} ≤ O(n)`,
          space: "O(1)",
          explanation: "Linear search: must traverse sequentially from HEAD until matching node is found."
        },
        beforeState,
        afterState: beforeState,
        searchedValue: query,
        foundIndex,
        totalComparisons: foundIndex + 1
      };
    } else {
      steps.push({
        stepIndex: stepNum,
        title: `Search Complete: Landmark Not Found`,
        description: `Reached NULL after checking all ${visitedIds.length} node(s). "${query}" is not in the route.`,
        visitedNodeIds: [...visitedIds],
        highlightedCodeLine: 6,
        status: 'not_found',
        pointerStateDescription: `current == NULL`
      });

      return {
        success: false,
        message: `Landmark "${query}" was not found in the route after ${visitedIds.length} comparisons.`,
        operation: 'search',
        steps,
        codeSnippet: CODE_SNIPPETS.search,
        complexity: {
          time: "O(n)",
          space: "O(1)",
          explanation: "Worst case: target node is absent or at the end, requiring full traversal of all n nodes."
        },
        beforeState,
        afterState: beforeState,
        searchedValue: query,
        foundIndex: -1,
        totalComparisons: visitedIds.length
      };
    }
  }

  /**
   * Traverse all nodes sequentially
   */
  public traverseWithSteps(): OperationResult {
    const beforeState = this.toArray();
    const steps: OperationStep[] = [];
    const totalNodes = beforeState.length;

    if (!this.head) {
      return {
        success: true,
        message: "Traversal complete: list is empty (0 nodes visited).",
        operation: 'traverse',
        steps: [{
          stepIndex: 1,
          title: "List is Empty",
          description: "Head is NULL. Visited 0 nodes.",
          status: 'complete'
        }],
        codeSnippet: CODE_SNIPPETS.traverse,
        complexity: { time: "O(1)", space: "O(1)", explanation: "List is empty." },
        beforeState,
        afterState: beforeState,
      };
    }

    let current: LLNode<T> | null = this.head;
    let visitedCount = 0;
    const visitedIds: string[] = [];

    // Step 1: Start at head
    steps.push({
      stepIndex: 1,
      title: "1. Begin Traversal at HEAD",
      description: `Initialize traversal pointer at HEAD (${current.conceptualAddress}: "${String(current.data)}").`,
      activeNodeId: current.id,
      visitedNodeIds: [current.id],
      highlightedCodeLine: 1,
      status: 'checking',
      pointerStateDescription: `HEAD -> ${current.conceptualAddress}`
    });

    let stepNum = 2;
    while (current) {
      visitedCount++;
      visitedIds.push(current.id);

      steps.push({
        stepIndex: stepNum++,
        title: `Visited ${visitedCount} / ${totalNodes}: "${String(current.data)}"`,
        description: `Processing landmark "${String(current.data)}" (${current.conceptualAddress}). Pointer current = ${current.conceptualAddress}.`,
        activeNodeId: current.id,
        visitedNodeIds: [...visitedIds],
        highlightedCodeLine: 3,
        status: 'checking',
        pointerStateDescription: `Visiting ${current.conceptualAddress}`
      });

      current = current.next;

      if (current) {
        steps.push({
          stepIndex: stepNum++,
          title: `Advance Pointer: (current = current->next)`,
          description: `Follow next link to ${current.conceptualAddress} ("${String(current.data)}").`,
          activeNodeId: current.id,
          visitedNodeIds: [...visitedIds],
          highlightedCodeLine: 4,
          status: 'checking',
          pointerStateDescription: `current -> ${current.conceptualAddress}`
        });
      }
    }

    // Step: Finish at NULL
    steps.push({
      stepIndex: stepNum,
      title: "Traversal Complete (Reached NULL)",
      description: `Successfully visited all ${totalNodes} landmark(s) in sequential order from HEAD to tail.`,
      visitedNodeIds: [...visitedIds],
      highlightedCodeLine: 5,
      status: 'complete',
      pointerStateDescription: `current == NULL (End of list)`
    });

    return {
      success: true,
      message: `Traversal complete: successfully visited all ${totalNodes} landmarks in sequence.`,
      operation: 'traverse',
      steps,
      codeSnippet: CODE_SNIPPETS.traverse,
      complexity: {
        time: "O(n)",
        space: "O(1)",
        explanation: "Visits every node exactly once sequentially."
      },
      beforeState,
      afterState: beforeState,
    };
  }
}
