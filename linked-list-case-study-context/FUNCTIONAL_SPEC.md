# Functional Specification

## 1. Linked List Engine

Implement a genuine singly linked list in application state.

Each node should contain at minimum:

``` text
id
name
type/category
metadata
next
```

Do not hard-code the rendered arrows independently from the linked-list
state.

The UI must render from the current linked-list structure.

## 2. Display Route

Show all nodes in order from `head`.

Each node should visibly communicate: - data/name - node identity - next
relationship

The user should be able to select a node.

## 3. Add at End

User chooses a landmark and adds it to the end.

Example:

Before: Home → Golden Temple → Jallianwala Bagh

Action: Add Gobindgarh Fort

After: Home → Golden Temple → Jallianwala Bagh → Gobindgarh Fort

Show the operation visually.

## 4. Insert in Middle

User chooses: - existing node - new landmark

Example:

Before: Golden Temple → Jallianwala Bagh

Action: Insert Durgiana Temple after Golden Temple

After: Golden Temple → Durgiana Temple → Jallianwala Bagh

Show the pointer reconnection step.

## 5. Delete

User selects a landmark.

Example:

Before: Jallianwala Bagh → Partition Museum → Wagah Border

Delete Partition Museum.

After: Jallianwala Bagh → Wagah Border

Show that the previous node's `next` is redirected.

## 6. Search

User enters a landmark.

The visualization should traverse nodes one by one.

Example: Search: Wagah Border

Animation: Home → checking Golden Temple → checking Jallianwala Bagh →
checking Partition Museum → checking Wagah Border → FOUND

Show: - nodes visited - number of comparisons - result

## 7. Traverse

Traverse from `head` to `null`.

Highlight each node sequentially.

Show a traversal counter: `Visited 1 / 5`, etc.

At the end: `Traversal complete`.

## 8. Reset

Restore the initial Punjab route.

## 9. Operation History

Every successful operation creates an entry.

Example:

``` text
01  Initialized route
02  Added Gobindgarh Fort
03  Inserted Durgiana Temple after Golden Temple
04  Deleted Partition Museum
05  Searched for Wagah Border
06  Traversed route
```

Allow an entry to explain/replay the operation where practical.

## 10. Challenge Mode

Provide tasks where users must choose the correct operation.

Example:

> Insert Anandpur Sahib after Jallianwala Bagh.

User selects: - Add at beginning - Add at end - Insert after - Delete

Then selects the node and destination.

Validate the result.

## 11. Quiz

Include conceptual questions around: - node - head - next pointer -
insertion - deletion - search - traversal - linked-list suitability

Avoid trick questions unless clearly explained.

## 12. Other Scenarios

Allow users to switch between: - Punjab Tour - Music Playlist - Train
Carriages - Browser History

The same underlying linked-list concepts should remain recognizable.
