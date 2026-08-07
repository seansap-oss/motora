export type Category = "Cars" | "Bikes" | "Scooters" | "Commercial" | "Bicycles & Kids";

export type SellerType = "Dealer" | "Private seller" | "Collector";

export type FuelType = "Petrol" | "Diesel" | "CNG" | "Hybrid" | "Electric" | "Pedal";

export type Transmission = "Manual" | "Automatic" | "AMT" | "CVT" | "Single speed";

export type ConditionGrade = "Excellent" | "Good" | "Fair" | "Needs work";

export type OwnershipCount = "1st Owner" | "2nd Owner" | "3rd Owner" | "4th Owner or more";

export type Listing = {
  id: string;
  name: string;
  kind: Category;
  subcategory: string;
  make: string;
  model: string;
  variant: string;
  price: string;
  priceValue: number;
  year: string;
  fuel: string;
  fuelType: FuelType;
  km: string;
  location: string;
  ownership: OwnershipCount;
  image: string;
  sellerId: string;
  verified?: boolean;
};

export type SellerStats = {
  rating: number;
  reviews: number;
  listings: number;
  responseRate: number;
  memberSince: string;
};

export type Seller = {
  id: string;
  name: string;
  initials: string;
  type: SellerType;
  location: string;
  verified: boolean;
  tagline: string;
  phone: string;
  email: string;
  whatsapp: string;
  instagram?: string;
  handle: string;
  coverImage: string;
  stats: SellerStats;
  categories: Category[];
};

export type EvSpecs = {
  rangeKm: string;
  batteryKwh: string;
  chargeTimeHours: string;
  batteryHealth: string;
};

export type CycleSpecs = {
  frameSize: string;
  gears: string;
  brakeType: string;
  wheelSize: string;
};

export type MediaItem = {
  id: string;
  type: "photo" | "video" | "voice";
  name: string;
  size: number;
  previewUrl?: string;
};

export type ListingDraft = {
  category: Category | null;
  subcategory: string;
  make: string;
  model: string;
  variant: string;
  year: string;
  condition: ConditionGrade | null;
  odometer: string;
  fuelType: FuelType | null;
  transmission: Transmission | null;
  ev: EvSpecs;
  cycle: CycleSpecs;
  media: MediaItem[];
  voiceNoteSeconds: number;
  price: string;
  negotiable: boolean;
  location: string;
  pincode: string;
  ownership: OwnershipCount | null;
  registrationNumber: string;
  insuranceValidTill: string;
  hasAccidentHistory: boolean;
  description: string;
  sellerType: SellerType;
  contactConsent: boolean;
};

export type CatalogueModel = {
  model: string;
  variants: string[];
  years: number[];
};

export type CatalogueMake = {
  make: string;
  categories: Category[];
  models: Partial<Record<Category, CatalogueModel[]>>;
};
