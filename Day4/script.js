// Select elements
const textarea = document.querySelector("#note-text");
const charCount = document.querySelector("#char-count");
const wordCount = document.querySelector("#word-count");
const clearBtn = document.querySelector("#clear-btn");
const themeToggle = document.querySelector("#theme-toggle");

const DRAFT_KEY = "day4_draft_text";
const THEME_KEY = "day4_theme_choice";

// Function to update counters and styling
function updateCounts() {
  const text = textarea.value;
  const len = text.length;

  // Word count calculation
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  // Update text content
  charCount.textContent = `${len} / 200 characters`;
  wordCount.textContent = `${words} ${words === 1 ? "word" : "words"}`;

  // Reset warning/over classes
  charCount.classList.remove("warning", "over");

  if (len > 200) {
    charCount.classList.add("over");
  } else if (len > 180) {
    charCount.classList.add("warning");
  }
}

// Function to clear input and draft
function clearAll() {
  textarea.value = "";
  localStorage.removeItem(DRAFT_KEY);
  updateCounts();
}

// Event: Input event (update counts & save draft)
textarea.addEventListener("input", () => {
  updateCounts();
  localStorage.setItem(DRAFT_KEY, textarea.value);
});

// Event: Escape key inside textarea clears content
textarea.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    clearAll();
  }
});

// Event: Clear button
clearBtn.addEventListener("click", clearAll);

// Event: Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");

  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
});

// Initial load restore logic
window.addEventListener("DOMContentLoaded", () => {
  // Restore Draft
  const savedDraft = localStorage.getItem(DRAFT_KEY);
  if (savedDraft !== null) {
    textarea.value = savedDraft;
  }

  // Restore Theme
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "Light mode";
  } else {
    document.body.classList.remove("dark");
    themeToggle.textContent = "Dark mode";
  }

  // Initial count update
  updateCounts();
});
