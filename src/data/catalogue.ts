import type { CatalogueMake, Category, ConditionGrade, FuelType, OwnershipCount, Transmission } from "./types";
import { catalogueExtra } from "./catalogue-extra";

export const categorySubcategories: Record<Category, string[]> = {
  Cars: ["Hatchback", "Sedan", "SUV", "MPV", "Coupe", "Convertible", "Pickup", "Electric car", "CNG / Hybrid", "Luxury"],
  Bikes: ["Commuter", "Sports", "Cruiser", "Adventure", "Superbike", "Electric motorcycle"],
  Scooters: ["Petrol scooter", "Electric scooter", "Maxi scooter", "Moped"],
  Commercial: ["Auto-rickshaw / 3-wheeler", "Van", "Pickup", "LCV", "Truck", "Bus", "Tractor"],
  "Bicycles & Kids": ["City bicycle", "Mountain bike", "Road bike", "E-bike", "Kids' bicycle", "Cargo cycle"],
};

const carYears = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];
const shortYears = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018];

const catalogueBase: CatalogueMake[] = [
  {
    make: "Maruti Suzuki",
    categories: ["Cars"],
    models: {
      Cars: [
        { model: "Swift", variants: ["LXi", "VXi", "ZXi", "ZXi+"], years: carYears },
        { model: "Baleno", variants: ["Sigma", "Delta", "Zeta", "Alpha"], years: carYears },
        { model: "Brezza", variants: ["LXi", "VXi", "ZXi", "ZXi+"], years: carYears },
        { model: "Grand Vitara", variants: ["Sigma", "Delta", "Zeta", "Alpha+"], years: shortYears },
        { model: "Ertiga", variants: ["LXi", "VXi", "ZXi", "ZXi+"], years: carYears },
        { model: "Fronx", variants: ["Sigma", "Delta", "Delta+", "Alpha"], years: shortYears },
      ],
    },
  },
  {
    make: "Tata",
    categories: ["Cars", "Commercial"],
    models: {
      Cars: [
        { model: "Nexon", variants: ["Smart", "Pure", "Creative", "Fearless+"], years: carYears },
        { model: "Punch", variants: ["Pure", "Adventure", "Accomplished", "Creative"], years: shortYears },
        { model: "Safari", variants: ["Smart", "Pure", "Adventure", "Accomplished", "XZA+"], years: carYears },
        { model: "Harrier", variants: ["Smart", "Pure", "Adventure", "Fearless"], years: carYears },
        { model: "Tiago", variants: ["XE", "XM", "XT", "XZ+"], years: carYears },
      ],
      Commercial: [
        { model: "Ace Gold", variants: ["Petrol", "Diesel", "CNG", "EV"], years: carYears },
        { model: "Intra V30", variants: ["Base", "High"], years: shortYears },
        { model: "LPT 1109", variants: ["Standard", "Long wheelbase"], years: carYears },
      ],
    },
  },
  {
    make: "Mahindra",
    categories: ["Cars", "Commercial"],
    models: {
      Cars: [
        { model: "Scorpio-N", variants: ["Z2", "Z4", "Z6", "Z8", "Z8 L"], years: shortYears },
        { model: "XUV700", variants: ["MX", "AX3", "AX5", "AX7", "AX7 L"], years: shortYears },
        { model: "Thar", variants: ["AX Opt", "LX Hard Top", "LX Convertible"], years: carYears },
        { model: "Bolero", variants: ["B4", "B6", "B6 Opt"], years: carYears },
      ],
      Commercial: [
        { model: "Bolero Pik-Up", variants: ["1.3T", "1.7T", "Extra Long"], years: carYears },
        { model: "Supro Profit Truck", variants: ["Mini", "Maxi"], years: shortYears },
        { model: "Treo", variants: ["SFT", "HRT", "Zor Grand"], years: shortYears },
      ],
    },
  },
  {
    make: "Hyundai",
    categories: ["Cars"],
    models: {
      Cars: [
        { model: "Creta", variants: ["E", "EX", "S", "SX", "SX(O)"], years: carYears },
        { model: "Venue", variants: ["E", "S", "S(O)", "SX", "SX(O)"], years: carYears },
        { model: "i20", variants: ["Era", "Magna", "Sportz", "Asta(O)"], years: carYears },
        { model: "Exter", variants: ["EX", "S", "SX", "SX(O)"], years: shortYears },
      ],
    },
  },
  {
    make: "Honda",
    categories: ["Cars", "Bikes", "Scooters"],
    models: {
      Cars: [
        { model: "City", variants: ["SV", "V", "VX", "ZX"], years: carYears },
        { model: "Amaze", variants: ["E", "S", "VX"], years: carYears },
        { model: "Elevate", variants: ["SV", "V", "VX", "ZX"], years: shortYears },
      ],
      Bikes: [
        { model: "Shine 125", variants: ["Drum", "Disc"], years: carYears },
        { model: "SP 125", variants: ["Drum", "Disc"], years: shortYears },
        { model: "Hornet 2.0", variants: ["Standard"], years: shortYears },
        { model: "CB350", variants: ["DLX", "DLX Pro", "H'ness"], years: shortYears },
      ],
      Scooters: [
        { model: "Activa 6G", variants: ["STD", "DLX", "Smart"], years: carYears },
        { model: "Dio 125", variants: ["STD", "DLX", "H-Smart"], years: shortYears },
      ],
    },
  },
  {
    make: "Toyota",
    categories: ["Cars"],
    models: {
      Cars: [
        { model: "Innova Crysta", variants: ["G", "GX", "VX", "ZX"], years: carYears },
        { model: "Innova Hycross", variants: ["G", "GX", "VX", "ZX(O)"], years: shortYears },
        { model: "Fortuner", variants: ["4x2 MT", "4x2 AT", "4x4 AT", "Legender"], years: carYears },
        { model: "Urban Cruiser Hyryder", variants: ["E", "S", "G", "V"], years: shortYears },
      ],
    },
  },
  {
    make: "Kia",
    categories: ["Cars"],
    models: {
      Cars: [
        { model: "Seltos", variants: ["HTE", "HTK", "HTK+", "HTX", "GTX+"], years: carYears },
        { model: "Sonet", variants: ["HTE", "HTK", "HTK+", "HTX", "GTX+"], years: carYears },
        { model: "Carens", variants: ["Premium", "Prestige", "Luxury", "Luxury Plus"], years: shortYears },
      ],
    },
  },
  {
    make: "MG",
    categories: ["Cars"],
    models: {
      Cars: [
        { model: "Hector", variants: ["Style", "Shine", "Smart", "Sharp Pro"], years: carYears },
        { model: "Astor", variants: ["Style", "Shine", "Select", "Sharp"], years: shortYears },
        { model: "Comet EV", variants: ["Pace", "Play", "Plush"], years: shortYears },
      ],
    },
  },
  {
    make: "Royal Enfield",
    categories: ["Bikes"],
    models: {
      Bikes: [
        { model: "Classic 350", variants: ["Redditch", "Halcyon", "Signals", "Chrome"], years: carYears },
        { model: "Hunter 350", variants: ["Retro", "Metro", "Metro Rebel"], years: shortYears },
        { model: "Bullet 350", variants: ["Military", "Standard", "Black Gold"], years: carYears },
        { model: "Himalayan 450", variants: ["Base", "Pass", "Summit"], years: shortYears },
        { model: "Meteor 350", variants: ["Fireball", "Stellar", "Supernova"], years: shortYears },
      ],
    },
  },
  {
    make: "Hero",
    categories: ["Bikes", "Scooters", "Bicycles & Kids"],
    models: {
      Bikes: [
        { model: "Splendor Plus", variants: ["Drum", "i3S", "Xtec"], years: carYears },
        { model: "HF Deluxe", variants: ["Kick", "Self", "i3S"], years: carYears },
        { model: "Xpulse 200 4V", variants: ["Base", "Pro", "Rally"], years: shortYears },
      ],
      Scooters: [{ model: "Xoom 110", variants: ["LX", "VX", "ZX"], years: shortYears }],
      "Bicycles & Kids": [
        { model: "Sprint E-Bike", variants: ["27.5 inch", "26 inch"], years: shortYears },
        { model: "Ranger DTB", variants: ["26T", "27.5T"], years: shortYears },
      ],
    },
  },
  {
    make: "Bajaj",
    categories: ["Bikes", "Commercial"],
    models: {
      Bikes: [
        { model: "Pulsar 125", variants: ["Drum", "Disc", "Carbon Fibre"], years: carYears },
        { model: "Pulsar NS200", variants: ["Standard"], years: carYears },
        { model: "Dominar 400", variants: ["Standard", "Tourer"], years: shortYears },
        { model: "Platina 110", variants: ["Drum", "ABS"], years: carYears },
      ],
      Commercial: [
        { model: "RE Compact", variants: ["Petrol", "CNG", "LPG", "Diesel"], years: carYears },
        { model: "Maxima C", variants: ["Cargo", "Passenger"], years: shortYears },
      ],
    },
  },
  {
    make: "TVS",
    categories: ["Bikes", "Scooters"],
    models: {
      Bikes: [
        { model: "Apache RTR 160 4V", variants: ["Drum", "Disc", "Special Edition"], years: carYears },
        { model: "Raider 125", variants: ["Drum", "Disc", "Super Squad"], years: shortYears },
      ],
      Scooters: [
        { model: "Jupiter 110", variants: ["Drum", "Disc", "SmartXonnect"], years: carYears },
        { model: "Ntorq 125", variants: ["Drum", "Race XP", "Super Squad"], years: carYears },
        { model: "iQube", variants: ["S", "ST 3.4", "ST 5.1"], years: shortYears },
      ],
    },
  },
  {
    make: "Ather",
    categories: ["Scooters"],
    models: {
      Scooters: [
        { model: "450X", variants: ["2.9 kWh", "3.7 kWh Pro Pack"], years: shortYears },
        { model: "450S", variants: ["3.0 kWh"], years: shortYears },
        { model: "Rizta", variants: ["S 2.9", "Z 2.9", "Z 3.7"], years: shortYears },
      ],
    },
  },
  {
    make: "Ola Electric",
    categories: ["Scooters"],
    models: {
      Scooters: [
        { model: "S1 Pro", variants: ["3 kWh", "4 kWh"], years: shortYears },
        { model: "S1 Air", variants: ["2 kWh", "3 kWh"], years: shortYears },
        { model: "S1 X", variants: ["2 kWh", "3 kWh", "4 kWh"], years: shortYears },
      ],
    },
  },
  {
    make: "Ashok Leyland",
    categories: ["Commercial"],
    models: {
      Commercial: [
        { model: "Dost+", variants: ["LS", "LX", "CNG"], years: carYears },
        { model: "Bada Dost", variants: ["i3", "i4", "CNG"], years: shortYears },
        { model: "Ecomet 1015", variants: ["HE", "Standard"], years: carYears },
      ],
    },
  },
  {
    make: "Eicher",
    categories: ["Commercial"],
    models: {
      Commercial: [
        { model: "Pro 2049", variants: ["Standard", "CNG"], years: carYears },
        { model: "Pro 3015", variants: ["Standard", "Long"], years: shortYears },
      ],
    },
  },
  {
    make: "Firefox",
    categories: ["Bicycles & Kids"],
    models: {
      "Bicycles & Kids": [
        { model: "Bad Attitude 24", variants: ["24T", "26T"], years: shortYears },
        { model: "Cyclone Pro", variants: ["27.5T", "29T"], years: shortYears },
        { model: "Kids Rowdy", variants: ["16T", "20T"], years: shortYears },
      ],
    },
  },
  {
    make: "Btwin",
    categories: ["Bicycles & Kids"],
    models: {
      "Bicycles & Kids": [
        { model: "Riverside 120", variants: ["S", "M", "L"], years: shortYears },
        { model: "Rockrider ST100", variants: ["27.5T"], years: shortYears },
        { model: "Kids 500", variants: ["14T", "16T", "20T"], years: shortYears },
      ],
    },
  },
];

/** Merges the base and extended catalogues, de-duplicating makes and models. */
function mergeCatalogue(sources: CatalogueMake[][]): CatalogueMake[] {
  const byMake = new Map<string, CatalogueMake>();

  for (const source of sources) {
    for (const entry of source) {
      const existing = byMake.get(entry.make);
      if (!existing) {
        byMake.set(entry.make, {
          make: entry.make,
          categories: [...entry.categories],
          models: Object.fromEntries(
            Object.entries(entry.models).map(([key, list]) => [key, list ? [...list] : []]),
          ) as CatalogueMake["models"],
        });
        continue;
      }

      for (const category of entry.categories) {
        if (!existing.categories.includes(category)) existing.categories.push(category);
      }

      for (const [key, list] of Object.entries(entry.models)) {
        const category = key as Category;
        const target = existing.models[category] ?? [];
        for (const model of list ?? []) {
          if (!target.some((item) => item.model === model.model)) target.push(model);
        }
        existing.models[category] = target;
      }
    }
  }

  return Array.from(byMake.values()).sort((a, b) => a.make.localeCompare(b.make));
}

export const catalogue: CatalogueMake[] = mergeCatalogue([catalogueBase, catalogueExtra]);

export function makesForCategory(category: Category) {
  return catalogue.filter((entry) => entry.categories.includes(category)).map((entry) => entry.make);
}

export function allMakes() {
  return catalogue.map((entry) => entry.make);
}

export function catalogueStats() {
  let models = 0;
  let variants = 0;
  for (const make of catalogue) {
    for (const list of Object.values(make.models)) {
      for (const model of list ?? []) {
        models += 1;
        variants += model.variants.length;
      }
    }
  }
  return { makes: catalogue.length, models, variants };
}

export function modelsFor(category: Category, make: string) {
  return catalogue.find((entry) => entry.make === make)?.models[category] ?? [];
}

export function displacementFor(category: Category, make: string, model: string) {
  return modelsFor(category, make).find((entry) => entry.model === model)?.displacement;
}

export function variantsFor(category: Category, make: string, model: string) {
  return modelsFor(category, make).find((entry) => entry.model === model)?.variants ?? [];
}

export function yearsFor(category: Category, make: string, model: string) {
  return modelsFor(category, make).find((entry) => entry.model === model)?.years ?? [];
}

export const fuelOptionsByCategory: Record<Category, FuelType[]> = {
  Cars: ["Petrol", "Diesel", "CNG", "Hybrid", "Electric"],
  Bikes: ["Petrol", "Electric"],
  Scooters: ["Petrol", "Electric"],
  Commercial: ["Diesel", "CNG", "Petrol", "Electric"],
  "Bicycles & Kids": ["Pedal", "Electric"],
};

export const transmissionOptionsByCategory: Record<Category, Transmission[]> = {
  Cars: ["Manual", "Automatic", "AMT", "CVT"],
  Bikes: ["Manual", "Automatic"],
  Scooters: ["Automatic"],
  Commercial: ["Manual", "Automatic", "AMT"],
  "Bicycles & Kids": ["Single speed", "Manual"],
};

export const conditionGrades: ConditionGrade[] = ["Excellent", "Good", "Fair", "Needs work"];

export const ownershipOptions: OwnershipCount[] = ["1st Owner", "2nd Owner", "3rd Owner", "4th Owner or more"];

export const popularCities = [
  "Imphal",
  "Guwahati",
  "Kolkata",
  "Delhi NCR",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Ahmedabad",
];
