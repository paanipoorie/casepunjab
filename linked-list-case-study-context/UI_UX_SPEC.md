# UI / UX Specification

## Design Goal

Create a modern interactive DSA learning experience.

It should feel like an interactive product, not a PDF converted into a
website.

## Visual Language

Use: - strong typography - generous spacing - restrained color system -
clear node/card components - visible arrows/pointers - subtle
transitions - accessible contrast - responsive layouts

Avoid: - excessive gradients - unnecessary glassmorphism - decorative
clutter - huge blocks of text - generic dashboard styling - emoji-heavy
UI

## Hero

Title:

**Linked Lists Through the Real World**

Subtitle:

**Follow the links. Understand the logic.**

Primary CTA: **Start the Journey**

Secondary: **Explore the Playground**

## Main Visualization

Use a horizontal node graph on desktop and a vertically stacked/reflowed
structure on narrow screens.

Example:

``` text
[ HOME ]
   ↓
[ GOLDEN TEMPLE ]
   ↓
[ JALLIANWALA BAGH ]
   ↓
[ PARTITION MUSEUM ]
   ↓
[ WAGAH BORDER ]
```

On desktop, prefer a horizontal chain where space allows.

## Node Design

Every node should visually separate:

``` text
NODE
Golden Temple

data: "Golden Temple"
next: Node #02
```

The `next` relationship should be visually represented by an arrow.

## Interaction States

### Default

Neutral node.

### Selected

Clearly selected with focus treatment.

### Searching

Current node receives an active state.

### Found

Search result receives a strong success state.

### Insert

New node should visually enter the chain.

### Delete

Removed node should visibly leave and the connection should reconnect.

### Traversal

Each visited node is highlighted in sequence.

## Operation Controls

Use a compact operation bar:

-   Add
-   Insert
-   Delete
-   Search
-   Traverse
-   Reset

Controls should open focused panels/forms rather than cluttering the
visualization.

## Explanation Panel

For every operation, show:

1.  What the user asked to do.
2.  What happens to the linked list.
3.  What pointer/reference changes.
4.  Resulting route.
5.  Time complexity.

## Code Panel

Use syntax-highlighted C++.

Code should be directly tied to the operation being demonstrated.

Do not dump a huge program. Show the smallest useful snippet and explain
it line-by-line.

## Memory / Pointer Mode

Provide an optional toggle:

**Route View** vs. **Pointer View**

Pointer View can show conceptual addresses such as:

``` text
HEAD
 ↓
Node #01
 data = Golden Temple
 next = Node #02
```

These are conceptual addresses/IDs, not real machine memory addresses.

## Responsive Behavior

At mobile widths: - stack controls - allow visualization to reflow -
preserve readable node content - never rely on hover - keep primary
actions easy to tap
