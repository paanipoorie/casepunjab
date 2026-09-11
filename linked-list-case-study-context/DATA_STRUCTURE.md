# Data Structure and Logic

## Singly Linked List

The primary teaching model is a singly linked list.

Conceptually:

``` text
Node
├── data
└── next
```

Example:

``` text
[Golden Temple | next] → [Jallianwala Bagh | next] → [Wagah Border | null]
```

## Initial State

``` text
head
 ↓
Home
 ↓
Golden Temple
 ↓
Jallianwala Bagh
 ↓
Partition Museum
 ↓
Wagah Border
 ↓
null
```

## Insert After a Node

Conceptual operation:

``` cpp
newNode->next = current->next;
current->next = newNode;
```

Explain the order.

First: - new node points to what current used to point to.

Second: - current points to the new node.

This prevents losing the rest of the chain.

## Delete a Node

For a node in the middle:

``` cpp
current->next = current->next->next;
```

Explain that the previous node skips the deleted node and points to the
deleted node's successor.

The actual implementation should handle: - deleting head - deleting
middle - deleting last node - deleting a nonexistent node - empty list

## Search

Start from `head` and compare each node's data until: - match found - or
`null` reached

Conceptual complexity: `O(n)`

## Traversal

Start at `head`.

Repeatedly: 1. process current node 2. move to `current->next` 3. stop
at `null`

## Complexity

Use these as the conceptual baseline for a singly linked list:

  Operation                   Typical complexity
  --------------------------- ---------------------------
  Traverse                    O(n)
  Search                      O(n)
  Insert at beginning         O(1)
  Insert at end               O(n) without tail pointer
  Delete/search by value      O(n)
  Insert after a known node   O(1)

If the implementation maintains a tail pointer, clearly distinguish that
case for end insertion.

## Important Teaching Point

Do not imply that linked lists are always better than arrays.

Explain that linked lists are useful when the sequence changes through
insertions/deletions and direct index access is not the main
requirement.

Also explain that finding a specific landmark still requires traversal
in a singly linked list.
