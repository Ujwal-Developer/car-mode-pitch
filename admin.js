const priceOverrideStorageKey = "carModPriceOverrides";
const priceRows = document.querySelector("#priceRows");
const savePrices = document.querySelector("#savePrices");
const resetPrices = document.querySelector("#resetPrices");
const saveStatus = document.querySelector("#saveStatus");

const editablePrices = [
  {
    id: "stage-1-tune",
    name: "Stage 1 Tune",
    category: "Performance",
    defaultPrice: 850,
  },
  {
    id: "roof-wrap",
    name: "Roof Wrap",
    category: "Finish",
    defaultPrice: 950,
  },
  {
    id: "window-tints",
    name: "Window Tints",
    category: "Finish",
    defaultPrice: 450,
  },
  {
    id: "chrome-delete",
    name: "Chrome Delete",
    category: "Finish",
    defaultPrice: 650,
  },
  {
    id: "black-powder-coated-wheels",
    name: "Black Powder-coated Wheels",
    category: "Wheels",
    defaultPrice: 1900,
  },
  {
    id: "cat-back",
    name: "Cat-back Exhaust",
    category: "Performance",
    defaultPrice: 1850,
  },
];

function getSavedPrices() {
  try {
    return JSON.parse(localStorage.getItem(priceOverrideStorageKey)) || {};
  } catch {
    return {};
  }
}

function setStatus(message, type = "neutral") {
  saveStatus.textContent = message;
  saveStatus.dataset.type = type;
}

function renderRows() {
  const savedPrices = getSavedPrices();

  priceRows.innerHTML = editablePrices
    .map((item) => {
      const price = savedPrices[item.id] ?? item.defaultPrice;

      return `
        <tr>
          <td>
            <strong>${item.name}</strong>
            <span>Default: $${item.defaultPrice.toLocaleString("en-US")}</span>
          </td>
          <td>${item.category}</td>
          <td>
            <label class="sr-only" for="${item.id}">${item.name} price</label>
            <input
              class="price-input"
              id="${item.id}"
              type="number"
              min="0"
              step="25"
              value="${price}"
              data-price-id="${item.id}"
            />
          </td>
        </tr>
      `;
    })
    .join("");
}

function saveCurrentPrices() {
  const nextPrices = {};
  const inputs = document.querySelectorAll("[data-price-id]");

  inputs.forEach((input) => {
    const value = Number(input.value);
    const item = editablePrices.find((price) => price.id === input.dataset.priceId);

    if (!item || !Number.isFinite(value) || value < 0) return;
    nextPrices[item.id] = value;
  });

  localStorage.setItem(priceOverrideStorageKey, JSON.stringify(nextPrices));
  setStatus("Saved. Open the configurator to see updated prices.", "success");
}

priceRows.addEventListener("input", () => {
  setStatus("Unsaved changes", "warning");
});

savePrices.addEventListener("click", saveCurrentPrices);

resetPrices.addEventListener("click", () => {
  localStorage.removeItem(priceOverrideStorageKey);
  renderRows();
  setStatus("Prices reset to defaults.", "success");
});

renderRows();
