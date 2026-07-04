const NHTSA_API_BASE = "https://vpic.nhtsa.dot.gov/api/vehicles";

const makeSelect = document.querySelector("#makeSelect");
const modelSelect = document.querySelector("#modelSelect");
const makeCache = new Map();
const modelCache = new Map();

function setSelectOptions(select, options, placeholder) {
  select.replaceChildren(new Option(placeholder, ""));

  options.forEach((option) => {
    const element = new Option(option.label, option.value);

    Object.entries(option.dataset || {}).forEach(([key, value]) => {
      element.dataset[key] = value;
    });

    select.append(element);
  });
}

function setSelectState(select, message, disabled = true) {
  select.replaceChildren(new Option(message, ""));
  select.disabled = disabled;
}

async function fetchVehicleApi(endpoint) {
  const response = await fetch(`${NHTSA_API_BASE}${endpoint}`);

  if (!response.ok) {
    throw new Error(`NHTSA request failed: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data.Results) ? data.Results : [];
}

async function getMakes() {
  if (makeCache.has("car")) {
    return makeCache.get("car");
  }

  const results = await fetchVehicleApi("/GetMakesForVehicleType/car?format=json");
  const makes = results
    .map((make) => ({
      id: make.MakeId || make.Make_ID,
      name: make.MakeName || make.Make_Name,
    }))
    .filter((make) => make.id && make.name)
    .sort((a, b) => a.name.localeCompare(b.name));

  makeCache.set("car", makes);
  return makes;
}

async function getModelsForMake(makeId) {
  if (modelCache.has(makeId)) {
    return modelCache.get(makeId);
  }

  const results = await fetchVehicleApi(
    `/GetModelsForMakeId/${encodeURIComponent(makeId)}?format=json`,
  );
  const seenModels = new Set();
  const models = results
    .map((model) => ({
      id: model.Model_ID || model.ModelId || model.Model_Name,
      name: model.Model_Name || model.ModelName,
    }))
    .filter((model) => {
      if (!model.name || seenModels.has(model.name)) return false;
      seenModels.add(model.name);
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  modelCache.set(makeId, models);
  return models;
}

async function populateMakeDropdown() {
  if (!makeSelect || !modelSelect) return;

  setSelectState(makeSelect, "Loading makes...");
  setSelectState(modelSelect, "Select a make first");

  try {
    const makes = await getMakes();
    setSelectOptions(
      makeSelect,
      makes.map((make) => ({
        value: make.id,
        label: make.name,
        dataset: {
          makeName: make.name,
        },
      })),
      "Select make",
    );
    makeSelect.disabled = false;
  } catch (error) {
    console.error(error);
    setSelectState(makeSelect, "Could not load makes");
  }
}

async function populateModelDropdown(makeId) {
  if (!modelSelect) return;

  if (!makeId) {
    setSelectState(modelSelect, "Select a make first");
    return;
  }

  setSelectState(modelSelect, "Loading models...");

  try {
    const models = await getModelsForMake(makeId);

    if (models.length === 0) {
      setSelectState(modelSelect, "No models found");
      return;
    }

    setSelectOptions(
      modelSelect,
      models.map((model) => ({
        value: model.id,
        label: model.name,
      })),
      "Select model",
    );
    modelSelect.disabled = false;
  } catch (error) {
    console.error(error);
    setSelectState(modelSelect, "Could not load models");
  }
}

if (makeSelect && modelSelect) {
  makeSelect.addEventListener("change", () => {
    populateModelDropdown(makeSelect.value);
  });

  populateMakeDropdown();
}

window.vehicleApiDropdowns = {
  getMakes,
  getModelsForMake,
  populateMakeDropdown,
  populateModelDropdown,
};
