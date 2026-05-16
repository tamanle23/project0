interface ResourceObject {
  id: string;
  name: string;
   // only blob type support store object's data, 
  // others only store link or simple text
  type: 'image' | 'video' | 'document' | 'blob'; 
  title: string;
  // --- The Taxonomy Link ---
  // We store the specific "Leaf" tags. 
  // The system infers the ancestors via the Tag Object's hierarchy.
  tagIds: string[]; 
  
  // --- Dynamic Properties ---
  attributes: Record<string, any>; // Type-specific data
  
  // --- Ownership & Access ---
  ownerId: string;
  visibility: 'private' | 'public' | 'internal';
}