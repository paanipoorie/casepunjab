import { CodeLineExplanation, OperationType } from '../types/linked-list';

export const CODE_SNIPPETS: Record<OperationType, CodeLineExplanation[]> = {
  add_end: [
    {
      lineNum: 1,
      code: "Node* newNode = new Node(data);",
      explanation: "Allocate a new node in memory with the given data and set its next pointer to NULL."
    },
    {
      lineNum: 2,
      code: "if (head == nullptr) { head = newNode; return; }",
      explanation: "If the list is empty, make the new node the HEAD of the list."
    },
    {
      lineNum: 3,
      code: "Node* current = head;",
      explanation: "Start a traversal pointer at HEAD to find the current last node."
    },
    {
      lineNum: 4,
      code: "while (current->next != nullptr) current = current->next;",
      explanation: "Hop through nodes until we reach the node whose next pointer is NULL (the current tail)."
    },
    {
      lineNum: 5,
      code: "current->next = newNode;",
      explanation: "Connect the last node's next pointer to the newly allocated node."
    }
  ],
  add_beginning: [
    {
      lineNum: 1,
      code: "Node* newNode = new Node(data);",
      explanation: "Allocate a new node with data."
    },
    {
      lineNum: 2,
      code: "newNode->next = head;",
      explanation: "Point the new node's next pointer to the current HEAD."
    },
    {
      lineNum: 3,
      code: "head = newNode;",
      explanation: "Update HEAD to point to the new node as the first element."
    }
  ],
  insert_after: [
    {
      lineNum: 1,
      code: "Node* newNode = new Node(newData);",
      explanation: "Create the new node with the specified destination/data."
    },
    {
      lineNum: 2,
      code: "newNode->next = current->next;",
      explanation: "Point newNode's next to what current currently points to (the successor). Crucial step to avoid losing the rest of the chain!"
    },
    {
      lineNum: 3,
      code: "current->next = newNode;",
      explanation: "Update current node's next pointer to point directly to newNode."
    }
  ],
  delete: [
    {
      lineNum: 1,
      code: "if (head->data == target) { head = head->next; delete temp; }",
      explanation: "If the node to delete is HEAD, advance HEAD to head->next and free the old head."
    },
    {
      lineNum: 2,
      code: "Node* current = head;",
      explanation: "Otherwise, find the node right BEFORE the target node to be deleted."
    },
    {
      lineNum: 3,
      code: "while (current->next && current->next->data != target) current = current->next;",
      explanation: "Traverse until current->next is the node targeted for removal."
    },
    {
      lineNum: 4,
      code: "Node* nodeToDelete = current->next;",
      explanation: "Hold a temporary reference to the node being deleted."
    },
    {
      lineNum: 5,
      code: "current->next = current->next->next;",
      explanation: "Bypass nodeToDelete by pointing current->next directly to current->next->next."
    },
    {
      lineNum: 6,
      code: "delete nodeToDelete;",
      explanation: "Free the unlinked node from memory."
    }
  ],
  search: [
    {
      lineNum: 1,
      code: "Node* current = head;",
      explanation: "Initialize traversal pointer at the HEAD of the linked list."
    },
    {
      lineNum: 2,
      code: "int index = 0;",
      explanation: "Keep track of position/index while traversing."
    },
    {
      lineNum: 3,
      code: "while (current != nullptr) {",
      explanation: "Continue looping as long as current points to a valid node."
    },
    {
      lineNum: 4,
      code: "    if (current->data == target) return current; // Found",
      explanation: "Compare current node's data with the search target. If equal, return node."
    },
    {
      lineNum: 5,
      code: "    current = current->next; index++;",
      explanation: "Follow the next pointer to visit the next landmark in sequence."
    },
    {
      lineNum: 6,
      code: "}",
      explanation: "Loop ends when current reaches NULL (target not found in the list)."
    }
  ],
  traverse: [
    {
      lineNum: 1,
      code: "Node* current = head;",
      explanation: "Set pointer to the beginning (HEAD) of the linked list."
    },
    {
      lineNum: 2,
      code: "while (current != nullptr) {",
      explanation: "Loop through every node until reaching the terminator (NULL)."
    },
    {
      lineNum: 3,
      code: "    cout << current->data << \" -> \";",
      explanation: "Process/visit the current landmark (print data or execute action)."
    },
    {
      lineNum: 4,
      code: "    current = current->next;",
      explanation: "Follow pointer: jump to the next node stored in current->next."
    },
    {
      lineNum: 5,
      code: "}",
      explanation: "Traversal completes cleanly after visiting all nodes in order."
    }
  ],
  reset: [
    {
      lineNum: 1,
      code: "clear(); // delete all allocated nodes",
      explanation: "Traverse and free all dynamically allocated nodes from memory."
    },
    {
      lineNum: 2,
      code: "initializeRoute(); // rebuild initial list",
      explanation: "Construct the initial sequence starting with HEAD."
    }
  ]
};
