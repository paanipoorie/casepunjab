# Project Context

## Source Case Study

Title: **Case Study 1: "Tim's City Tour - Managing Landmarks with a
Linked List"**

### Original background

Tim is an adventurous traveler planning a sightseeing tour across a
city. His journey includes landmarks such as parks, museums, malls, and
theaters. He creates a route connecting these landmarks in order. His
plans can change, so he needs to add landmarks, remove landmarks, and
search for locations.

### Original initial route

Home → Central Park → City Museum → Shopping Mall → Grand Theater

The source states that these landmarks are connected in sequence,
forming a linked list.

### Required operations

1.  Display Tim's current route.
2.  Add a new landmark at the end: Sunshine Café.
3.  Insert Art Gallery between City Museum and Shopping Mall.
4.  Remove Shopping Mall.
5.  Search for Grand Theater.
6.  Traverse the entire route.

### Additional questions

-   What data structure is best suited for the travel route, and why?
-   How do insertion and deletion affect navigation through the list?
-   What real-world applications require managing such sequences?

## Additional source scenarios

### Music Playlist Organizer

Each song has: - title - artist - duration

Required operations: - represent playlist with a linked list - add at
beginning/end - insert after a specific song - remove a song - play
songs sequentially / traverse

### Train Carriage Management

A train has linked carriages.

Required operations: - attach a carriage at the end - remove by carriage
ID - insert at a specific position - display carriage IDs

### Browser History

A browser tracks visited pages in a linked list.

Required operations: - add a page - remove the most recent page - search
by URL - display browsing history

## Adaptation for this project

Use **Punjab** as the primary visual example. The Punjab locations are
not part of the original supplied case study; they are a contextual
adaptation.

Suggested route:

Home → Golden Temple → Jallianwala Bagh → Partition Museum → Wagah
Border

Additional locations can be used for interaction challenges, such as: -
Durgiana Temple - Gobindgarh Fort - Anandpur Sahib

Keep the conceptual mapping clear: - Landmark = node data - Next
landmark = next pointer - Add = insertion - Remove = deletion - Find
landmark = search - Visit every landmark in order = traversal
