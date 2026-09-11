import { ScenarioDef } from '../types/scenario';

export const SCENARIOS: Record<string, ScenarioDef> = {
  punjab: {
    id: 'punjab',
    title: "Tim's Punjab Tour",
    tagline: "Landmark by landmark, following the pointers across Punjab",
    description: "Tim plans an adventurous journey connecting landmarks across Punjab. As plans change, stops are inserted, removed, and searched dynamically.",
    icon: "MapPin",
    nodeLabel: "Landmark",
    accentColor: "amber",
    accentBorder: "border-amber-500/30",
    accentBg: "bg-amber-500/10",
    initialNodes: [
      {
        name: "Home",
        metadata: {
          category: "Starting Point",
          subtitle: "Journey Origin",
          badge: "START",
          icon: "Home",
          description: "Tim's base camp where the journey begins."
        }
      },
      {
        name: "Golden Temple",
        metadata: {
          category: "Spiritual Landmark",
          subtitle: "Sri Harmandir Sahib, Amritsar",
          badge: "HOLY SITE",
          icon: "Sparkles",
          description: "World-renowned spiritual center of Sikhism with sanctum surrounded by the Sarovar."
        }
      },
      {
        name: "Jallianwala Bagh",
        metadata: {
          category: "Historical Memorial",
          subtitle: "Amritsar",
          badge: "MEMORIAL",
          icon: "Flame",
          description: "Historic public garden and memorial of national importance."
        }
      },
      {
        name: "Partition Museum",
        metadata: {
          category: "Cultural Museum",
          subtitle: "Town Hall, Amritsar",
          badge: "MUSEUM",
          icon: "Landmark",
          description: "People's museum remembering the stories and history of the 1947 Partition."
        }
      },
      {
        name: "Wagah Border",
        metadata: {
          category: "Border Post",
          subtitle: "Grand Trunk Road, Attari",
          badge: "CEREMONY",
          icon: "Flag",
          description: "Famous border crossing featuring the daily beating retreat flag ceremony."
        }
      }
    ],
    presetInsertCandidates: [
      {
        name: "Gobindgarh Fort",
        metadata: {
          category: "Historic Fort",
          subtitle: "Amritsar",
          badge: "HERITAGE",
          icon: "Shield",
          description: "18th-century military fort built by the Bhangi Misl rulers and expanded by Maharaja Ranjit Singh."
        }
      },
      {
        name: "Durgiana Temple",
        metadata: {
          category: "Hindu Temple",
          subtitle: "Amritsar",
          badge: "TEMPLE",
          icon: "Sparkles",
          description: "Historic Hindu temple situated in the middle of a sacred lake, echoing architectural styles."
        }
      },
      {
        name: "Anandpur Sahib",
        metadata: {
          category: "Spiritual Capital",
          subtitle: "Rupnagar District",
          badge: "TAKHT",
          icon: "Mountain",
          description: "The holy City of Bliss, birthplace of the Khalsa Panth in 1699."
        }
      },
      {
        name: "Virasat-e-Khalsa",
        metadata: {
          category: "Heritage Complex",
          subtitle: "Anandpur Sahib",
          badge: "ARCHITECTURE",
          icon: "Building",
          description: "Spectacular architectural museum celebrating 500 years of Sikh history."
        }
      },
      {
        name: "Sheesh Mahal",
        metadata: {
          category: "Royal Palace",
          subtitle: "Patiala",
          badge: "PALACE",
          icon: "Crown",
          description: "Palace of Mirrors built by Maharaja Narinder Singh in Patiala."
        }
      }
    ],
    searchSuggestions: ["Wagah Border", "Golden Temple", "Jallianwala Bagh", "Durgiana Temple", "Lahore Gate"]
  },

  music: {
    id: 'music',
    title: "Music Playlist Organizer",
    tagline: "Sequential audio queue where tracks link to the next song",
    description: "Every song in a digital playlist acts as a node pointing directly to what plays next. Fast additions to the queue and reordering without shifting arrays.",
    icon: "Music",
    nodeLabel: "Track",
    accentColor: "emerald",
    accentBorder: "border-emerald-500/30",
    accentBg: "bg-emerald-500/10",
    initialNodes: [
      {
        name: "Excuses",
        metadata: {
          category: "Punjabi Pop",
          subtitle: "AP Dhillon & Gurinder Gill",
          badge: "2:56",
          icon: "Disc",
          description: "High-energy global Punjabi hit with synthwave production."
        }
      },
      {
        name: "Softly",
        metadata: {
          category: "Desi Hip Hop",
          subtitle: "Karan Aujla • Four You",
          badge: "2:35",
          icon: "Radio",
          description: "Melodic chart-topping single with infectious acoustics."
        }
      },
      {
        name: "Born To Shine",
        metadata: {
          category: "Punjabi Bhangra",
          subtitle: "Diljit Dosanjh • G.O.A.T.",
          badge: "3:32",
          icon: "Sparkles",
          description: "Uplifting anthem celebrating perseverance and success."
        }
      },
      {
        name: "Insane",
        metadata: {
          category: "Urban Punjabi",
          subtitle: "AP Dhillon, Shinda Kahlon",
          badge: "3:26",
          icon: "Headphones",
          description: "Bass-heavy viral track with rhythmic percussion."
        }
      }
    ],
    presetInsertCandidates: [
      {
        name: "52 Bars",
        metadata: {
          category: "Desi Hip Hop",
          subtitle: "Karan Aujla",
          badge: "3:18",
          icon: "Flame",
          description: "Technical lyrical rap showcase with dynamic cadence."
        }
      },
      {
        name: "Lover",
        metadata: {
          category: "Romantic Pop",
          subtitle: "Diljit Dosanjh • MoonChild Era",
          badge: "3:12",
          icon: "Heart",
          description: "Breezy synth-pop ballad."
        }
      },
      {
        name: "With You",
        metadata: {
          category: "Indie Pop",
          subtitle: "AP Dhillon",
          badge: "2:38",
          icon: "Music",
          description: "Acoustic-driven feel-good melody."
        }
      }
    ],
    searchSuggestions: ["Softly", "Born To Shine", "Excuses", "52 Bars", "Brown Munde"]
  },

  train: {
    id: 'train',
    title: "Train Carriage Management",
    tagline: "Physical train couplers as living linked list pointers",
    description: "Railway carriages are physically linked end-to-end. Decoupling a carriage or splicing in a dining car mirrors pointer adjustments in memory.",
    icon: "Train",
    nodeLabel: "Carriage",
    accentColor: "cyan",
    accentBorder: "border-cyan-500/30",
    accentBg: "bg-cyan-500/10",
    initialNodes: [
      {
        name: "Locomotive WAP-7",
        metadata: {
          category: "Electric Engine",
          subtitle: "Lead Unit #ENG-6000",
          badge: "HEAD ENGINE",
          icon: "Zap",
          description: "High-horsepower 3-phase electric locomotive powering the rake."
        }
      },
      {
        name: "Sleeper Coach S1",
        metadata: {
          category: "Non-AC Sleeper",
          subtitle: "Coach #SL-101",
          badge: "72 BERTHS",
          icon: "Bed",
          description: "Standard passenger reserved sleeper coach."
        }
      },
      {
        name: "Sleeper Coach S2",
        metadata: {
          category: "Non-AC Sleeper",
          subtitle: "Coach #SL-102",
          badge: "72 BERTHS",
          icon: "Bed",
          description: "Intermediate passenger reserved sleeper coach."
        }
      },
      {
        name: "AC 3-Tier B1",
        metadata: {
          category: "Air Conditioned",
          subtitle: "Coach #3A-201",
          badge: "64 BERTHS",
          icon: "Snowflake",
          description: "Air conditioned 3-tier economy coach."
        }
      },
      {
        name: "Guard Van & Luggage",
        metadata: {
          category: "Brake Van",
          subtitle: "Coach #SLR-99",
          badge: "TAIL COACH",
          icon: "ShieldAlert",
          description: "End-of-train guard cabin and parcel cargo area."
        }
      }
    ],
    presetInsertCandidates: [
      {
        name: "Pantry Car PC-1",
        metadata: {
          category: "Catering",
          subtitle: "Coach #PC-501",
          badge: "KITCHEN",
          icon: "Utensils",
          description: "Hot food preparation kitchen car positioned mid-train."
        }
      },
      {
        name: "AC 2-Tier A1",
        metadata: {
          category: "Air Conditioned",
          subtitle: "Coach #2A-301",
          badge: "48 BERTHS",
          icon: "Star",
          description: "Premium AC 2-tier comfort coach."
        }
      },
      {
        name: "Executive Chair Car",
        metadata: {
          category: "Premium Seating",
          subtitle: "Coach #EC-01",
          badge: "56 SEATS",
          icon: "Armchair",
          description: "High comfort executive seating coach."
        }
      }
    ],
    searchSuggestions: ["AC 3-Tier B1", "Guard Van & Luggage", "Locomotive WAP-7", "Pantry Car PC-1", "Coach B9"]
  },

  browser: {
    id: 'browser',
    title: "Browser History",
    tagline: "Sequential navigation stack tracking your journey across the web",
    description: "As you navigate from webpage to webpage, browser histories build a chain of visited URLs. Deleting browsing steps or jumping through bookmarks traverses the list.",
    icon: "Globe",
    nodeLabel: "Webpage",
    accentColor: "violet",
    accentBorder: "border-violet-500/30",
    accentBg: "bg-violet-500/10",
    initialNodes: [
      {
        name: "google.com",
        metadata: {
          category: "Search Engine",
          subtitle: "https://www.google.com",
          badge: "ENTRY",
          icon: "Search",
          description: "Initial search query for data structures and algorithms."
        }
      },
      {
        name: "youtube.com",
        metadata: {
          category: "Video Learning",
          subtitle: "https://www.youtube.com",
          badge: "MEDIA",
          icon: "PlaySquare",
          description: "Watched animated tutorial on singly linked list pointers."
        }
      },
      {
        name: "github.com",
        metadata: {
          category: "Code Hosting",
          subtitle: "https://github.com",
          badge: "REPO",
          icon: "GitBranch",
          description: "Inspected open source C++ linked list repository."
        }
      },
      {
        name: "leetcode.com",
        metadata: {
          category: "Problem Solving",
          subtitle: "https://leetcode.com",
          badge: "DSA",
          icon: "Code2",
          description: "Solved reverse linked list and cycle detection problems."
        }
      },
      {
        name: "chatgpt.com",
        metadata: {
          category: "AI Assistant",
          subtitle: "https://chatgpt.com",
          badge: "AI CHAT",
          icon: "Bot",
          description: "Asked conceptual pointer questions and edge case clarifications."
        }
      }
    ],
    presetInsertCandidates: [
      {
        name: "stackoverflow.com",
        metadata: {
          category: "Developer Q&A",
          subtitle: "https://stackoverflow.com",
          badge: "DEBUG",
          icon: "HelpCircle",
          description: "Read discussion on why insertAfter takes O(1) time."
        }
      },
      {
        name: "wikipedia.org",
        metadata: {
          category: "Encyclopedia",
          subtitle: "https://en.wikipedia.org",
          badge: "REFERENCE",
          icon: "BookOpen",
          description: "Read historical overview of list processing and IPL."
        }
      },
      {
        name: "geeksforgeeks.org",
        metadata: {
          category: "DSA Tutorials",
          subtitle: "https://geeksforgeeks.org",
          badge: "TUTORIAL",
          icon: "GraduationCap",
          description: "Compared singly vs doubly linked list time complexities."
        }
      }
    ],
    searchSuggestions: ["leetcode.com", "github.com", "google.com", "stackoverflow.com", "reddit.com"]
  }
};
