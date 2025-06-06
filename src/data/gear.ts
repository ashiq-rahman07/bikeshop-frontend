
 export interface IGear {
  id: string;
  name: string;
  brand: string;
  category: string;
  model: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  stock: number;
  images: string[];
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
}

// Dedicated gear data for the riding gear section
export const gearProducts: IGear[] = [
  {
    id: "g1",
    name: "Pro Carbon Helmet",
    brand: "SafeRide",
    category: "Helmet",
    model: "Carbon Elite",
    price: 599.99,
    originalPrice: 699.99,
    description: "Premium carbon fiber helmet with advanced ventilation system and integrated Bluetooth communication. This lightweight helmet offers superior protection while maintaining excellent comfort during long rides.",
    features: [
      "Carbon fiber construction",
      "Advanced ventilation with 12 air vents",
      "Integrated Bluetooth communication system",
      "Pinlock-ready visor",
      "Emergency quick-release system",
      "DOT, ECE, and SNELL certified",
      "Washable, antimicrobial liner"
    ],
    specifications: {
      "Material": "Carbon Fiber",
      "Weight": "1,200g",
      "Certification": "DOT, ECE 22.05, SNELL M2020",
      "Sizes Available": "XS, S, M, L, XL, XXL",
      "Visor": "Anti-scratch, UV protected",
      "Battery Life": "10 hours (Bluetooth)",
      "Warranty": "5 years"
    },
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1552568283-2667b8e8d9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599833975787-5c143f373c30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600028068164-7be123aafb8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 42,
    isFeatured: true
  },
  {
    id: "g2",
    name: "Adventure Riding Jacket",
    brand: "RideReady",
    category: "Jacket",
    model: "All-Weather Pro",
    price: 449.99,
    description: "All-weather adventure jacket with removable thermal liner and CE-approved impact protection. Perfect for year-round riding with its waterproof outer shell and adjustable ventilation system.",
    features: [
      "3-layer construction with waterproof membrane",
      "CE level 2 armor in shoulders and elbows",
      "Removable thermal liner",
      "Adjustable ventilation system",
      "Reflective details for visibility",
      "Multiple pockets including waterproof compartments",
      "Adjustable fit system at waist and arms"
    ],
    specifications: {
      "Material": "600D Cordura® with HT coating",
      "Protection": "CE Level 2 (shoulders, elbows), pocket for back protector",
      "Waterproofing": "8,000mm water column",
      "Ventilation": "Direct vent system with waterproof zippers",
      "Thermal Liner": "120g insulation, removable",
      "Sizes Available": "S, M, L, XL, XXL, 3XL",
      "Warranty": "2 years"
    },
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1591534446793-0c4a1cb186a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609873814058-a8928924184a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.8,
    reviewCount: 36,
    isFeatured: true
  },
  {
    id: "g3",
    name: "Pro Grip Racing Gloves",
    brand: "RaceTech",
    category: "Gloves",
    model: "GP-Pro",
    price: 129.99,
    originalPrice: 159.99,
    description: "Premium racing gloves with superior grip and knuckle protection for maximum control and safety. Features kangaroo leather palm for exceptional feel and tactile response during high-performance riding.",
    features: [
      "Kangaroo leather palm for superior grip",
      "Carbon fiber knuckle protection",
      "Touchscreen compatible fingertips",
      "Pre-curved ergonomic design",
      "Kevlar® thread stitching",
      "TPU sliders on palm and fingers",
      "Hook and loop wrist closure system"
    ],
    specifications: {
      "Material": "Kangaroo leather palm, cowhide upper",
      "Protection": "Carbon fiber knuckles, TPU sliders",
      "Lining": "Kevlar® reinforced",
      "Sizes Available": "S, M, L, XL, XXL",
      "Certification": "CE Level 2 KP",
      "Features": "Touchscreen compatible",
      "Warranty": "1 year"
    },
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1603312568312-cfce4f6f8549?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593672715438-d88a1cf7a48f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588526897015-580304f32f89?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.7,
    reviewCount: 58,
    isFeatured: true
  },
  {
    id: "g4",
    name: "Touring Boots",
    brand: "RoadMaster",
    category: "Boots",
    model: "Explorer GTX",
    price: 279.99,
    description: "Waterproof touring boots designed for long-distance comfort and protection. Features GORE-TEX® membrane for breathable waterproofing and reinforced shin and ankle protection.",
    features: [
      "GORE-TEX® waterproof membrane",
      "Oil-resistant rubber sole",
      "Reinforced shin and ankle protection",
      "Anti-twist midsole",
      "Reflective heel insert",
      "Shock-absorbing heel",
      "Adjustable closure system"
    ],
    specifications: {
      "Material": "Full-grain leather, GORE-TEX® liner",
      "Sole": "Vibram® oil-resistant rubber",
      "Protection": "TPU ankle and shin guards, reinforced toe and heel",
      "Waterproofing": "GORE-TEX® Performance Comfort",
      "Sizes Available": "38-48 (EU)",
      "Height": "30cm",
      "Warranty": "2 years"
    },
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605681687744-859be7336ff5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.6,
    reviewCount: 24,
    isFeatured: false
  },
  {
    id: "g5",
    name: "Armored Riding Pants",
    brand: "RideReady",
    category: "Pants",
    model: "Defender Pro",
    price: 219.99,
    originalPrice: 249.99,
    description: "Reinforced riding pants with CE-approved armor and abrasion-resistant material. Designed for both on-road and light off-road use with adjustable fit and ventilation.",
    features: [
      "Cordura® reinforced impact zones",
      "CE approved armor at hips and knees",
      "Adjustable waist and calf closures",
      "Waterproof membrane",
      "Stretch panels for mobility",
      "Removable thermal liner",
      "Connection zipper for jacket attachment"
    ],
    specifications: {
      "Material": "Cordura® 600D, DuPont™ Kevlar® lining in impact zones",
      "Protection": "CE Level 2 knee armor, CE Level 1 hip armor",
      "Waterproofing": "5,000mm water column",
      "Thermal Liner": "100g removable",
      "Sizes Available": "30-44 waist, Short/Regular/Long length",
      "Visibility": "Reflective piping and details",
      "Warranty": "2 years"
    },
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1578948856697-db91d246b7b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.5,
    reviewCount: 31,
    isFeatured: false
  },
  {
    id: "g6",
    name: "Hydration Backpack",
    brand: "AdventureGear",
    category: "Accessory",
    model: "HydroFlow 2.0",
    price: 89.99,
    description: "Motorcycle-specific hydration backpack with 2L water capacity and reflective details. Aerodynamic design with stabilizing chest and waist straps for secure fit at high speeds.",
    features: [
      "2L hydration bladder included",
      "Aerodynamic design for riding",
      "Chest and waist stabilizing straps",
      "Helmet carry system",
      "Reflective details",
      "Tool organization pocket",
      "Weather-resistant main compartment"
    ],
    specifications: {
      "Material": "Ripstop nylon, 1000D Cordura® base",
      "Capacity": "10L storage + 2L hydration",
      "Hydration": "BPA-free 2L bladder with bite valve",
      "Dimensions": "45cm x 25cm x 15cm",
      "Weight": "650g (without water)",
      "Colors Available": "Black/Gray, Black/Red, Black/Hi-Viz",
      "Warranty": "Lifetime guarantee"
    },
    stock: 40,
    images: [
      "https://images.unsplash.com/photo-1576770133818-5f9864c4489d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542574271-7f3b92e6c821?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585916459088-944a2e7903c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.8,
    reviewCount: 47,
    isFeatured: true
  },
  {
    id: "g7",
    name: "All-Season Base Layer",
    brand: "ThermoTech",
    category: "Base Layer",
    model: "Climate Control Pro",
    price: 69.99,
    description: "Moisture-wicking base layer designed for all-season comfort under your riding gear. Helps regulate body temperature in both hot and cold conditions with antimicrobial properties.",
    features: [
      "4-way stretch fabric",
      "Moisture-wicking technology",
      "Antimicrobial treatment",
      "Seamless construction for comfort",
      "Thumbholes to prevent riding up",
      "Temperature regulating fibers",
      "Compression fit"
    ],
    specifications: {
      "Material": "65% Nylon, 25% Polyester, 10% Spandex",
      "Weight": "Medium weight (180g/m²)",
      "Fit": "Athletic compression",
      "Odor Control": "Silver ion antimicrobial technology",
      "Sizes Available": "XS, S, M, L, XL, XXL",
      "Care": "Machine washable, hang dry",
      "Made In": "Italy"
    },
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616046630351-9e4161f40d85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585148841523-7f87a1feafb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.7,
    reviewCount: 64,
    isFeatured: false
  },
  {
    id: "g8",
    name: "Wireless Helmet Communicator",
    brand: "RideTalk",
    category: "Electronics",
    model: "Pro Mesh",
    price: 349.99,
    originalPrice: 399.99,
    description: "Premium Bluetooth communicator with 1.6km range and HD audio quality. Features mesh networking technology for group rides and voice-activated controls for hands-free operation.",
    features: [
      "Mesh Intercom Technology (up to 6 riders)",
      "1.6km range in optimal conditions",
      "HD audio quality with noise cancellation",
      "Voice command activation",
      "Smartphone app integration",
      "FM radio",
      "15 hours talk time battery life"
    ],
    specifications: {
      "Bluetooth": "5.0",
      "Range": "Up to 1.6km (1 mile)",
      "Battery": "Lithium polymer, 15 hours talk time",
      "Charging": "USB-C, fast charge capable",
      "Audio": "40mm HD speakers, advanced noise cancellation",
      "Water Resistance": "IPX7 rated",
      "Warranty": "3 years"
    },
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1605663864774-784f476c7c30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590658268037-1a689f51406b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589739900266-afa87474daec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 38,
    isFeatured: true
  }
];

// Helper functions similar to product.ts
export const getGearById = (id: string): IGear | undefined => {
  return gearProducts.find(gear => gear.id === id);
};


export const getFeaturedGear = (): IGear[] => {
  return gearProducts.filter(gear => gear.isFeatured).slice(0, 6);
};

export const getAllGear = (): IGear[] => {
  return gearProducts;
};

export const getGearByCategory = (category: string): IGear[] => {
  return gearProducts.filter(gear => gear.category.toLowerCase() === category.toLowerCase());
};

export const getGearByBrand = (brand: string): IGear[] => {
  return gearProducts.filter(gear => gear.brand.toLowerCase() === brand.toLowerCase());
};

export const searchGear = (query: string): IGear[] => {
  const lowerCaseQuery = query.toLowerCase();
  return gearProducts.filter(
    gear =>
      gear.name.toLowerCase().includes(lowerCaseQuery) ||
      gear.brand.toLowerCase().includes(lowerCaseQuery) ||
      gear.category.toLowerCase().includes(lowerCaseQuery) ||
      gear.model.toLowerCase().includes(lowerCaseQuery)
  );
};

export const getAvailableGearCategories = (): string[] => {
  const categories = new Set<string>();
  gearProducts.forEach(gear => categories.add(gear.category));
  return Array.from(categories);
};

export const getAvailableGearBrands = (): string[] => {
  const brands = new Set<string>();
  gearProducts.forEach(gear => brands.add(gear.brand));
  return Array.from(brands);
};