const standardMods = [
  {
    id: "ppf",
    name: "Paint Protection Film",
    category: "Protection",
    description: "Front-end PPF package for hood, bumper, mirrors, and fenders.",
    price: 1800,
  },
  {
    id: "tints",
    name: "Window Tints",
    category: "Appearance",
    description: "Standard tint package with customer-selected shade.",
    price: 450,
  },
  {
    id: "ceramic-coating",
    name: "Ceramic Coating",
    category: "Detailing",
    description: "Exterior ceramic coating with paint prep.",
    price: 1100,
  },
  {
    id: "cat-back-exhaust",
    name: "Cat-Back Exhaust",
    category: "Performance",
    description: "Common cat-back exhaust install starting price.",
    price: 1650,
  },
  {
    id: "stage-1-tune",
    name: "Stage 1 Tune",
    category: "Performance",
    description: "Base ECU tune price before vehicle-specific add-ons.",
    price: 850,
  },
];

const tableBody = document.querySelector("#modsTableBody");
const modCount = document.querySelector("#modCount");
const statusMessage = document.querySelector("#statusMessage");
const loginPanel = document.querySelector("#loginPanel");
const dashboardApp = document.querySelector("#dashboardApp");
const loginForm = document.querySelector("#loginForm");
const loginError = document.querySelector("#loginError");
const logoutButton = document.querySelector("#logoutButton");
const carForm = document.querySelector("#carForm");
const inventoryModForm = document.querySelector("#inventoryModForm");
const assignedCarSelect = document.querySelector("#assignedCar");
const inventoryStatus = document.querySelector("#inventoryStatus");
const carInventoryList = document.querySelector("#carInventoryList");
const carInventoryCount = document.querySelector("#carInventoryCount");
const inventoryTableBody = document.querySelector("#inventoryTableBody");
const modInventoryCount = document.querySelector("#modInventoryCount");
const inventoryStorageKey = "shopOwnerInventory";
const adminSessionKey = "shopOwnerAdminLoggedIn";
const demoCredentials = {
  username: "owner",
  password: "modshop123",
};
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function setStatus(message, type = "") {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`.trim();
}

function setInventoryStatus(message, type = "") {
  inventoryStatus.textContent = message;
  inventoryStatus.className = `status-message ${type}`.trim();
}

function showDashboard() {
  loginPanel.classList.add("is-hidden");
  dashboardApp.classList.remove("is-hidden");
}

function showLogin() {
  loginPanel.classList.remove("is-hidden");
  dashboardApp.classList.add("is-hidden");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getModById(modId) {
  return standardMods.find((mod) => mod.id === modId);
}

function getInventory() {
  const fallback = {
    cars: [],
    mods: [],
  };

  try {
    const inventory = JSON.parse(localStorage.getItem(inventoryStorageKey)) || fallback;
    return {
      cars: Array.isArray(inventory.cars) ? inventory.cars : [],
      mods: Array.isArray(inventory.mods) ? inventory.mods : [],
    };
  } catch {
    return fallback;
  }
}

function saveInventory(inventory) {
  localStorage.setItem(inventoryStorageKey, JSON.stringify(inventory));
}

function renderDashboard() {
  modCount.textContent = standardMods.length;
  tableBody.innerHTML = standardMods.map(renderReadOnlyRow).join("");
}

function renderReadOnlyRow(mod) {
  return `
    <tr data-mod-id="${mod.id}">
      <td>
        <span class="mod-name">${mod.name}</span>
        <span class="mod-description">${mod.description}</span>
      </td>
      <td>${mod.category}</td>
      <td class="price-cell">${currencyFormatter.format(mod.price)}</td>
      <td class="action-cell">
        <button type="button" class="edit-button" data-action="edit">Edit</button>
      </td>
    </tr>
  `;
}

function renderEditableRow(row, mod) {
  row.innerHTML = `
    <td>
      <span class="mod-name">${mod.name}</span>
      <span class="mod-description">${mod.description}</span>
    </td>
    <td>${mod.category}</td>
    <td class="price-cell">
      <input
        class="price-input"
        type="number"
        min="0"
        step="25"
        value="${mod.price}"
        aria-label="New price for ${mod.name}"
      />
    </td>
    <td class="action-cell">
      <div class="button-group">
        <button type="button" class="save-button" data-action="save">Save</button>
        <button type="button" class="cancel-button" data-action="cancel">Cancel</button>
      </div>
    </td>
  `;

  row.querySelector(".price-input").focus();
}

function enterEditMode(row) {
  const mod = getModById(row.dataset.modId);
  if (!mod) return;

  renderEditableRow(row, mod);
  setStatus(`Editing ${mod.name}`, "warning");
}

function savePrice(row) {
  const mod = getModById(row.dataset.modId);
  const input = row.querySelector(".price-input");
  const nextPrice = Number(input.value);

  if (!mod || !Number.isFinite(nextPrice) || nextPrice < 0) {
    setStatus("Enter a valid price.", "warning");
    return;
  }

  mod.price = nextPrice;
  row.outerHTML = renderReadOnlyRow(mod);
  setStatus(`${mod.name} updated to ${currencyFormatter.format(nextPrice)}.`, "success");
}

function cancelEdit(row) {
  const mod = getModById(row.dataset.modId);
  if (!mod) return;

  row.outerHTML = renderReadOnlyRow(mod);
  setStatus("Edit cancelled.");
}

tableBody.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const row = button.closest("tr");
  const action = button.dataset.action;

  if (action === "edit") enterEditMode(row);
  if (action === "save") savePrice(row);
  if (action === "cancel") cancelEdit(row);
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const username = String(formData.get("adminUsername")).trim();
  const password = String(formData.get("adminPassword"));

  if (username !== demoCredentials.username || password !== demoCredentials.password) {
    loginError.textContent = "Invalid demo credentials.";
    return;
  }

  sessionStorage.setItem(adminSessionKey, "true");
  loginError.textContent = "";
  loginForm.reset();
  showDashboard();
});

logoutButton.addEventListener("click", () => {
  sessionStorage.removeItem(adminSessionKey);
  showLogin();
});

function getCarLabel(car) {
  return `${car.make} ${car.model}`;
}

function renderAssignedCarOptions(cars) {
  assignedCarSelect.replaceChildren(
    new Option(cars.length === 0 ? "Add a car first" : "Select car", ""),
  );

  cars.forEach((car) => {
    assignedCarSelect.append(new Option(getCarLabel(car), car.id));
  });

  assignedCarSelect.disabled = cars.length === 0;
}

function renderCarInventory(cars) {
  carInventoryCount.textContent = cars.length;

  if (cars.length === 0) {
    carInventoryList.innerHTML =
      '<li><strong>No cars added yet</strong><span>Add a make and model to start assigning mods.</span></li>';
    return;
  }

  carInventoryList.innerHTML = cars
    .map(
      (car) => `
        <li>
          <strong>${escapeHtml(getCarLabel(car))}</strong>
          <span>Added to inventory</span>
        </li>
      `,
    )
    .join("");
}

function renderModInventory(inventory) {
  modInventoryCount.textContent = inventory.mods.length;

  if (inventory.mods.length === 0) {
    inventoryTableBody.innerHTML = `
      <tr>
        <td colspan="4" class="empty-inventory">No inventory mods added yet.</td>
      </tr>
    `;
    return;
  }

  inventoryTableBody.innerHTML = inventory.mods
    .map((mod) => {
      const assignedCar = inventory.cars.find((car) => car.id === mod.carId);
      const carLabel = assignedCar ? getCarLabel(assignedCar) : "Unassigned";

      return `
        <tr>
          <td>
            <span class="mod-name">${escapeHtml(mod.name)}</span>
          </td>
          <td><span class="inventory-type-pill">${escapeHtml(mod.type)}</span></td>
          <td>${escapeHtml(carLabel)}</td>
          <td>${currencyFormatter.format(mod.price)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderInventoryDashboard() {
  const inventory = getInventory();
  renderAssignedCarOptions(inventory.cars);
  renderCarInventory(inventory.cars);
  renderModInventory(inventory);
}

carForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(carForm);
  const make = String(formData.get("carMake")).trim();
  const model = String(formData.get("carModel")).trim();

  if (!make || !model) {
    setInventoryStatus("Enter both make and model.", "warning");
    return;
  }

  const inventory = getInventory();
  inventory.cars.push({
    id: crypto.randomUUID(),
    make,
    model,
  });

  saveInventory(inventory);
  carForm.reset();
  renderInventoryDashboard();
  setInventoryStatus(`${make} ${model} added.`, "success");
});

inventoryModForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const inventory = getInventory();
  const formData = new FormData(inventoryModForm);
  const name = String(formData.get("inventoryModName")).trim();
  const type = String(formData.get("inventoryModType"));
  const price = Number(formData.get("inventoryModPrice"));
  const carId = String(formData.get("assignedCar"));

  if (inventory.cars.length === 0) {
    setInventoryStatus("Add a car before adding mods.", "warning");
    return;
  }

  if (!name || !type || !carId || !Number.isFinite(price) || price < 0) {
    setInventoryStatus("Complete all mod fields with a valid price.", "warning");
    return;
  }

  inventory.mods.push({
    id: crypto.randomUUID(),
    name,
    type,
    price,
    carId,
  });

  saveInventory(inventory);
  inventoryModForm.reset();
  renderInventoryDashboard();
  setInventoryStatus(`${name} added to inventory.`, "success");
});

renderDashboard();
renderInventoryDashboard();

if (sessionStorage.getItem(adminSessionKey) === "true") {
  showDashboard();
} else {
  showLogin();
}
