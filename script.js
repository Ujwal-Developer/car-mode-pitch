const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const laborRate = 125;
const whatsAppBusinessNumber = "15551234567";
const priceOverrideStorageKey = "carModPriceOverrides";
const inventoryStorageKey = "shopOwnerInventory";

const cars = [
  {
    id: "mustang-gt",
    name: "Ford Mustang GT",
    note: "Strong fit for exhaust, tune, wheel, and aero packages.",
  },
  {
    id: "supra-mk5",
    name: "Toyota Supra MK5",
    note: "Popular for staged power, carbon aero, and premium wheels.",
  },
  {
    id: "wrangler-jl",
    name: "Jeep Wrangler JL",
    note: "Best suited for lift, wheel, tire, lighting, and off-road packages.",
  },
  {
    id: "civic-type-r",
    name: "Honda Civic Type R",
    note: "Great match for intake, exhaust, suspension, and track-focused mods.",
  },
];

const mods = {
  engineMod: [
    {
      id: "cold-air-intake",
      name: "Cold Air Intake",
      price: 450,
      laborHours: 1.2,
      cars: ["mustang-gt", "supra-mk5", "civic-type-r"],
    },
    {
      id: "stage-1-tune",
      name: "Stage 1 ECU Tune",
      price: 850,
      laborHours: 1.5,
      cars: ["mustang-gt", "supra-mk5", "civic-type-r"],
    },
    {
      id: "offroad-calibration",
      name: "Off-road Throttle Calibration",
      price: 390,
      laborHours: 1,
      cars: ["wrangler-jl"],
    },
  ],
  exhaustMod: [
    {
      id: "axle-back",
      name: "Axle-back Exhaust",
      price: 1200,
      laborHours: 2,
      cars: ["mustang-gt", "civic-type-r"],
    },
    {
      id: "cat-back",
      name: "Cat-back Exhaust",
      price: 1850,
      laborHours: 2.8,
      cars: ["mustang-gt", "supra-mk5", "civic-type-r"],
    },
    {
      id: "high-clearance-exhaust",
      name: "High-clearance Exhaust",
      price: 980,
      laborHours: 2,
      cars: ["wrangler-jl"],
    },
  ],
  suspensionMod: [
    {
      id: "lowering-springs",
      name: "Lowering Springs",
      price: 650,
      laborHours: 3.5,
      cars: ["mustang-gt", "supra-mk5", "civic-type-r"],
    },
    {
      id: "coilovers",
      name: "Adjustable Coilovers",
      price: 2100,
      laborHours: 5,
      cars: ["mustang-gt", "supra-mk5", "civic-type-r"],
    },
    {
      id: "lift-kit",
      name: "2.5-inch Lift Kit",
      price: 1650,
      laborHours: 5.5,
      cars: ["wrangler-jl"],
    },
  ],
  wheelMod: [
    {
      id: "flow-formed-wheels",
      name: "Flow-formed Wheel Set",
      price: 1450,
      laborHours: 1,
      cars: ["mustang-gt", "supra-mk5", "civic-type-r"],
    },
    {
      id: "forged-wheels",
      name: "Forged Wheel Set",
      price: 3600,
      laborHours: 1,
      cars: ["mustang-gt", "supra-mk5", "civic-type-r"],
    },
    {
      id: "offroad-wheel-tire",
      name: "Off-road Wheel and Tire Set",
      price: 2850,
      laborHours: 1.5,
      cars: ["wrangler-jl"],
    },
    {
      id: "black-powder-coated-wheels",
      name: "Black Powder-coated Wheels",
      price: 1900,
      laborHours: 1.5,
      cars: ["mustang-gt", "supra-mk5", "wrangler-jl", "civic-type-r"],
    },
  ],
  aeroMod: [
    {
      id: "front-lip",
      name: "Front Lip Kit",
      price: 520,
      laborHours: 1.8,
      cars: ["mustang-gt", "supra-mk5", "civic-type-r"],
    },
    {
      id: "carbon-aero",
      name: "Carbon Aero Package",
      price: 2400,
      laborHours: 4,
      cars: ["mustang-gt", "supra-mk5", "civic-type-r"],
    },
    {
      id: "steel-bumpers",
      name: "Steel Bumper Package",
      price: 1750,
      laborHours: 4.5,
      cars: ["wrangler-jl"],
    },
  ],
  finishMod: [
    {
      id: "ceramic-coating",
      name: "Ceramic Coating",
      price: 1100,
      laborHours: 6,
      cars: ["mustang-gt", "supra-mk5", "wrangler-jl", "civic-type-r"],
    },
    {
      id: "vinyl-wrap",
      name: "Full Vinyl Wrap",
      price: 3500,
      laborHours: 18,
      cars: ["mustang-gt", "supra-mk5", "wrangler-jl", "civic-type-r"],
    },
    {
      id: "roof-wrap",
      name: "Roof Wrap",
      price: 950,
      laborHours: 4,
      cars: ["mustang-gt", "supra-mk5", "wrangler-jl", "civic-type-r"],
    },
    {
      id: "ppf-track-pack",
      name: "Track Pack PPF",
      price: 1800,
      laborHours: 8,
      cars: ["mustang-gt", "supra-mk5", "civic-type-r"],
    },
    {
      id: "window-tints",
      name: "Window Tints",
      price: 450,
      laborHours: 2,
      cars: ["mustang-gt", "supra-mk5", "wrangler-jl", "civic-type-r"],
    },
    {
      id: "chrome-delete",
      name: "Chrome Delete",
      price: 650,
      laborHours: 3,
      cars: ["mustang-gt", "supra-mk5", "wrangler-jl", "civic-type-r"],
    },
  ],
  inventoryMod: [],
};

const modPackages = [
  {
    id: "stealth-pack",
    name: "Stealth Pack",
    description: "Window tints, chrome delete, and black powder-coated wheels.",
    discount: 300,
    cars: ["mustang-gt", "supra-mk5", "wrangler-jl", "civic-type-r"],
    itemIds: ["window-tints", "chrome-delete", "black-powder-coated-wheels"],
  },
  {
    id: "street-performance-pack",
    name: "Street Performance Pack",
    description: "Cold air intake, cat-back exhaust, lowering springs, and Stage 1 tune.",
    discount: 450,
    cars: ["mustang-gt", "supra-mk5", "civic-type-r"],
    itemIds: ["cold-air-intake", "cat-back", "lowering-springs", "stage-1-tune"],
  },
  {
    id: "trail-ready-pack",
    name: "Trail Ready Pack",
    description: "Lift kit, off-road wheel and tire set, high-clearance exhaust, and steel bumpers.",
    discount: 500,
    cars: ["wrangler-jl"],
    itemIds: ["lift-kit", "offroad-wheel-tire", "high-clearance-exhaust", "steel-bumpers"],
  },
];

function getPriceOverrides() {
  try {
    return JSON.parse(localStorage.getItem(priceOverrideStorageKey)) || {};
  } catch {
    return {};
  }
}

function applyPriceOverrides() {
  const overrides = getPriceOverrides();

  Object.values(mods)
    .flat()
    .forEach((mod) => {
      const override = Number(overrides[mod.id]);
      if (Number.isFinite(override) && override >= 0) {
        mod.price = override;
      }
    });
}

applyPriceOverrides();

function getShopInventory() {
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

function applyShopInventory() {
  const inventory = getShopInventory();
  const existingCarIds = new Set(cars.map((car) => car.id));

  inventory.cars.forEach((car) => {
    if (existingCarIds.has(car.id)) return;

    cars.push({
      id: car.id,
      name: `${car.make} ${car.model}`,
      note: "Added by the shop owner in inventory management.",
    });
    existingCarIds.add(car.id);
  });

  mods.inventoryMod = inventory.mods.map((mod) => ({
    id: `inventory-${mod.id}`,
    name: mod.name,
    price: mod.price,
    laborHours: 0,
    cars:
      mod.type === "Universal Mod"
        ? cars.map((car) => car.id)
        : [mod.carId],
  }));
}

applyShopInventory();

const form = document.querySelector("#buildForm");
const carSelect = document.querySelector("#carModel");
const packageSelect = document.querySelector("#modPackage");
const modSelects = Object.keys(mods).map((id) => document.querySelector(`#${id}`));
const selectedVehicle = document.querySelector("#selectedVehicle");
const vehicleNote = document.querySelector("#vehicleNote");
const selectedMods = document.querySelector("#selectedMods");
const partsSubtotal = document.querySelector("#partsSubtotal");
const laborTotal = document.querySelector("#laborTotal");
const finalTotal = document.querySelector("#finalTotal");
const headerTotal = document.querySelector("#headerTotal");
const qualificationBox = document.querySelector("#qualificationBox");
const qualificationStatus = document.querySelector("#qualificationStatus");
const qualificationMessage = document.querySelector("#qualificationMessage");
const clearBuild = document.querySelector("#clearBuild");
const whatsAppQuote = document.querySelector("#whatsAppQuote");
const customerName = document.querySelector("#customerName");
const customerPhone = document.querySelector("#customerPhone");
const customerEmail = document.querySelector("#customerEmail");

function populateCars() {
  carSelect.replaceChildren(new Option("Select a model", ""));

  cars.forEach((car) => {
    carSelect.append(new Option(car.name, car.id));
  });
}

function findModById(id) {
  return Object.values(mods)
    .flat()
    .find((mod) => mod.id === id);
}

function populatePackages() {
  const selectedCarId = carSelect.value;
  const currentValue = packageSelect.value;
  const placeholder = packageSelect.options[0].textContent;

  packageSelect.replaceChildren(new Option(placeholder, ""));

  modPackages
    .filter((pkg) => !selectedCarId || pkg.cars.includes(selectedCarId))
    .forEach((pkg) => {
      const packageTotal = calculatePackageTotals(pkg).total;
      const label = `${pkg.name} - ${formatter.format(packageTotal)}`;
      packageSelect.append(new Option(label, pkg.id));
    });

  const stillCompatible = Array.from(packageSelect.options).some(
    (option) => option.value === currentValue,
  );
  packageSelect.value = stillCompatible ? currentValue : "";
}

function populateMods() {
  const selectedCarId = carSelect.value;

  modSelects.forEach((select) => {
    const currentValue = select.value;
    const placeholder = select.options[0].textContent;
    select.replaceChildren(new Option(placeholder, ""));

    mods[select.id]
      .filter((mod) => !selectedCarId || mod.cars.includes(selectedCarId))
      .forEach((mod) => {
        const label = `${mod.name} - ${formatter.format(mod.price)}`;
        select.append(new Option(label, mod.id));
      });

    const stillCompatible = Array.from(select.options).some(
      (option) => option.value === currentValue,
    );
    select.value = stillCompatible ? currentValue : "";
  });
}

function getSelectedCar() {
  return cars.find((car) => car.id === carSelect.value);
}

function getSelectedPackage() {
  return modPackages.find((pkg) => pkg.id === packageSelect.value);
}

function getPackageItems(pkg) {
  if (!pkg) return [];
  return pkg.itemIds.map(findModById).filter(Boolean);
}

function calculatePackageTotals(pkg) {
  if (!pkg) {
    return {
      parts: 0,
      labor: 0,
      total: 0,
    };
  }

  const items = getPackageItems(pkg);
  const partsBeforeDiscount = items.reduce((sum, mod) => sum + mod.price, 0);
  const labor = items.reduce((sum, mod) => sum + mod.laborHours * laborRate, 0);
  const parts = Math.max(partsBeforeDiscount - pkg.discount, 0);

  return {
    parts,
    labor,
    total: parts + labor,
  };
}

function getSelectedStandaloneMods() {
  return modSelects
    .map((select) => mods[select.id].find((mod) => mod.id === select.value))
    .filter(Boolean);
}

function getSelectedBuildItems() {
  const selectedPackage = getSelectedPackage();
  const packageItems = getPackageItems(selectedPackage);
  const packageItemIds = new Set(packageItems.map((mod) => mod.id));
  const standaloneMods = getSelectedStandaloneMods().filter(
    (mod) => !packageItemIds.has(mod.id),
  );

  return {
    selectedPackage,
    packageItems,
    standaloneMods,
  };
}

function calculateBuild(buildItems) {
  const packageTotals = calculatePackageTotals(buildItems.selectedPackage);
  const standaloneParts = buildItems.standaloneMods.reduce(
    (sum, mod) => sum + mod.price,
    0,
  );
  const standaloneLabor = buildItems.standaloneMods.reduce(
    (sum, mod) => sum + mod.laborHours * laborRate,
    0,
  );
  const parts = packageTotals.parts + standaloneParts;
  const labor = packageTotals.labor + standaloneLabor;

  return {
    parts,
    labor,
    total: parts + labor,
  };
}

function getSelectedOptionText(select) {
  return select.selectedOptions[0]?.textContent || "Not provided";
}

function getLeadDetails() {
  return {
    name: customerName.value.trim(),
    phone: customerPhone.value.trim(),
    email: customerEmail.value.trim(),
  };
}

function buildWhatsAppMessage(totals) {
  const car = getSelectedCar();
  const buildItems = getSelectedBuildItems();
  const selectedPackage = buildItems.selectedPackage;
  const standaloneMods = buildItems.standaloneMods;
  const packageItems = getPackageItems(selectedPackage);
  const budget = getSelectedOptionText(document.querySelector("#budgetRange"));
  const timeline = getSelectedOptionText(document.querySelector("#timeline"));
  const lead = getLeadDetails();
  const lines = [
    "New custom build quote request",
    "",
    "Customer:",
    `Name: ${lead.name || "Not provided"}`,
    `Phone: ${lead.phone || "Not provided"}`,
    `Email: ${lead.email || "Not provided"}`,
    "",
    `Vehicle: ${car ? car.name : "Not selected"}`,
    `Budget: ${budget}`,
    `Timeline: ${timeline}`,
    "",
    "Selected build:",
  ];

  if (selectedPackage) {
    lines.push(
      `- Package: ${selectedPackage.name} (${formatter.format(
        calculatePackageTotals(selectedPackage).total,
      )})`,
      `  Includes: ${packageItems.map((mod) => mod.name).join(", ")}`,
    );
  }

  standaloneMods.forEach((mod) => {
    lines.push(`- ${mod.name}: ${formatter.format(mod.price)}`);
  });

  lines.push(
    "",
    `Parts subtotal: ${formatter.format(totals.parts)}`,
    `Estimated labor: ${formatter.format(totals.labor)}`,
    `Estimated final price: ${formatter.format(totals.total)}`,
    "",
    "Please confirm availability and next steps.",
  );

  return lines.join("\n");
}

function buildWhatsAppUrl(totals) {
  const message = encodeURIComponent(buildWhatsAppMessage(totals));
  return `https://wa.me/${whatsAppBusinessNumber}?text=${message}`;
}

function scoreLead(total) {
  const budget = Number(document.querySelector("#budgetRange").value);
  const timeline = document.querySelector("#timeline").value;
  const hasVehicle = Boolean(carSelect.value);
  const buildItems = getSelectedBuildItems();
  const hasMods =
    Boolean(buildItems.selectedPackage) || buildItems.standaloneMods.length > 0;

  if (!hasVehicle || !hasMods || !budget || !timeline) {
    return {
      status: "Not qualified yet",
      className: "",
      message: "Select a vehicle, mods, budget, and timeline to qualify the lead.",
    };
  }

  let score = 0;
  if (budget >= total) score += 45;
  if (timeline === "asap") score += 35;
  if (timeline === "30") score += 25;
  if (timeline === "90") score += 10;
  if (hasMods) score += 20;
  if (buildItems.selectedPackage) score += 15;

  if (score >= 75) {
    return {
      status: "Hot lead",
      className: "hot",
      message: "Budget and timing look strong. This build is ready for a fast sales follow-up.",
    };
  }

  if (score >= 45) {
    return {
      status: "Warm lead",
      className: "warm",
      message: "There is real intent here. Follow up with options, financing, or a phased build.",
    };
  }

  return {
    status: "Cold lead",
    className: "cold",
    message: "This lead may need education, a lower entry package, or more time before booking.",
  };
}

function renderSummary() {
  const car = getSelectedCar();
  const lead = getLeadDetails();
  const buildItems = getSelectedBuildItems();
  const selected = [
    ...(buildItems.selectedPackage
      ? [
          {
            ...buildItems.selectedPackage,
            type: "package",
            totals: calculatePackageTotals(buildItems.selectedPackage),
          },
        ]
      : []),
    ...buildItems.standaloneMods.map((mod) => ({ ...mod, type: "standalone" })),
  ];
  const totals = calculateBuild(buildItems);
  const qualification = scoreLead(totals.total);

  selectedVehicle.textContent = car ? car.name : "Choose a car";
  vehicleNote.textContent = car
    ? car.note
    : "Compatible options will appear in your quote.";

  if (selected.length === 0) {
    selectedMods.innerHTML = '<li class="empty-state">No mods selected yet.</li>';
  } else {
    selectedMods.innerHTML = selected
      .map(
        (item) => `
          <li class="${item.type === "package" ? "package-item" : ""}">
            <div>
              <div>${item.name}</div>
              <div class="mod-meta">${
                item.type === "package"
                  ? `${item.description} Includes ${getPackageItems(item)
                      .map((mod) => mod.name)
                      .join(", ")}.`
                  : `${item.laborHours} labor hrs`
              }</div>
            </div>
            <strong>${
              item.type === "package"
                ? formatter.format(item.totals.total)
                : formatter.format(item.price)
            }</strong>
          </li>
        `,
      )
      .join("");
  }

  partsSubtotal.textContent = formatter.format(totals.parts);
  laborTotal.textContent = formatter.format(totals.labor);
  finalTotal.textContent = formatter.format(totals.total);
  headerTotal.textContent = formatter.format(totals.total);

  qualificationBox.className = `qualification ${qualification.className}`.trim();
  qualificationStatus.textContent = qualification.status;
  qualificationMessage.textContent = qualification.message;

  whatsAppQuote.disabled = !car || selected.length === 0 || !lead.name || !lead.phone;
  whatsAppQuote.title = whatsAppQuote.disabled
    ? "Select a car, choose mods, and enter name and phone."
    : "Send this build to WhatsApp.";
  whatsAppQuote.dataset.url = buildWhatsAppUrl(totals);
}

form.addEventListener("change", (event) => {
  if (event.target.id === "carModel") {
    populatePackages();
    populateMods();
  }

  renderSummary();
});

form.addEventListener("input", renderSummary);

clearBuild.addEventListener("click", () => {
  form.reset();
  populatePackages();
  populateMods();
  renderSummary();
});

whatsAppQuote.addEventListener("click", () => {
  if (whatsAppQuote.disabled || !whatsAppQuote.dataset.url) return;
  window.open(whatsAppQuote.dataset.url, "_blank", "noopener,noreferrer");
});

populateCars();
populatePackages();
populateMods();
renderSummary();
