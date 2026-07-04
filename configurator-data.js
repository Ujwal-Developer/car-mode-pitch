const configuratorDatabase = {
  currency: "USD",
  laborRatePerHour: 125,

  universalMods: [
    {
      id: "ppf-front-end",
      name: "Front-End PPF",
      category: "Paint Protection",
      description: "Paint protection film for bumper, hood, mirrors, and fenders.",
      price: 1800,
      laborHours: 8,
      compatibleWith: "all",
    },
    {
      id: "ceramic-coating",
      name: "Ceramic Coating",
      category: "Detailing",
      description: "Exterior ceramic coating with paint prep.",
      price: 1100,
      laborHours: 6,
      compatibleWith: "all",
    },
    {
      id: "window-tints",
      name: "Window Tints",
      category: "Appearance",
      description: "Standard legal window tint package.",
      price: 450,
      laborHours: 2,
      compatibleWith: "all",
    },
  ],

  carSpecificMods: {
    "ford-mustang": {
      id: "ford-mustang",
      make: "Ford",
      model: "Mustang",
      displayName: "Ford Mustang",
      years: ["2018", "2019", "2020", "2021", "2022", "2023"],
      mods: [
        {
          id: "mustang-cat-back-exhaust",
          name: "Mustang Cat-Back Exhaust",
          category: "Exhaust",
          description: "Performance cat-back exhaust for Mustang GT models.",
          price: 1850,
          laborHours: 2.8,
        },
        {
          id: "mustang-stage-1-tune",
          name: "Mustang Stage 1 Tune",
          category: "Engine Tune",
          description: "Stage 1 ECU calibration for improved throttle response and power.",
          price: 850,
          laborHours: 1.5,
        },
        {
          id: "mustang-lowering-springs",
          name: "Mustang Lowering Springs",
          category: "Suspension",
          description: "Lowering spring kit for a more aggressive stance.",
          price: 650,
          laborHours: 3.5,
        },
      ],
    },

    "honda-civic": {
      id: "honda-civic",
      make: "Honda",
      model: "Civic",
      displayName: "Honda Civic",
      years: ["2018", "2019", "2020", "2021", "2022", "2023"],
      mods: [
        {
          id: "civic-cat-back-exhaust",
          name: "Civic Cat-Back Exhaust",
          category: "Exhaust",
          description: "Street-focused cat-back exhaust for Honda Civic builds.",
          price: 1350,
          laborHours: 2.4,
        },
        {
          id: "civic-stage-1-tune",
          name: "Civic Stage 1 Tune",
          category: "Engine Tune",
          description: "Stage 1 ECU tune for compatible turbo Civic trims.",
          price: 700,
          laborHours: 1.4,
        },
        {
          id: "civic-cold-air-intake",
          name: "Civic Cold Air Intake",
          category: "Intake",
          description: "Cold air intake system for improved intake flow and sound.",
          price: 425,
          laborHours: 1.2,
        },
      ],
    },
  },
};

function getAvailableModsForCar(carId) {
  const selectedCar = configuratorDatabase.carSpecificMods[carId];

  if (!selectedCar) {
    return [...configuratorDatabase.universalMods];
  }

  return [...configuratorDatabase.universalMods, ...selectedCar.mods];
}

function calculateSelectedModsTotal(selectedModIds, carId) {
  const availableMods = getAvailableModsForCar(carId);

  return selectedModIds.reduce(
    (quote, modId) => {
      const mod = availableMods.find((item) => item.id === modId);
      if (!mod) return quote;

      quote.partsTotal += mod.price;
      quote.laborHours += mod.laborHours;
      quote.selectedMods.push(mod);

      return quote;
    },
    {
      selectedMods: [],
      partsTotal: 0,
      laborHours: 0,
      laborTotal: 0,
      finalTotal: 0,
    },
  );
}

function calculateQuote(selectedModIds, carId) {
  const quote = calculateSelectedModsTotal(selectedModIds, carId);
  quote.laborTotal = quote.laborHours * configuratorDatabase.laborRatePerHour;
  quote.finalTotal = quote.partsTotal + quote.laborTotal;
  return quote;
}

if (typeof window !== "undefined") {
  window.configuratorDatabase = configuratorDatabase;
  window.getAvailableModsForCar = getAvailableModsForCar;
  window.calculateQuote = calculateQuote;
}
