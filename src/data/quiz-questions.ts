import { QuizQuestion } from '../types/quiz';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q_1",
    question: "What are the two fundamental components that make up a singly linked list node?",
    options: [
      "An array index and an integer length",
      "A data value and a next pointer/reference",
      "A left child pointer and a right child pointer",
      "A key and a hashed memory bucket"
    ],
    correctIndex: 1,
    explanation: "In a singly linked list, each node encapsulates two elements: its payload (data) and a link (pointer/reference) to the subsequent node in the sequence.",
    category: "node"
  },
  {
    id: "q_2",
    question: "What does the 'HEAD' of a linked list represent?",
    options: [
      "The total number of elements allocated in memory",
      "A pointer that references the very first node in the list",
      "A backup copy of the final node",
      "The memory address of the operating system cache"
    ],
    correctIndex: 1,
    explanation: "HEAD is the entry point pointer that holds the memory address of the first node. If HEAD is NULL, the list is empty.",
    category: "pointer"
  },
  {
    id: "q_3",
    question: "When inserting a new node AFTER an existing node 'current', why MUST we execute `newNode->next = current->next` before `current->next = newNode`?",
    options: [
      "Because C++ compilers forbid modifying current first",
      "To prevent losing the reference to the rest of the existing chain",
      "To reverse the linked list automatically",
      "To allocate double the memory buffer"
    ],
    correctIndex: 1,
    explanation: "If you assigned `current->next = newNode` first, you would overwrite the only reference to the remainder of the list, permanently leaking/losing all subsequent nodes!",
    category: "operations"
  },
  {
    id: "q_4",
    question: "What is the time complexity of searching for a value in an unsorted singly linked list of size n?",
    options: [
      "O(1) constant time",
      "O(log n) logarithmic time",
      "O(n) linear time",
      "O(n²) quadratic time"
    ],
    correctIndex: 2,
    explanation: "Unlike arrays, linked lists do not support instant O(1) random indexing. Finding a node requires sequential traversal from HEAD node-by-node (O(n)).",
    category: "complexity"
  },
  {
    id: "q_5",
    question: "What pointer operation removes an intermediate node between 'current' and 'successor'?",
    options: [
      "current = current->next->next;",
      "current->next = current->next->next;",
      "current->next = nullptr;",
      "head = current;"
    ],
    correctIndex: 1,
    explanation: "`current->next = current->next->next;` redirects current's next link to skip over the target node and directly link to the successor node.",
    category: "operations"
  },
  {
    id: "q_6",
    question: "Why might a linked list be chosen over a fixed array for dynamic sequences like Tim's Tour or a Music Queue?",
    options: [
      "Linked lists use less total memory per element than arrays",
      "Linked lists allow O(1) random access by index number",
      "Nodes can be inserted or deleted anywhere without shifting existing elements in contiguous memory",
      "Linked lists guarantee faster CPU cache locality than arrays"
    ],
    correctIndex: 2,
    explanation: "Arrays require shifting O(n) contiguous elements in memory when inserting/deleting in the middle. Linked lists simply reassign two pointers without shifting memory.",
    category: "real-world"
  },
  {
    id: "q_7",
    question: "What does the `next` pointer of the LAST node (tail) in a non-circular singly linked list point to?",
    options: [
      "HEAD",
      "NULL / nullptr",
      "Itself",
      "Zero index array"
    ],
    correctIndex: 1,
    explanation: "The tail node's next pointer holds NULL (nullptr), signaling the natural termination of the traversal.",
    category: "pointer"
  },
  {
    id: "q_8",
    question: "If you maintain both a HEAD and a TAIL pointer in your linked list, what is the time complexity of inserting a new node at the END?",
    options: [
      "O(1) constant time",
      "O(n) linear time",
      "O(log n) logarithmic time",
      "O(n log n)"
    ],
    correctIndex: 0,
    explanation: "With a direct TAIL pointer, you can immediately set `tail->next = newNode; tail = newNode;` in O(1) constant time without traversing from HEAD.",
    category: "complexity"
  }
];
