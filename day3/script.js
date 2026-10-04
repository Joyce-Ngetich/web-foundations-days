// 1. Starting Data
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// -------------------------------------------------------------
// Function 1: searchNotes(word)
// Returns notes containing `word` (case-insensitive)
// -------------------------------------------------------------
function searchNotes(word) {
  const lowerWord = word.toLowerCase();
  return notes.filter((note) => note.text.toLowerCase().includes(lowerWord));
}

// -------------------------------------------------------------
// Function 2: longestNote()
// Returns the note with the most characters, or null if empty
// -------------------------------------------------------------
function longestNote() {
  if (notes.length === 0) return null;

  let longest = notes[0];
  for (const note of notes) {
    if (note.text.length > longest.text.length) {
      longest = note;
    }
  }
  return longest;
}

// -------------------------------------------------------------
// Function 3: countByCategory()
// Returns an object with note counts grouped by category
// -------------------------------------------------------------
function countByCategory() {
  const counts = {};
  for (const note of notes) {
    const category = note.category;
    counts[category] = (counts[category] || 0) + 1;
  }
  return counts;
}

// -------------------------------------------------------------
// Function 4: getSummary()
// Returns a summary string, e.g., "5 notes: 2 personal, 1 work, 2 study."
// -------------------------------------------------------------
function getSummary() {
  const counts = countByCategory();
  const totalNotes = notes.length;
  const noteWord = totalNotes === 1 ? "note" : "notes";

  const categoryParts = Object.entries(counts).map(
    ([category, count]) => `${count} ${category}`,
  );

  return `${totalNotes} ${noteWord}: ${categoryParts.join(", ")}.`;
}

// -------------------------------------------------------------
// Function 5: isDuplicate(text)
// Checks if note text already exists (ignores case and extra spaces)
// -------------------------------------------------------------
function isDuplicate(text) {
  const cleanText = text.trim().toLowerCase();
  return notes.some((note) => note.text.trim().toLowerCase() === cleanText);
}

// -------------------------------------------------------------
// Function 6: addNote(text, category)
// Validates length (1-200), duplicate status, and category before adding
// -------------------------------------------------------------
function addNote(text, category) {
  const cleanedText = text.trim();
  const validCategories = ["personal", "work", "study"];

  if (cleanedText.length < 1 || cleanedText.length > 200) {
    console.log("❌ Rejected: Note text must be between 1 and 200 characters.");
    return false;
  }

  if (isDuplicate(text)) {
    console.log(`❌ Rejected: A duplicate note already exists.`);
    return false;
  }

  if (!validCategories.includes(category)) {
    console.log(`❌ Rejected: Category must be personal, work, or study.`);
    return false;
  }

  const newId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) + 1 : 1;
  const newNote = {
    id: newId,
    text: cleanedText,
    category: category,
  };

  notes.push(newNote);
  console.log(`✅ Added: "${newNote.text}" (${newNote.category})`);
  return true;
}

// =============================================================
// TEST SUITE (2 Console log calls per function)
// =============================================================

console.log("--- Testing searchNotes ---");
console.log(searchNotes("Day"));
// Expected output: [{ id: 2, text: "Finish the Day 3 assignment", category: "study" }]

console.log(searchNotes("Python"));
// Expected output: [] (Edge case: word not found)

console.log("--- Testing longestNote ---");
console.log(longestNote());
// Expected output: { id: 3, text: "Email the project report to Grace", category: "work" }

const savedNotes = notes;
notes = []; // Temporary clear for edge case
console.log(longestNote());
// Expected output: null (Edge case: empty notes array)
notes = savedNotes; // Restore notes

console.log("--- Testing countByCategory ---");
console.log(countByCategory());
// Expected output: { personal: 2, study: 2, work: 1 }

const tempNotes = notes;
notes = [{ id: 1, text: "Test", category: "personal" }]; // Single category test
console.log(countByCategory());
// Expected output: { personal: 1 } (Edge case: single note)
notes = tempNotes; // Restore notes

console.log("--- Testing getSummary ---");
console.log(getSummary());
// Expected output: "5 notes: 2 personal, 2 study, 1 work."

notes = [{ id: 1, text: "Standalone item", category: "work" }];
console.log(getSummary());
// Expected output: "1 note: 1 work." (Edge case: singular 'note')
notes = tempNotes; // Restore notes

console.log("--- Testing isDuplicate ---");
console.log(isDuplicate("  call MUM  "));
// Expected output: true (Normal case: matches "Call mum" ignoring case and whitespace)

console.log(isDuplicate("Buy fresh fruit"));
// Expected output: false (Edge case: text does not exist)

console.log("--- Testing addNote ---");
console.log(addNote("Submit project PR", "work"));
// Expected output: ✅ Added message and returns true

console.log(addNote("   ", "personal"));
// Expected output: ❌ Rejected message and returns false (Edge case: empty spaces)

console.log(addNote("Read a book", "fitness"));
// Expected output: ❌ Rejected message and returns false (Edge case: invalid category)
