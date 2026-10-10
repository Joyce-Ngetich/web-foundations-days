// DOM Element Selection with Safety Checks
const loadBtn = document.querySelector("#load-users");
const filterInput = document.querySelector("#filter-input");
const statusText = document.querySelector("#status");
const usersList = document.querySelector("#users-list");

const API_URL = "https://jsonplaceholder.typicode.com/users";

let usersData = [];

// Render function using safe DOM methods
function renderUsers(list) {
  if (!usersList) return;
  usersList.innerHTML = ""; // Clear existing list safe from XSS

  if (list.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.textContent = "No users match your filter.";
    emptyLi.style.color = "#64748b";
    usersList.appendChild(emptyLi);
    return;
  }

  list.forEach((user) => {
    const li = document.createElement("li");
    li.classList.add("user-card");

    // User Name
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("user-name");
    nameDiv.textContent = user.name;

    // Email, City, and Company details
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("user-info");

    // Extracting nested values safely
    const city = user.address ? user.address.city : "N/A";
    const company = user.company ? user.company.name : "N/A";

    infoDiv.textContent = `Email: ${user.email} | City: ${city} | Company: ${company}`;

    li.appendChild(nameDiv);
    li.appendChild(infoDiv);

    usersList.appendChild(li);
  });
}

// Async Function to fetch users using async/await and try/catch/finally
async function loadUsers() {
  statusText.textContent = "Loading users...";
  loadBtn.disabled = true;
  filterInput.disabled = true;
  usersList.innerHTML = "";

  try {
    const response = await fetch(API_URL);

    // Check HTTP status code
    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    usersData = data; // Store in state variable

    renderUsers(usersData);
    statusText.textContent = `Successfully loaded ${usersData.length} users.`;
    filterInput.disabled = false; // Enable search input once loaded
  } catch (error) {
    statusText.textContent =
      "Could not load users. Please check connection or URL.";
    console.error("Fetch Error:", error.message);
  } finally {
    loadBtn.disabled = false; // Re-enable button in all scenarios
  }
}

// Event Listeners
loadBtn.addEventListener("click", loadUsers);

// Case-insensitive filtering on stored array without making new requests
filterInput.addEventListener("input", () => {
  const query = filterInput.value.toLowerCase().trim();
  const filtered = usersData.filter((user) =>
    user.name.toLowerCase().includes(query),
  );
  renderUsers(filtered);
});
