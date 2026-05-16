interface Tag {
  // --- Core Identification ---
  id: string;               // UUID or ULID
  slug: string;             // URL-friendly name (e.g., "corporate-finance")
  namespace: string;        // Grouping for tags (e.g., "department", "geography")
  
  // --- Hierarchy Metadata ---
  parentId: string | null;  // Direct parent for simple traversal
  path: string;             // Materialized path for fast indexing (e.g., "1/5/12/")
  level: number;            // Depth in the tree (0 = root)
  
  // --- Display & UI Logic ---
  display: {
    label: string;          // Human-readable name
    icon: string;           // Glyph identifier
    color: string;          // Hex code for UI accents
    description: string;    // Tooltip or helper text
    priority: number;       // For manual sorting within the same level
  };
  
  // --- System Metadata ---
  isLeaf: boolean;          // Can this tag have sub-tags?
  isSelectable: boolean;    // Can users attach objects to this specific node?
  createdAt: Date;
  updatedAt: Date;
}