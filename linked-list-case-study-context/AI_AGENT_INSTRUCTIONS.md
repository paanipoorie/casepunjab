# AI Coding Agent Instructions

## Mission

Build the complete interactive linked-list case-study website described
by the accompanying context files.

Read all `.md` context files before making implementation decisions.

## Non-Negotiable Requirements

1.  The website must be functional, not a static mockup.
2.  The linked-list state must be real application state.
3.  Rendering must derive from that state.
4.  Add, insert, delete, search, traverse, and reset must work.
5.  Animations must reflect actual operations.
6.  Every major visible control must work.
7.  Handle empty lists and invalid operations gracefully.
8.  Keep the educational explanations synchronized with the selected
    operation.
9.  Use Punjab as the primary adapted scenario.
10. Keep the original case-study concepts intact.
11. Do not claim that Punjab locations came from the supplied case
    study.
12. Do not overengineer the backend. This can be a client-side
    educational application.

## Suggested Architecture

A practical structure:

``` text
src/
├── components/
│   ├── Hero
│   ├── RouteVisualizer
│   ├── LinkedListNode
│   ├── OperationControls
│   ├── OperationPanel
│   ├── CodeExplanation
│   ├── PointerView
│   ├── OperationHistory
│   ├── ScenarioSwitcher
│   ├── ChallengeMode
│   └── Quiz
├── data/
│   └── scenarios
├── lib/
│   └── linked-list
├── pages/
└── styles/
```

Adapt the structure to the selected framework.

## State Model

Maintain: - current linked list - selected node - active operation -
animation/traversal state - operation history - current scenario -
challenge state

Do not maintain separate duplicated route arrays merely for rendering if
the linked-list engine is intended to be the source of truth.

## Operation Flow

For each operation:

1.  User initiates operation.
2.  Validate input.
3.  Compute the linked-list mutation.
4.  Capture the steps required for explanation.
5.  Update the state.
6.  Animate those steps.
7.  Update the visualization.
8.  Update code/explanation panel.
9.  Add history entry.

## Animation

Animations should teach the operation.

For insertion: 1. identify insertion point 2. show new node 3. show new
node connecting to successor 4. show predecessor connecting to new node
5. settle into final route

For deletion: 1. identify target 2. identify predecessor 3. show
predecessor's link changing 4. remove target 5. settle into final route

For search: 1. start at head 2. highlight current node 3. show
comparison 4. move to next 5. stop at match or null

For traversal: 1. start at head 2. visit nodes sequentially 3. update
counter 4. finish at null

Respect reduced-motion preferences.

## Code Display

The code panel should show small, operation-specific C++ snippets.

Avoid displaying an entire source file unless the user explicitly asks
for it.

Line explanations should correspond to the current highlighted
operation.

## Scenario System

Create a reusable scenario configuration.

Each scenario should define: - title - description - node data - node
metadata - available operations - sample challenges

Primary scenario:

``` text
Tim's Punjab Tour
```

Secondary scenarios:

``` text
Music Playlist
Train Carriages
Browser History
```

## Quality Requirements

Before considering the project complete:

-   test every button
-   test insertion at beginning/middle/end
-   test deletion at beginning/middle/end
-   test deleting a nonexistent value
-   test searching for existing and missing values
-   test traversal
-   test reset
-   test empty-list behavior
-   test mobile layout
-   test keyboard accessibility
-   check for console errors

## Browser Verification

Because this is a UI-heavy implementation, verify the completed
implementation in a real browser using Playwright MCP if available.

At minimum verify: - landing page - initial route - insertion -
deletion - search - traversal - scenario switching - challenge mode -
responsive behavior

Take screenshots during verification if useful for visual inspection.

## Git Workflow

Commit after each meaningful completed milestone.

Suggested milestones:

``` text
feat: create interactive linked list engine
feat: add Punjab tour visualization
feat: add linked list operations
feat: add operation animations
feat: add code and pointer explanations
feat: add alternate scenarios
feat: add challenge mode
feat: add quiz and responsive polish
```

Do not wait until the entire project is finished to make the first
commit.

## Final Standard

The result should feel like a polished interactive DSA learning product
where a student can manipulate a linked list and immediately understand
what happened to the nodes and pointers.
