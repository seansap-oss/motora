import type { CatalogueMake } from "./types";

const y = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];
const s = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018];

/**
 * Second tranche of the India catalogue. Kept in its own module so the primary
 * catalogue file stays reviewable; both are merged in catalogue.ts.
 */
export const catalogueExtra: CatalogueMake[] = [
  {
    make: "Maruti Suzuki",
    categories: ["Cars"],
    models: {
      Cars: [
        { model: "Alto K10", variants: ["STD", "LXi", "VXi", "VXi+"], years: y, displacement: 998 },
        { model: "Wagon R", variants: ["LXi", "VXi", "ZXi", "ZXi+"], years: y, displacement: 1197 },
        { model: "Celerio", variants: ["LXi", "VXi", "ZXi", "ZXi+"], years: y, displacement: 998 },
        { model: "Dzire", variants: ["LXi", "VXi", "ZXi", "ZXi+"], years: y, displacement: 1197 },
        { model: "Ciaz", variants: ["Sigma", "Delta", "Zeta", "Alpha"], years: y, displacement: 1462 },
        { model: "XL6", variants: ["Zeta", "Alpha", "Alpha+"], years: s, displacement: 1462 },
        { model: "Ignis", variants: ["Sigma", "Delta", "Zeta", "Alpha"], years: y, displacement: 1197 },
        { model: "S-Presso", variants: ["STD", "LXi", "VXi", "VXi+"], years: s, displacement: 998 },
        { model: "Jimny", variants: ["Zeta", "Alpha"], years: s, displacement: 1462 },
        { model: "Invicto", variants: ["Zeta+", "Alpha+"], years: s, displacement: 1987 },
        { model: "eVitara", variants: ["Delta", "Zeta", "Alpha"], years: [2026, 2025], displacement: 0 },
      ],
    },
  },
  {
    make: "Tata",
    categories: ["Cars", "Commercial"],
    models: {
      Cars: [
        { model: "Altroz", variants: ["XE", "XM+", "XT", "XZ+"], years: y, displacement: 1199 },
        { model: "Tigor", variants: ["XE", "XM", "XZ", "XZ+"], years: y, displacement: 1199 },
        { model: "Nexon EV", variants: ["Creative", "Fearless", "Empowered"], years: s, displacement: 0 },
        { model: "Tiago EV", variants: ["XE", "XT", "XZ+"], years: s, displacement: 0 },
        { model: "Punch EV", variants: ["Smart", "Adventure", "Empowered"], years: [2026, 2025, 2024], displacement: 0 },
        { model: "Curvv", variants: ["Smart", "Pure", "Creative", "Accomplished"], years: [2026, 2025, 2024], displacement: 1199 },
      ],
      Commercial: [
        { model: "Yodha Pickup", variants: ["1200", "1500", "2000"], years: y },
        { model: "Winger", variants: ["Staff", "Tourist", "School"], years: y },
        { model: "Signa 1918", variants: ["Standard", "Sleeper"], years: y },
        { model: "Magic Express", variants: ["Diesel", "CNG"], years: s },
      ],
    },
  },
  {
    make: "Mahindra",
    categories: ["Cars", "Commercial"],
    models: {
      Cars: [
        { model: "XUV300", variants: ["W2", "W4", "W6", "W8", "W8(O)"], years: y, displacement: 1197 },
        { model: "XUV400 EV", variants: ["EC", "EL"], years: s, displacement: 0 },
        { model: "Scorpio Classic", variants: ["S", "S11"], years: y, displacement: 2184 },
        { model: "Marazzo", variants: ["M2", "M4+", "M6+"], years: y, displacement: 1497 },
        { model: "XUV 3XO", variants: ["MX1", "MX3", "AX5", "AX7L"], years: [2026, 2025, 2024], displacement: 1197 },
        { model: "Thar Roxx", variants: ["MX1", "MX3", "AX5L", "AX7L"], years: [2026, 2025, 2024], displacement: 1997 },
        { model: "BE 6", variants: ["Pack One", "Pack Two", "Pack Three"], years: [2026, 2025], displacement: 0 },
        { model: "XEV 9e", variants: ["Pack One", "Pack Two", "Pack Three"], years: [2026, 2025], displacement: 0 },
      ],
      Commercial: [
        { model: "Jeeto", variants: ["Minivan", "Pickup", "CNG"], years: y },
        { model: "Furio 7", variants: ["Standard", "HD"], years: s },
        { model: "Alfa", variants: ["Passenger", "Cargo", "Comfy"], years: y },
      ],
    },
  },
  {
    make: "Hyundai",
    categories: ["Cars"],
    models: {
      Cars: [
        { model: "Grand i10 Nios", variants: ["Era", "Magna", "Sportz", "Asta"], years: y, displacement: 1197 },
        { model: "Aura", variants: ["E", "S", "SX", "SX(O)"], years: y, displacement: 1197 },
        { model: "Verna", variants: ["EX", "S", "SX", "SX(O)"], years: y, displacement: 1497 },
        { model: "Alcazar", variants: ["Prestige", "Platinum", "Signature"], years: s, displacement: 1482 },
        { model: "Tucson", variants: ["Platinum", "Signature"], years: y, displacement: 1997 },
        { model: "Ioniq 5", variants: ["Standard"], years: s, displacement: 0 },
        { model: "Creta Electric", variants: ["Executive", "Smart", "Premium"], years: [2026, 2025], displacement: 0 },
      ],
    },
  },
  {
    make: "Honda",
    categories: ["Cars", "Bikes", "Scooters"],
    models: {
      Cars: [{ model: "Jazz", variants: ["V", "VX", "ZX"], years: y, displacement: 1199 }],
      Bikes: [
        { model: "Unicorn", variants: ["Standard"], years: y, displacement: 162 },
        { model: "CB200X", variants: ["Standard"], years: s, displacement: 184 },
        { model: "CB300F", variants: ["DLX", "DLX Pro"], years: s, displacement: 293 },
        { model: "CB350RS", variants: ["Standard", "DLX Pro"], years: s, displacement: 348 },
        { model: "NX500", variants: ["Standard"], years: [2026, 2025, 2024], displacement: 471 },
        { model: "Livo", variants: ["Drum", "Disc"], years: y, displacement: 110 },
      ],
      Scooters: [
        { model: "Activa 125", variants: ["Drum", "Disc", "H-Smart"], years: y, displacement: 124 },
        { model: "Grazia 125", variants: ["Drum", "Disc"], years: y, displacement: 124 },
        { model: "Activa e", variants: ["Standard"], years: [2026, 2025], displacement: 0 },
      ],
    },
  },
  {
    make: "Toyota",
    categories: ["Cars"],
    models: {
      Cars: [
        { model: "Glanza", variants: ["E", "S", "G", "V"], years: y, displacement: 1197 },
        { model: "Rumion", variants: ["S", "G", "V"], years: s, displacement: 1462 },
        { model: "Camry", variants: ["Hybrid"], years: y, displacement: 2487 },
        { model: "Land Cruiser 300", variants: ["ZX", "GR-S"], years: s, displacement: 3346 },
        { model: "Taisor", variants: ["E", "S", "G", "V"], years: [2026, 2025, 2024], displacement: 1197 },
      ],
    },
  },
  {
    make: "Kia",
    categories: ["Cars"],
    models: {
      Cars: [
        { model: "EV6", variants: ["GT Line"], years: s, displacement: 0 },
        { model: "Syros", variants: ["HTK", "HTK+", "HTX", "HTX+"], years: [2026, 2025], displacement: 1197 },
        { model: "Carnival", variants: ["Limousine", "Limousine Plus"], years: y, displacement: 2151 },
      ],
    },
  },
  {
    make: "Royal Enfield",
    categories: ["Bikes"],
    models: {
      Bikes: [
        { model: "Interceptor 650", variants: ["Standard", "Custom", "Chrome"], years: y, displacement: 648 },
        { model: "Continental GT 650", variants: ["Standard", "Custom", "Chrome"], years: y, displacement: 648 },
        { model: "Scram 411", variants: ["Standard"], years: s, displacement: 411 },
        { model: "Super Meteor 650", variants: ["Astral", "Interstellar", "Celestial"], years: s, displacement: 648 },
        { model: "Shotgun 650", variants: ["Standard", "Custom"], years: [2026, 2025, 2024], displacement: 648 },
        { model: "Guerrilla 450", variants: ["Analogue", "Dash", "Flash"], years: [2026, 2025, 2024], displacement: 452 },
        { model: "Classic 650", variants: ["Standard"], years: [2026, 2025], displacement: 648 },
      ],
    },
  },
  {
    make: "Bajaj",
    categories: ["Bikes", "Commercial"],
    models: {
      Bikes: [
        { model: "Pulsar NS160", variants: ["Standard"], years: y, displacement: 164 },
        { model: "Pulsar N160", variants: ["Single ABS", "Dual ABS"], years: s, displacement: 164 },
        { model: "Pulsar N250", variants: ["Standard"], years: s, displacement: 249 },
        { model: "Pulsar RS200", variants: ["Standard"], years: y, displacement: 199 },
        { model: "Avenger Cruise 220", variants: ["Standard"], years: y, displacement: 220 },
        { model: "CT 110X", variants: ["Standard"], years: s, displacement: 115 },
        { model: "Freedom 125", variants: ["Drum", "Drum LED", "Disc LED"], years: [2026, 2025, 2024], displacement: 125 },
        { model: "Chetak", variants: ["3202", "3502", "3503"], years: s, displacement: 0 },
      ],
      Commercial: [{ model: "Maxima Z", variants: ["Cargo", "Passenger", "CNG"], years: s }],
    },
  },
  {
    make: "TVS",
    categories: ["Bikes", "Scooters"],
    models: {
      Bikes: [
        { model: "Apache RTR 200 4V", variants: ["Standard", "Race Edition"], years: y, displacement: 197 },
        { model: "Apache RR 310", variants: ["Standard", "BTO"], years: y, displacement: 312 },
        { model: "Ronin", variants: ["Base", "Mid", "Top"], years: s, displacement: 225 },
        { model: "Radeon", variants: ["Drum", "Disc"], years: y, displacement: 109 },
        { model: "Sport", variants: ["Drum", "Electric start"], years: y, displacement: 109 },
        { model: "Raider 125 iGO", variants: ["Standard"], years: [2026, 2025, 2024], displacement: 124 },
      ],
      Scooters: [
        { model: "Jupiter 125", variants: ["Drum", "Disc", "SmartXonnect"], years: s, displacement: 124 },
        { model: "Zest 110", variants: ["Standard"], years: y, displacement: 110 },
        { model: "Orbiter", variants: ["Standard"], years: [2026, 2025], displacement: 0 },
      ],
    },
  },
  {
    make: "Hero",
    categories: ["Bikes", "Scooters", "Bicycles & Kids"],
    models: {
      Bikes: [
        { model: "Passion Plus", variants: ["Drum", "Disc"], years: y, displacement: 97 },
        { model: "Glamour 125", variants: ["Drum", "Disc", "Xtec"], years: y, displacement: 124 },
        { model: "Xtreme 125R", variants: ["Drum", "Disc"], years: [2026, 2025, 2024], displacement: 124 },
        { model: "Xtreme 160R 4V", variants: ["Standard", "Pro"], years: s, displacement: 163 },
        { model: "Mavrick 440", variants: ["Base", "Mid", "Top"], years: [2026, 2025, 2024], displacement: 440 },
        { model: "Karizma XMR", variants: ["Standard"], years: s, displacement: 210 },
      ],
      Scooters: [
        { model: "Destini 125", variants: ["LX", "VX", "Xtec"], years: y, displacement: 124 },
        { model: "Pleasure Plus", variants: ["LX", "VX", "Xtec"], years: y, displacement: 110 },
        { model: "Vida V1", variants: ["Plus", "Pro"], years: s, displacement: 0 },
      ],
      "Bicycles & Kids": [
        { model: "Octane", variants: ["26T", "27.5T"], years: s },
        { model: "Kids Blast", variants: ["14T", "16T", "20T"], years: s },
      ],
    },
  },
  {
    make: "Yamaha",
    categories: ["Bikes", "Scooters"],
    models: {
      Bikes: [
        { model: "MT-15 V2", variants: ["Standard", "Deluxe"], years: y, displacement: 155 },
        { model: "R15 V4", variants: ["Standard", "M", "Race"], years: y, displacement: 155 },
        { model: "FZ-S Fi V4", variants: ["Standard", "Deluxe"], years: y, displacement: 149 },
        { model: "FZ-X", variants: ["Standard", "Hybrid"], years: s, displacement: 149 },
        { model: "R3", variants: ["Standard"], years: s, displacement: 321 },
        { model: "MT-03", variants: ["Standard"], years: s, displacement: 321 },
      ],
      Scooters: [
        { model: "Fascino 125", variants: ["Drum", "Disc", "Hybrid"], years: y, displacement: 125 },
        { model: "RayZR 125", variants: ["Drum", "Disc", "Street Rally"], years: y, displacement: 125 },
        { model: "Aerox 155", variants: ["Standard", "S"], years: s, displacement: 155 },
      ],
    },
  },
  {
    make: "Suzuki",
    categories: ["Bikes", "Scooters"],
    models: {
      Bikes: [
        { model: "Gixxer 155", variants: ["Standard"], years: y, displacement: 155 },
        { model: "Gixxer SF 250", variants: ["Standard"], years: y, displacement: 249 },
        { model: "V-Strom SX", variants: ["Standard"], years: s, displacement: 249 },
        { model: "Hayabusa", variants: ["Standard"], years: y, displacement: 1340 },
      ],
      Scooters: [
        { model: "Access 125", variants: ["Drum", "Disc", "Ride Connect"], years: y, displacement: 124 },
        { model: "Burgman Street 125", variants: ["Standard", "EX"], years: y, displacement: 124 },
        { model: "Avenis 125", variants: ["Standard", "Ride Connect"], years: s, displacement: 124 },
      ],
    },
  },
  {
    make: "KTM",
    categories: ["Bikes"],
    models: {
      Bikes: [
        { model: "Duke 200", variants: ["Standard"], years: y, displacement: 199 },
        { model: "Duke 250", variants: ["Standard"], years: y, displacement: 249 },
        { model: "Duke 390", variants: ["Standard"], years: y, displacement: 399 },
        { model: "RC 390", variants: ["Standard"], years: y, displacement: 373 },
        { model: "Adventure 390", variants: ["Standard", "X"], years: s, displacement: 373 },
        { model: "Duke 125", variants: ["Standard"], years: y, displacement: 124 },
      ],
    },
  },
  {
    make: "Jawa Yezdi",
    categories: ["Bikes"],
    models: {
      Bikes: [
        { model: "Jawa 42", variants: ["Standard", "Bobber"], years: s, displacement: 294 },
        { model: "Yezdi Roadster", variants: ["Standard"], years: s, displacement: 334 },
        { model: "Yezdi Adventure", variants: ["Standard"], years: s, displacement: 334 },
        { model: "Jawa 350", variants: ["Standard"], years: [2026, 2025, 2024], displacement: 334 },
      ],
    },
  },
  {
    make: "Ather",
    categories: ["Scooters"],
    models: {
      Scooters: [{ model: "Rizta Z", variants: ["2.9 kWh", "3.7 kWh"], years: [2026, 2025, 2024], displacement: 0 }],
    },
  },
  {
    make: "Ola Electric",
    categories: ["Scooters"],
    models: {
      Scooters: [
        { model: "S1 Pro Sport", variants: ["4 kWh", "5.2 kWh"], years: [2026, 2025], displacement: 0 },
        { model: "S1 Z", variants: ["Standard", "Plus"], years: [2026, 2025], displacement: 0 },
      ],
    },
  },
  {
    make: "TVS iQube",
    categories: ["Scooters"],
    models: {
      Scooters: [{ model: "iQube ST", variants: ["3.4 kWh", "5.1 kWh"], years: s, displacement: 0 }],
    },
  },
  {
    make: "Ampere",
    categories: ["Scooters"],
    models: {
      Scooters: [
        { model: "Magnus EX", variants: ["Standard"], years: s, displacement: 0 },
        { model: "Nexus", variants: ["ST", "EX"], years: [2026, 2025, 2024], displacement: 0 },
      ],
    },
  },
  {
    make: "Okinawa",
    categories: ["Scooters"],
    models: {
      Scooters: [
        { model: "Praise Pro", variants: ["Standard"], years: s, displacement: 0 },
        { model: "iPraise+", variants: ["Standard"], years: s, displacement: 0 },
      ],
    },
  },
  {
    make: "Vida",
    categories: ["Scooters"],
    models: {
      Scooters: [{ model: "VX2", variants: ["Go", "Plus"], years: [2026, 2025], displacement: 0 }],
    },
  },
  {
    make: "Volkswagen",
    categories: ["Cars"],
    models: {
      Cars: [
        { model: "Virtus", variants: ["Comfortline", "Highline", "Topline", "GT"], years: s, displacement: 1498 },
        { model: "Taigun", variants: ["Comfortline", "Highline", "Topline", "GT"], years: s, displacement: 1498 },
        { model: "Tiguan", variants: ["Elegance", "R-Line"], years: y, displacement: 1984 },
      ],
    },
  },
  {
    make: "Skoda",
    categories: ["Cars"],
    models: {
      Cars: [
        { model: "Slavia", variants: ["Active", "Ambition", "Style"], years: s, displacement: 1498 },
        { model: "Kushaq", variants: ["Active", "Ambition", "Style"], years: s, displacement: 1498 },
        { model: "Kylaq", variants: ["Classic", "Signature", "Prestige"], years: [2026, 2025], displacement: 999 },
        { model: "Superb", variants: ["Laurin & Klement"], years: y, displacement: 1984 },
      ],
    },
  },
  {
    make: "Renault",
    categories: ["Cars"],
    models: {
      Cars: [
        { model: "Kwid", variants: ["RXE", "RXL", "RXT", "Climber"], years: y, displacement: 999 },
        { model: "Triber", variants: ["RXE", "RXL", "RXT", "RXZ"], years: y, displacement: 999 },
        { model: "Kiger", variants: ["RXE", "RXL", "RXT", "RXZ"], years: s, displacement: 999 },
      ],
    },
  },
  {
    make: "Nissan",
    categories: ["Cars"],
    models: {
      Cars: [
        { model: "Magnite", variants: ["XE", "XL", "XV", "XV Premium"], years: s, displacement: 999 },
        { model: "X-Trail", variants: ["Standard"], years: [2026, 2025, 2024], displacement: 1498 },
      ],
    },
  },
  {
    make: "MG",
    categories: ["Cars"],
    models: {
      Cars: [
        { model: "ZS EV", variants: ["Excite", "Exclusive"], years: s, displacement: 0 },
        { model: "Gloster", variants: ["Super", "Smart", "Sharp", "Savvy"], years: y, displacement: 1996 },
        { model: "Windsor EV", variants: ["Excite", "Exclusive", "Essence"], years: [2026, 2025, 2024], displacement: 0 },
      ],
    },
  },
  {
    make: "Jeep",
    categories: ["Cars"],
    models: {
      Cars: [
        { model: "Compass", variants: ["Sport", "Longitude", "Limited", "Trailhawk"], years: y, displacement: 1956 },
        { model: "Meridian", variants: ["Limited", "Overland"], years: s, displacement: 1956 },
      ],
    },
  },
  {
    make: "Citroen",
    categories: ["Cars"],
    models: {
      Cars: [
        { model: "C3", variants: ["Live", "Feel", "Shine"], years: s, displacement: 1198 },
        { model: "C3 Aircross", variants: ["You", "Plus", "Max"], years: [2026, 2025, 2024], displacement: 1199 },
        { model: "eC3", variants: ["Live", "Feel", "Shine"], years: s, displacement: 0 },
      ],
    },
  },
  {
    make: "BMW",
    categories: ["Cars", "Bikes"],
    models: {
      Cars: [
        { model: "3 Series", variants: ["320i", "330i M Sport"], years: y, displacement: 1998 },
        { model: "X1", variants: ["sDrive18i", "sDrive18d"], years: y, displacement: 1995 },
        { model: "X5", variants: ["xDrive30d", "M Sport"], years: y, displacement: 2993 },
      ],
      Bikes: [
        { model: "G 310 R", variants: ["Standard"], years: y, displacement: 313 },
        { model: "G 310 GS", variants: ["Standard"], years: y, displacement: 313 },
      ],
    },
  },
  {
    make: "Mercedes-Benz",
    categories: ["Cars"],
    models: {
      Cars: [
        { model: "C-Class", variants: ["C 200", "C 300d"], years: y, displacement: 1999 },
        { model: "E-Class", variants: ["E 200", "E 350d"], years: y, displacement: 1999 },
        { model: "GLC", variants: ["300 4MATIC", "220d"], years: y, displacement: 1993 },
      ],
    },
  },
  {
    make: "Audi",
    categories: ["Cars"],
    models: {
      Cars: [
        { model: "A4", variants: ["Premium Plus", "Technology"], years: y, displacement: 1984 },
        { model: "Q3", variants: ["Premium Plus", "Technology"], years: y, displacement: 1984 },
        { model: "Q5", variants: ["Premium Plus", "Technology"], years: y, displacement: 1984 },
      ],
    },
  },
  {
    make: "Ashok Leyland",
    categories: ["Commercial"],
    models: {
      Commercial: [
        { model: "Partner", variants: ["4 Tyre", "6 Tyre"], years: y },
        { model: "Boss", variants: ["1115", "1215"], years: y },
        { model: "Sunshine School Bus", variants: ["Standard"], years: s },
        { model: "Switch IeV", variants: ["3", "4"], years: [2026, 2025, 2024] },
      ],
    },
  },
  {
    make: "Eicher",
    categories: ["Commercial"],
    models: {
      Commercial: [
        { model: "Pro 2110", variants: ["Standard", "CNG"], years: y },
        { model: "Pro 6019", variants: ["Standard"], years: s },
        { model: "Skyline Pro", variants: ["School", "Staff"], years: s },
      ],
    },
  },
  {
    make: "Force Motors",
    categories: ["Commercial"],
    models: {
      Commercial: [
        { model: "Traveller 3350", variants: ["Staff", "School", "Tourist"], years: y },
        { model: "Urbania", variants: ["10 Seater", "13 Seater", "17 Seater"], years: [2026, 2025, 2024] },
        { model: "Trax Cruiser", variants: ["Standard"], years: y },
      ],
    },
  },
  {
    make: "Piaggio",
    categories: ["Commercial", "Scooters"],
    models: {
      Commercial: [
        { model: "Ape Xtra LDX", variants: ["Diesel", "CNG", "Petrol"], years: y },
        { model: "Ape E-City", variants: ["FX Max", "Standard"], years: s },
        { model: "Ape Auto DX", variants: ["CNG", "LPG"], years: y },
      ],
      Scooters: [
        { model: "Vespa VXL 150", variants: ["Standard"], years: y, displacement: 149 },
        { model: "Aprilia SXR 160", variants: ["Standard"], years: s, displacement: 160 },
      ],
    },
  },
  {
    make: "Montra Electric",
    categories: ["Commercial"],
    models: {
      Commercial: [{ model: "Super Auto", variants: ["Cargo", "Passenger"], years: [2026, 2025, 2024] }],
    },
  },
  {
    make: "Sonalika",
    categories: ["Commercial"],
    models: {
      Commercial: [
        { model: "DI 745 III", variants: ["Standard"], years: y },
        { model: "Tiger DI 55", variants: ["Standard", "4WD"], years: s },
      ],
    },
  },
  {
    make: "Swaraj",
    categories: ["Commercial"],
    models: {
      Commercial: [
        { model: "744 FE", variants: ["Standard"], years: y },
        { model: "963 FE", variants: ["Standard"], years: s },
      ],
    },
  },
  {
    make: "John Deere",
    categories: ["Commercial"],
    models: {
      Commercial: [
        { model: "5050 D", variants: ["Standard"], years: y },
        { model: "5310", variants: ["Standard", "4WD"], years: s },
      ],
    },
  },
  {
    make: "Hercules",
    categories: ["Bicycles & Kids"],
    models: {
      "Bicycles & Kids": [
        { model: "Roadeo A75", variants: ["26T", "27.5T"], years: s },
        { model: "Streetcat", variants: ["24T", "26T"], years: s },
        { model: "Kids Musketeers", variants: ["14T", "16T", "20T"], years: s },
      ],
    },
  },
  {
    make: "Avon Cycles",
    categories: ["Bicycles & Kids"],
    models: {
      "Bicycles & Kids": [
        { model: "Ridge", variants: ["26T", "27.5T"], years: s },
        { model: "E-Plus", variants: ["Standard"], years: s },
      ],
    },
  },
  {
    make: "Atlas",
    categories: ["Bicycles & Kids"],
    models: {
      "Bicycles & Kids": [
        { model: "Goldline", variants: ["26T", "28T"], years: s },
        { model: "Kids Rebel", variants: ["16T", "20T"], years: s },
      ],
    },
  },
  {
    make: "Ninety One",
    categories: ["Bicycles & Kids"],
    models: {
      "Bicycles & Kids": [
        { model: "Meraki", variants: ["27.5T", "29T"], years: s },
        { model: "Sturdy", variants: ["26T"], years: s },
      ],
    },
  },
  {
    make: "EMotorad",
    categories: ["Bicycles & Kids"],
    models: {
      "Bicycles & Kids": [
        { model: "T-Rex+", variants: ["27.5T", "29T"], years: s },
        { model: "Doodle V3", variants: ["Standard"], years: [2026, 2025, 2024] },
        { model: "X1", variants: ["27.5T"], years: s },
      ],
    },
  },
  {
    make: "Motovolt",
    categories: ["Bicycles & Kids"],
    models: {
      "Bicycles & Kids": [
        { model: "Hum", variants: ["Standard", "Lite"], years: s },
        { model: "Urbn", variants: ["M7", "Kit"], years: [2026, 2025, 2024] },
      ],
    },
  },
  {
    make: "Lectro",
    categories: ["Bicycles & Kids"],
    models: {
      "Bicycles & Kids": [
        { model: "Kaptan", variants: ["27.5T"], years: s },
        { model: "Townmaster", variants: ["Standard"], years: s },
      ],
    },
  },
];
