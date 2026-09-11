export interface ComplexityRow {
  operation: string;
  timeComplexity: string;
  spaceComplexity: string;
  condition: string;
  notes: string;
}

export const COMPLEXITY_TABLE: ComplexityRow[] = [
  {
    operation: "Traverse entire list",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    condition: "Always",
    notes: "Visits every node sequentially from HEAD to NULL."
  },
  {
    operation: "Search by value",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    condition: "Worst / Average",
    notes: "Requires linear scan from HEAD. Best case O(1) if target is at HEAD."
  },
  {
    operation: "Insert at Beginning (HEAD)",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    condition: "Always",
    notes: "Instant: newNode->next = head; head = newNode;"
  },
  {
    operation: "Insert at End (no tail pointer)",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    condition: "Without tail reference",
    notes: "Must traverse all n nodes to locate the current tail before linking."
  },
  {
    operation: "Insert at End (with tail pointer)",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    condition: "With tail reference",
    notes: "Instant pointer link: tail->next = newNode; tail = newNode;"
  },
  {
    operation: "Insert after a known node",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    condition: "Given pointer to node",
    notes: "Instant splicing with 2 pointer updates (if searching is not included)."
  },
  {
    operation: "Delete by value",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    condition: "Worst / Average",
    notes: "O(n) to find the predecessor node, followed by O(1) pointer bypass."
  },
  {
    operation: "Delete HEAD node",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    condition: "Always",
    notes: "Instant: head = head->next; delete oldHead;"
  }
];

export const ARRAY_VS_LINKED_LIST = [
  {
    feature: "Memory Layout",
    linkedList: "Dispersed nodes linked via pointers in heap memory",
    array: "Contiguous block of fixed memory",
    advantage: "Linked List (dynamic growth without resizing)"
  },
  {
    feature: "Access by Index (arr[i])",
    linkedList: "O(n) — must traverse from HEAD",
    array: "O(1) — direct pointer arithmetic computation",
    advantage: "Array (instant random indexing)"
  },
  {
    feature: "Insert at Beginning",
    linkedList: "O(1) — update HEAD pointer",
    array: "O(n) — must shift all existing elements right",
    advantage: "Linked List (zero shifting)"
  },
  {
    feature: "Insert in Middle (known position)",
    linkedList: "O(1) — adjust two pointers",
    array: "O(n) — must shift remaining elements right",
    advantage: "Linked List (zero element shifts)"
  },
  {
    feature: "Memory Overhead",
    linkedList: "Extra storage for pointer(s) per node",
    array: "Zero pointer overhead, but potential unused allocated capacity",
    advantage: "Array (no pointer overhead)"
  },
  {
    feature: "CPU Cache Locality",
    linkedList: "Poor cache locality due to scattered pointer jumps",
    array: "Excellent cache locality due to contiguous memory",
    advantage: "Array (hardware cache friendly)"
  }
];
