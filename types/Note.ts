export interface Note {
  id: string;            // unique identifier
  title: string;         // note title
  content: string;       // main text
  color?: string;        // background color of the note card
  category?: "Work" | "Personal" | "Study" | "Other"; // optional category
  isImportant?: boolean; // mark as important
  createdAt?: string;    // when it was created
}
