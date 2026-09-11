export interface CppCodeTab {
  id: string;
  label: string;
  description: string;
  code: string;
  explanation: string;
}

export const CPP_IMPLEMENTATION: {
  fullCode: string;
  tabs: CppCodeTab[];
} = {
  fullCode: `// ============================================================================
// CASEPUNJAB — Singly Linked List Implementation in C++
// A real-world educational singly linked list implementation
// Demonstrates: Dynamic memory allocation, pointer rewiring, deletion, traversal
// ============================================================================

#include <iostream>
#include <string>

// ----------------------------------------------------------------------------
// 1. Node Structure Definition
// ----------------------------------------------------------------------------
struct Node {
    std::string data;  // Landmark name or stop data
    Node* next;        // Pointer to the next node in the heap

    // Constructor to initialize node data and nullify next pointer
    Node(const std::string& val) : data(val), next(nullptr) {}
};

// ----------------------------------------------------------------------------
// 2. Singly Linked List Class
// ----------------------------------------------------------------------------
class LinkedList {
private:
    Node* head;  // Pointer to the first node in the sequence
    int count;   // Tracks number of elements in the list

public:
    // Constructor: initialize empty list
    LinkedList() : head(nullptr), count(0) {}

    // Destructor: properly free all dynamically allocated heap memory
    ~LinkedList() {
        clear();
    }

    // Free all nodes to prevent memory leaks
    void clear() {
        Node* current = head;
        while (current != nullptr) {
            Node* temp = current->next;
            delete current;
            current = temp;
        }
        head = nullptr;
        count = 0;
    }

    // Check if list is empty
    bool isEmpty() const {
        return head == nullptr;
    }

    // Get current size of list
    int size() const {
        return count;
    }

    // ------------------------------------------------------------------------
    // Operation 1: Insert at Beginning (New HEAD) — O(1)
    // ------------------------------------------------------------------------
    void insertAtBeginning(const std::string& val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
        count++;
    }

    // ------------------------------------------------------------------------
    // Operation 2: Insert at End (Tail) — O(n) without tail pointer
    // ------------------------------------------------------------------------
    void insertAtEnd(const std::string& val) {
        Node* newNode = new Node(val);
        if (head == nullptr) {
            head = newNode;
            count++;
            return;
        }

        Node* current = head;
        while (current->next != nullptr) {
            current = current->next;
        }
        current->next = newNode;
        count++;
    }

    // ------------------------------------------------------------------------
    // Operation 3: Insert After a Specific Node — O(n) to find + O(1) to link
    // ------------------------------------------------------------------------
    bool insertAfter(const std::string& targetVal, const std::string& newVal) {
        Node* current = head;
        while (current != nullptr && current->data != targetVal) {
            current = current->next;
        }

        if (current == nullptr) {
            return false; // Target not found
        }

        Node* newNode = new Node(newVal);
        newNode->next = current->next;  // 1. Point new node to current's successor
        current->next = newNode;        // 2. Point current to new node
        count++;
        return true;
    }

    // ------------------------------------------------------------------------
    // Operation 4: Delete Node by Value — O(n) search + O(1) unlink
    // ------------------------------------------------------------------------
    bool deleteNode(const std::string& targetVal) {
        if (head == nullptr) return false;

        // Case A: Deleting HEAD node
        if (head->data == targetVal) {
            Node* temp = head;
            head = head->next;
            delete temp;
            count--;
            return true;
        }

        // Case B: Deleting an intermediate or tail node
        Node* current = head;
        while (current->next != nullptr && current->next->data != targetVal) {
            current = current->next;
        }

        if (current->next == nullptr) {
            return false; // Target not found
        }

        Node* nodeToDelete = current->next;
        current->next = nodeToDelete->next; // Bypass target node
        delete nodeToDelete;                 // Free heap memory
        count--;
        return true;
    }

    // ------------------------------------------------------------------------
    // Operation 5: Search for a Node — O(n)
    // ------------------------------------------------------------------------
    int search(const std::string& query) const {
        Node* current = head;
        int index = 0;
        while (current != nullptr) {
            if (current->data == query) {
                return index; // Found at 0-indexed position
            }
            current = current->next;
            index++;
        }
        return -1; // Not found
    }

    // ------------------------------------------------------------------------
    // Operation 6: Traverse and Display Route — O(n)
    // ------------------------------------------------------------------------
    void traverse() const {
        if (head == nullptr) {
            std::cout << "[EMPTY LIST] HEAD -> NULL\\n";
            return;
        }

        std::cout << "HEAD -> ";
        Node* current = head;
        while (current != nullptr) {
            std::cout << "[" << current->data << "] -> ";
            current = current->next;
        }
        std::cout << "NULL\\n";
    }
};

// ----------------------------------------------------------------------------
// Main Driver — Punjab Tour Demo
// ----------------------------------------------------------------------------
int main() {
    LinkedList punjabTour;

    std::cout << "=== CASEPUNJAB Linked List Demo ===\\n\\n";

    // 1. Populate Tour Stops
    punjabTour.insertAtEnd("Home");
    punjabTour.insertAtEnd("Golden Temple");
    punjabTour.insertAtEnd("Jallianwala Bagh");
    punjabTour.insertAtEnd("Partition Museum");
    punjabTour.insertAtEnd("Wagah Border");

    std::cout << "1. Initial Punjab Tour Route:\\n";
    punjabTour.traverse();

    // 2. Insert After
    std::cout << "\\n2. Inserting 'Heritage Street' after 'Golden Temple':\\n";
    punjabTour.insertAfter("Golden Temple", "Heritage Street");
    punjabTour.traverse();

    // 3. Search
    std::cout << "\\n3. Searching for 'Partition Museum':\\n";
    int pos = punjabTour.search("Partition Museum");
    if (pos != -1) {
        std::cout << "Found 'Partition Museum' at index: " << pos << "\\n";
    }

    // 4. Delete
    std::cout << "\\n4. Deleting 'Jallianwala Bagh':\\n";
    punjabTour.deleteNode("Jallianwala Bagh");
    punjabTour.traverse();

    return 0;
}
`,
  tabs: [
    {
      id: 'full',
      label: 'Full LinkedList.cpp',
      description: 'Complete, compilable C++ implementation with struct Node, LinkedList class, and main driver.',
      code: `// Complete Singly Linked List in C++
#include <iostream>
#include <string>

struct Node {
    std::string data;
    Node* next;
    Node(const std::string& val) : data(val), next(nullptr) {}
};

class LinkedList {
private:
    Node* head;
    int count;

public:
    LinkedList() : head(nullptr), count(0) {}
    ~LinkedList() { clear(); }

    void clear() {
        Node* current = head;
        while (current != nullptr) {
            Node* temp = current->next;
            delete current;
            current = temp;
        }
        head = nullptr;
        count = 0;
    }

    void insertAtBeginning(const std::string& val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
        count++;
    }

    void insertAtEnd(const std::string& val) {
        Node* newNode = new Node(val);
        if (!head) { head = newNode; count++; return; }
        Node* curr = head;
        while (curr->next) curr = curr->next;
        curr->next = newNode;
        count++;
    }

    bool insertAfter(const std::string& target, const std::string& val) {
        Node* curr = head;
        while (curr && curr->data != target) curr = curr->next;
        if (!curr) return false;
        Node* newNode = new Node(val);
        newNode->next = curr->next;
        curr->next = newNode;
        count++;
        return true;
    }

    bool deleteNode(const std::string& target) {
        if (!head) return false;
        if (head->data == target) {
            Node* temp = head;
            head = head->next;
            delete temp;
            count--;
            return true;
        }
        Node* curr = head;
        while (curr->next && curr->next->data != target) curr = curr->next;
        if (!curr->next) return false;
        Node* nodeToDelete = curr->next;
        curr->next = nodeToDelete->next;
        delete nodeToDelete;
        count--;
        return true;
    }

    int search(const std::string& target) const {
        Node* curr = head;
        int idx = 0;
        while (curr) {
            if (curr->data == target) return idx;
            curr = curr->next;
            idx++;
        }
        return -1;
    }

    void traverse() const {
        Node* curr = head;
        std::cout << "HEAD -> ";
        while (curr) {
            std::cout << "[" << curr->data << "] -> ";
            curr = curr->next;
        }
        std::cout << "NULL\\n";
    }
};`,
      explanation: 'This full C++ implementation encapsulates all singly linked list operations into a robust class with automatic memory cleanup in the destructor (~LinkedList).'
    },
    {
      id: 'node',
      label: 'struct Node',
      description: 'The fundamental building block containing data and next pointer.',
      code: `// Node Definition in C++
struct Node {
    std::string data;  // Payload (e.g. stop name)
    Node* next;        // Memory pointer to next Node

    // Constructor with member initializer list
    Node(const std::string& val) 
        : data(val), next(nullptr) {}
};`,
      explanation: 'Every node lives independently in heap memory. The next pointer holds the memory address of the succeeding node, or nullptr for the tail.'
    },
    {
      id: 'insert',
      label: 'Insert (Head / Tail / After)',
      description: 'Pointer rewiring mechanics for O(1) head insertion, O(n) tail insertion, and insert-after.',
      code: `// 1. Insert at Beginning — O(1)
void insertAtBeginning(const std::string& val) {
    Node* newNode = new Node(val);
    newNode->next = head; // Point new node to old head
    head = newNode;       // Advance head to new node
}

// 2. Insert After Target — O(n) search + O(1) link
bool insertAfter(const std::string& target, const std::string& val) {
    Node* curr = head;
    while (curr && curr->data != target) {
        curr = curr->next;
    }
    if (!curr) return false; // Target not in list

    Node* newNode = new Node(val);
    // CRITICAL: Point newNode->next first to avoid losing the chain!
    newNode->next = curr->next; 
    curr->next = newNode;
    return true;
}`,
      explanation: 'Notice the pointer ordering in insertAfter: you MUST set newNode->next = curr->next before setting curr->next = newNode. If you reverse this order, you lose the rest of the list!'
    },
    {
      id: 'delete',
      label: 'Delete & Memory Free',
      description: 'Safely unlinking nodes and avoiding memory leaks with delete.',
      code: `// Delete by Value — O(n) search + O(1) unlink
bool deleteNode(const std::string& target) {
    if (!head) return false;

    // Case 1: Target is HEAD node
    if (head->data == target) {
        Node* temp = head;
        head = head->next; // Shift head to second node
        delete temp;       // Free old head heap memory
        return true;
    }

    // Case 2: Target is middle or tail node
    Node* curr = head;
    while (curr->next && curr->next->data != target) {
        curr = curr->next;
    }

    if (!curr->next) return false; // Not found

    Node* nodeToDelete = curr->next;
    curr->next = nodeToDelete->next; // Bypass nodeToDelete
    delete nodeToDelete;             // Free heap memory
    return true;
}`,
      explanation: 'In C++, unlike garbage-collected languages, you MUST explicitly call delete on the unlinked node pointer to release its heap allocation back to the operating system.'
    },
    {
      id: 'search_traverse',
      label: 'Search & Traversal',
      description: 'Iterative pointer hopping from HEAD until reaching nullptr.',
      code: `// Sequential Traversal — O(n)
void traverse() const {
    Node* curr = head;
    std::cout << "HEAD -> ";
    while (curr != nullptr) {
        std::cout << "[" << curr->data << "] -> ";
        curr = curr->next; // Hop to next node
    }
    std::cout << "NULL\\n";
}

// Search by Target Value — O(n)
int search(const std::string& target) const {
    Node* curr = head;
    int index = 0;
    while (curr != nullptr) {
        if (curr->data == target) return index;
        curr = curr->next;
        index++;
    }
    return -1; // Not found
}`,
      explanation: 'Linked list traversal requires starting at HEAD and following pointer references sequentially until curr == nullptr. Unlike arrays, random indexing arr[i] is not possible.'
    }
  ]
};
