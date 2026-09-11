import { Challenge } from '../types/challenge';

export const CHALLENGES: Challenge[] = [
  {
    id: "ch_1",
    title: "Extend Route to Gobindgarh Fort",
    prompt: "Tim wants to add 'Gobindgarh Fort' at the very end of his sightseeing tour.",
    scenarioId: "punjab",
    taskDescription: "Choose the correct operation to attach Gobindgarh Fort as the final stop in the itinerary.",
    hint: "To add a destination to the end of the tour, which operation traverses to the current tail and updates tail->next?",
    expectedOperation: "add_end",
    expectedNewValue: "Gobindgarh Fort",
    explanation: "Adding at the end traverses to the last node (Wagah Border) and connects its next pointer to Gobindgarh Fort."
  },
  {
    id: "ch_2",
    title: "Spiritual Detour: Durgiana Temple",
    prompt: "Tim decides to visit 'Durgiana Temple' right after visiting 'Golden Temple' before going to Jallianwala Bagh.",
    scenarioId: "punjab",
    taskDescription: "Insert Durgiana Temple between Golden Temple and Jallianwala Bagh.",
    hint: "We need to splice a new node between two existing stops. Which operation updates newNode->next = current->next followed by current->next = newNode?",
    expectedOperation: "insert_after",
    expectedTarget: "Golden Temple",
    expectedNewValue: "Durgiana Temple",
    explanation: "insert_after connects Durgiana Temple to Jallianwala Bagh first, then points Golden Temple to Durgiana Temple, cleanly splicing it into the chain."
  },
  {
    id: "ch_3",
    title: "Skip Closed Museum",
    prompt: "Partition Museum is undergoing renovations today. Tim needs to remove 'Partition Museum' from his tour.",
    scenarioId: "punjab",
    taskDescription: "Delete Partition Museum so that Jallianwala Bagh connects straight to Wagah Border.",
    hint: "To remove an intermediate landmark, which operation points the predecessor's next pointer directly to the successor (current->next = current->next->next)?",
    expectedOperation: "delete",
    expectedTarget: "Partition Museum",
    explanation: "Deleting Partition Museum redirects Jallianwala Bagh's next pointer directly to Wagah Border, safely bypassing the museum."
  },
  {
    id: "ch_4",
    title: "Verify Wagah Border Flag Ceremony",
    prompt: "Tim wants to check if 'Wagah Border' is scheduled in his tour and find out its stop number.",
    scenarioId: "punjab",
    taskDescription: "Perform a linear search for 'Wagah Border' across the route.",
    hint: "Which operation starts from HEAD and checks each node's data one by one until a match is found?",
    expectedOperation: "search",
    expectedTarget: "Wagah Border",
    explanation: "Search traverses sequentially starting from Home until reaching Wagah Border, verifying its existence and exact position."
  },
  {
    id: "ch_5",
    title: "Add Holy City: Anandpur Sahib",
    prompt: "Tim wants to insert 'Anandpur Sahib' after 'Jallianwala Bagh' in his travel itinerary.",
    scenarioId: "punjab",
    taskDescription: "Perform an insert_after operation targeting Jallianwala Bagh.",
    hint: "Select 'Insert After', choose 'Jallianwala Bagh' as target, and specify 'Anandpur Sahib'.",
    expectedOperation: "insert_after",
    expectedTarget: "Jallianwala Bagh",
    expectedNewValue: "Anandpur Sahib",
    explanation: "Jallianwala Bagh's next pointer is linked to Anandpur Sahib, whose next pointer carries on to the next stop."
  }
];
