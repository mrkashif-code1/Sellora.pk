import { Ad, AdReport, AdStatus, CategoryInfo, CategoryType, Conversation, Favorite, Message, SearchFilterParams, User } from '../types';

export const PAKISTAN_CITIES = [
  'All Cities',
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Gujranwala',
  'Quetta',
  'Sialkot',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha'
];

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'Mobiles',
    name: 'Mobiles & Tablets',
    icon: 'Smartphone',
    count: 24,
    popular: true,
    description: 'Smartphones, Tablets, Smartwatches, and Mobile Accessories',
    subcategories: ['Smartphones', 'Tablets', 'Smart Watches', 'Accessories', 'Feature Phones']
  },
  {
    id: 'Electronics',
    name: 'Electronics & Home Appliances',
    icon: 'Laptop',
    count: 38,
    popular: true,
    description: 'Laptops, TVs, Audio, Gaming Consoles, ACs & Refrigerators',
    subcategories: ['Laptops & Computers', 'TV & Audio', 'Gaming & Consoles', 'Cameras', 'AC & Coolers', 'Kitchen Appliances']
  },
  {
    id: 'Vehicles',
    name: 'Vehicles & Motors',
    icon: 'Car',
    count: 42,
    popular: true,
    description: 'Cars, Motorcycles, Spare Parts, Commercial Vehicles',
    subcategories: ['Cars', 'Motorcycles', 'Spare Parts', 'Bicycles', 'Commercial Vehicles']
  },
  {
    id: 'Property',
    name: 'Property & Real Estate',
    icon: 'Home',
    count: 19,
    popular: true,
    description: 'Houses for Sale/Rent, Plots, Apartments, Commercial Buildings',
    subcategories: ['Houses for Sale', 'Houses for Rent', 'Apartments & Flats', 'Plots & Land', 'Commercial Space']
  },
  {
    id: 'Jobs',
    name: 'Jobs & Careers',
    icon: 'Briefcase',
    count: 15,
    popular: false,
    description: 'IT, Sales, Teaching, Marketing, Remote & Part-time Jobs',
    subcategories: ['IT & Software', 'Marketing & Sales', 'Customer Care', 'Education & Teaching', 'Accounting']
  },
  {
    id: 'Fashion',
    name: 'Fashion & Beauty',
    icon: 'Shirt',
    count: 29,
    popular: true,
    description: 'Men & Women Apparel, Watches, Shoes, Jewelry, Bags',
    subcategories: ['Men Fashion', 'Women Fashion', 'Watches', 'Footwear', 'Bags & Accessories']
  },
  {
    id: 'Home & Garden',
    name: 'Home & Living',
    icon: 'Armchair',
    count: 17,
    popular: false,
    description: 'Sofas, Beds, Dining, Home Decor, Lighting, Garden Tools',
    subcategories: ['Sofa & Dining', 'Beds & Wardrobes', 'Home Decor', 'Lighting', 'Garden Tools']
  },
  {
    id: 'Sports',
    name: 'Sports & Fitness',
    icon: 'Trophy',
    count: 12,
    popular: false,
    description: 'Cricket Kits, Gym Equipment, Cycling, Badminton, Fitness',
    subcategories: ['Cricket Gear', 'Gym & Fitness', 'Bicycles', 'Football & Tennis', 'Outdoor & Camping']
  },
  {
    id: 'Books',
    name: 'Books & Education',
    icon: 'BookOpen',
    count: 10,
    popular: false,
    description: 'Textbooks, Entry Test Guides, Novels, History, Stationery',
    subcategories: ['Textbooks & Academic', 'Novels & Literature', 'Entry Test Prep', 'Children Books', 'Magazines']
  },
  {
    id: 'Services',
    name: 'Services',
    icon: 'Wrench',
    count: 14,
    popular: false,
    description: 'Solar Installation, Home Repair, IT Services, Movers, Event Planners',
    subcategories: ['Home Repair & Electrician', 'Solar & Inverters', 'Web & App Development', 'Packers & Movers', 'Tutors']
  },
  {
    id: 'Other',
    name: 'Other & Miscellaneous',
    icon: 'Package',
    count: 8,
    popular: false,
    description: 'Collectibles, Musical Instruments, Hobbies, Industrial Items',
    subcategories: ['Musical Instruments', 'Collectibles & Antiques', 'Hobbies & Art', 'Other Goods']
  }
];

const INITIAL_USERS: User[] = [
  {
    id: 'user-hamza',
    name: 'Hamza Khan',
    email: 'hamza@example.com',
    phone: '+92 300 5551234',
    city: 'Lahore',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
    bio: 'Tech enthusiast and gadget collector. Active trader in DHA Phase 5, Lahore.',
    rating: 4.9,
    reviewsCount: 28,
    isVerified: true,
    role: 'user',
    createdAt: '2025-01-15'
  },
  {
    id: 'user-ayesha',
    name: 'Ayesha Malik',
    email: 'ayesha@sellora.pk',
    phone: '+92 321 9876543',
    city: 'Karachi',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    bio: 'Verified business dealer for premium electronics, mobile phones, and genuine luxury goods in Clifton, Karachi.',
    rating: 5.0,
    reviewsCount: 64,
    isVerified: true,
    role: 'user',
    createdAt: '2024-11-20'
  },
  {
    id: 'user-bilal',
    name: 'Bilal Ahmed',
    email: 'bilal@example.com',
    phone: '+92 333 4448899',
    city: 'Islamabad',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    bio: 'Automotive consultant and motor enthusiast based in F-10, Islamabad.',
    rating: 4.8,
    reviewsCount: 32,
    isVerified: true,
    role: 'user',
    createdAt: '2025-02-10'
  },
  {
    id: 'admin-1',
    name: 'Kashif Admin',
    email: 'admin@sellora.pk',
    phone: '+92 300 0000000',
    city: 'Islamabad',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80',
    bio: 'Lead Marketplace Administrator & Trust Officer at Sellora Pakistan.',
    rating: 5.0,
    reviewsCount: 150,
    isVerified: true,
    role: 'admin',
    createdAt: '2024-10-01'
  }
];

const INITIAL_ADS: Ad[] = [
  {
    id: 'ad-iphone15',
    title: 'iPhone 15 Pro Max 256GB - Natural Titanium (PTA Approved)',
    description: 'Box packed condition with 98% battery health. Genuine PTA approved with official physical receipt. Comes with original Apple 20W charger, box, braided cable, and 2 premium ESR cases. Zero scratches, protected with Spigen tempered glass since day 1.',
    price: 345000,
    isNegotiable: true,
    category: 'Mobiles',
    subcategory: 'Smartphones',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=1000&q=80'
    ],
    city: 'Karachi',
    locality: 'Clifton Block 4',
    sellerId: 'user-ayesha',
    sellerName: 'Ayesha Malik',
    sellerPhone: '+92 321 9876543',
    showPhone: true,
    whatsappEnabled: true,
    status: 'active',
    isFeatured: true,
    views: 482,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    specifications: {
      'Storage': '256 GB',
      'Color': 'Natural Titanium',
      'Battery Health': '98%',
      'PTA Status': 'Official PTA Approved',
      'Warranty': '3 Months International'
    }
  },
  {
    id: 'ad-civic',
    title: 'Honda Civic Oriel 1.5 Turbo 2022 - Sunroof Bumper to Bumper Genuine',
    description: 'Honda Civic Oriel 1.5 VTEC Turbo 2022 model, Urban Titanium metallic paint. First owner, Islamabad registered with original 2 keys and smart card. Driven only 28,000 KM strictly maintained by Honda authorized dealership. Immaculate condition, scratchless interior with leather seats, lane-watch camera, and brand new Michelin Primacy tires.',
    price: 6850000,
    isNegotiable: true,
    category: 'Vehicles',
    subcategory: 'Cars',
    condition: 'Excellent',
    images: [
      'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80'
    ],
    city: 'Islamabad',
    locality: 'Sector F-10/2',
    sellerId: 'user-bilal',
    sellerName: 'Bilal Ahmed',
    sellerPhone: '+92 333 4448899',
    showPhone: true,
    whatsappEnabled: true,
    status: 'active',
    isFeatured: true,
    views: 890,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    specifications: {
      'Make / Model': 'Honda Civic Oriel 1.5 Turbo',
      'Year': '2022',
      'Mileage': '28,500 KM',
      'Transmission': 'Automatic (CVT with paddle shifters)',
      'Registration': 'Islamabad (ICT)'
    }
  },
  {
    id: 'ad-house-dha',
    title: '1 Kanal Ultra-Modern Spanish Architecture Bungalow in DHA Phase 6',
    description: 'Newly constructed 1 Kanal luxury mansion featuring 5 master bedrooms with Italian fitted wardrobes and en-suite Grohe marble bathrooms. Solid teakwood double height main entrance, Turkish chandelier, state-of-the-art dirty kitchen + show kitchen equipped with built-in Bosch appliances. Rooftop terrace with BBQ deck and private servant quarters.',
    price: 64500000,
    isNegotiable: true,
    category: 'Property',
    subcategory: 'Houses for Sale',
    condition: 'Brand New',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80'
    ],
    city: 'Lahore',
    locality: 'DHA Phase 6, Sector L',
    sellerId: 'user-hamza',
    sellerName: 'Hamza Khan',
    sellerPhone: '+92 300 5551234',
    showPhone: true,
    whatsappEnabled: true,
    status: 'active',
    isFeatured: true,
    views: 1240,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    specifications: {
      'Size': '1 Kanal (4,500 sq ft)',
      'Bedrooms': '5 Master Beds',
      'Bathrooms': '6 Luxury Baths',
      'Floor': 'Double Storey + Basement',
      'Location': 'DHA Phase 6 Lahore'
    }
  },
  {
    id: 'ad-macbook-m3',
    title: 'Apple MacBook Pro 14" M3 Pro Chip (18GB Unified RAM, 512GB SSD)',
    description: 'Space Black finish. Liquid Retina XDR display with ProMotion 120Hz. Only 22 battery charge cycles, 100% battery health. Comes with original 70W MagSafe charger, braided color-matched cable, and original retail box. Never dropped or repaired.',
    price: 525000,
    isNegotiable: false,
    category: 'Electronics',
    subcategory: 'Laptops & Computers',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80'
    ],
    city: 'Karachi',
    locality: 'DHA Phase 5',
    sellerId: 'user-ayesha',
    sellerName: 'Ayesha Malik',
    sellerPhone: '+92 321 9876543',
    showPhone: true,
    whatsappEnabled: true,
    status: 'active',
    isFeatured: true,
    views: 340,
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    specifications: {
      'Processor': 'Apple M3 Pro (11-core CPU, 14-core GPU)',
      'RAM': '18 GB Unified Memory',
      'Storage': '512 GB High-Speed NVMe SSD',
      'Color': 'Space Black',
      'Cycle Count': '22 Cycles'
    }
  },
  {
    id: 'ad-ps5',
    title: 'Sony PlayStation 5 Slim 1TB Disc Edition + 2 DualSense Controllers',
    description: 'PlayStation 5 Slim Disc version with 1TB SSD. Comes with 2 original wireless DualSense controllers (White & Midnight Black), HDMI 2.1 cable, and 2 physical games (Spider-Man 2 and EA FC 24). Barely used for 2 months, complete box and warranty available.',
    price: 168000,
    isNegotiable: true,
    category: 'Electronics',
    subcategory: 'Gaming & Consoles',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80'
    ],
    city: 'Rawalpindi',
    locality: 'Bahria Town Phase 7',
    sellerId: 'user-bilal',
    sellerName: 'Bilal Ahmed',
    sellerPhone: '+92 333 4448899',
    showPhone: true,
    whatsappEnabled: true,
    status: 'active',
    isFeatured: false,
    views: 295,
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 30).toISOString(),
    specifications: {
      'Edition': 'PS5 Slim Disc Edition',
      'Storage': '1 TB SSD',
      'Accessories': '2 DualSense Wireless Controllers + 2 Games'
    }
  },
  {
    id: 'ad-alto',
    title: 'Suzuki Alto VXR 2023 1st Owner - Genuine Low Mileage',
    description: 'Suzuki Alto VXR 2023, Pearl White, 100% original bumper to bumper without any touchups. Chilled AC, power steering, central locking with remote, immobilizer key. Driven 14,200 KM on petrol only. Fuel average 21 km/L in city with AC.',
    price: 2680000,
    isNegotiable: true,
    category: 'Vehicles',
    subcategory: 'Cars',
    condition: 'Excellent',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80'
    ],
    city: 'Faisalabad',
    locality: 'Madina Town',
    sellerId: 'user-hamza',
    sellerName: 'Hamza Khan',
    sellerPhone: '+92 300 5551234',
    showPhone: true,
    whatsappEnabled: true,
    status: 'active',
    isFeatured: false,
    views: 512,
    createdAt: new Date(Date.now() - 3600000 * 42).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 42).toISOString(),
    specifications: {
      'Make / Model': 'Suzuki Alto VXR',
      'Year': '2023',
      'Mileage': '14,200 KM',
      'Engine': '660cc EFI',
      'Fuel': 'Petrol'
    }
  },
  {
    id: 'ad-s24ultra',
    title: 'Samsung Galaxy S24 Ultra 512GB Titanium Gray (Dual SIM PTA)',
    description: 'Flagship phone with Snapdragon 8 Gen 3 for Galaxy, titanium frame, built-in S-Pen, and Galaxy AI capabilities. Dual physical SIM + eSIM. Official PTA approved with tax slip. Screen and body are 10/10 scratch-free. Includes Samsung original 45W superfast adapter.',
    price: 365000,
    isNegotiable: true,
    category: 'Mobiles',
    subcategory: 'Smartphones',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80'
    ],
    city: 'Lahore',
    locality: 'Gulberg III',
    sellerId: 'user-hamza',
    sellerName: 'Hamza Khan',
    sellerPhone: '+92 300 5551234',
    showPhone: true,
    whatsappEnabled: true,
    status: 'active',
    isFeatured: true,
    views: 615,
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    specifications: {
      'RAM & Storage': '12GB / 512GB',
      'Color': 'Titanium Gray',
      'Camera': '200 MP Quad Camera System',
      'PTA Status': 'Official Approved'
    }
  },
  {
    id: 'ad-flat-karachi',
    title: '3-Bed Luxury Sea View Apartment in Clifton Block 2',
    description: 'Spacious 2,100 sq ft luxury flat on 9th floor with panoramic Arabian Sea breeze and view. 3 bedrooms with attached baths, drawing, dining, maid room with separate washroom. 2 dedicated covered parking slots, standby 24/7 generator, high-speed Otis elevators, and CCTV security.',
    price: 28500000,
    isNegotiable: true,
    category: 'Property',
    subcategory: 'Apartments & Flats',
    condition: 'Excellent',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80'
    ],
    city: 'Karachi',
    locality: 'Clifton Block 2',
    sellerId: 'user-ayesha',
    sellerName: 'Ayesha Malik',
    sellerPhone: '+92 321 9876543',
    showPhone: true,
    whatsappEnabled: true,
    status: 'active',
    isFeatured: false,
    views: 740,
    createdAt: new Date(Date.now() - 3600000 * 50).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 50).toISOString(),
    specifications: {
      'Area': '2,100 Sq Ft',
      'Bedrooms': '3 Bed + Maid Room',
      'Floor': '9th Floor (Sea Facing)',
      'Backup': '100% Generator Backup'
    }
  },
  {
    id: 'ad-sofa-set',
    title: 'Solid Chinioti Sheesham Wood 7-Seater Luxury Sofa Set with Center Table',
    description: 'Handcrafted authentic Chinioti solid rosewood (Sheesham) 7-seater sofa set (3+2+1+1) upholstered in imported Turkish velvet fabric with high-density MoltyFoam cushions (10-year warranty). Includes matching hand-carved coffee table with 8mm tempered glass top.',
    price: 135000,
    isNegotiable: true,
    category: 'Home & Garden',
    subcategory: 'Sofa & Dining',
    condition: 'Brand New',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80'
    ],
    city: 'Gujranwala',
    locality: 'Model Town',
    sellerId: 'user-hamza',
    sellerName: 'Hamza Khan',
    sellerPhone: '+92 300 5551234',
    showPhone: true,
    whatsappEnabled: true,
    status: 'active',
    isFeatured: false,
    views: 180,
    createdAt: new Date(Date.now() - 3600000 * 70).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 70).toISOString(),
    specifications: {
      'Wood': '100% Solid Pure Sheesham',
      'Seating': '7 Persons (3+2+1+1)',
      'Foam': 'Diamond / MoltyFoam Master Grade'
    }
  },
  {
    id: 'ad-ca-bat',
    title: 'CA Plus 15000 Player Edition Grade 1 English Willow Cricket Bat',
    description: 'Original CA Sports Plus 15000 certified bat. Selected Grade 1 English Willow with 9 straight, clean grains. Huge 40mm thick edges and duckbill profile for maximum balance and power hitting. Weight 2 lbs 8 oz. Already pre-knocked and ready for hardball matches.',
    price: 38000,
    isNegotiable: true,
    category: 'Sports',
    subcategory: 'Cricket Gear',
    condition: 'Brand New',
    images: [
      'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1000&q=80'
    ],
    city: 'Sialkot',
    locality: 'Small Industrial Estate',
    sellerId: 'user-bilal',
    sellerName: 'Bilal Ahmed',
    sellerPhone: '+92 333 4448899',
    showPhone: true,
    whatsappEnabled: true,
    status: 'active',
    isFeatured: false,
    views: 220,
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 36).toISOString(),
    specifications: {
      'Willow': 'Grade 1 English Willow',
      'Grains': '9 Straight Clean Grains',
      'Weight': '2 lbs 8.5 oz',
      'Edges': '40 mm'
    }
  },
  {
    id: 'ad-seiko-watch',
    title: 'Seiko 5 Sports Automatic Diver Watch - SRPD55K1 Black Dial',
    description: 'Authentic Seiko 5 Sports automatic mechanical wristwatch. Calibre 4R36 movement with manual winding and hacking seconds. 100M water resistance, Hardlex crystal, unidirectional rotating bezel, Lumibrite hands that glow brightly at night. With warranty card and box.',
    price: 52000,
    isNegotiable: false,
    category: 'Fashion',
    subcategory: 'Watches',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80'
    ],
    city: 'Islamabad',
    locality: 'Blue Area',
    sellerId: 'user-bilal',
    sellerName: 'Bilal Ahmed',
    sellerPhone: '+92 333 4448899',
    showPhone: true,
    whatsappEnabled: true,
    status: 'active',
    isFeatured: false,
    views: 410,
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    specifications: {
      'Movement': 'Automatic Seiko 4R36',
      'Dial': 'Sunburst Black',
      'Case Diameter': '42.5 mm',
      'Water Resistance': '100 Meters'
    }
  },
  {
    id: 'ad-job-react',
    title: 'Senior React / Node.js Full Stack Engineer (Remote - PKR 250K - 350K)',
    description: 'Growing tech firm in Islamabad hiring an experienced Senior Full-Stack Engineer with 3+ years experience in React, TypeScript, Node.js, and PostgreSQL/Firestore. Full-time remote within Pakistan with quarterly team retreats and medical allowance.',
    price: 300000,
    isNegotiable: true,
    category: 'Jobs',
    subcategory: 'IT & Software',
    condition: 'Brand New',
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80'
    ],
    city: 'Islamabad',
    locality: 'I-8 Markaz / Remote',
    sellerId: 'user-ayesha',
    sellerName: 'Ayesha Malik',
    sellerPhone: '+92 321 9876543',
    showPhone: true,
    whatsappEnabled: true,
    status: 'active',
    isFeatured: true,
    views: 1100,
    createdAt: new Date(Date.now() - 3600000 * 60).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 60).toISOString(),
    specifications: {
      'Job Type': 'Full Time / Remote',
      'Salary Range': 'Rs. 250,000 - 350,000 / month',
      'Experience': '3+ Years Required'
    }
  },
  {
    id: 'ad-solar-service',
    title: 'Net Metering & 10kW Tier-1 On-Grid Solar System Installation',
    description: 'Certified engineers offering complete turnkey solar solutions across Punjab and Sindh. High-efficiency Longi Hi-MO 6 bifacial solar panels paired with Huawei or Growatt smart hybrid inverters. Full net-metering green meter processing support with LESCO/KE/IESCO.',
    price: 950000,
    isNegotiable: true,
    category: 'Services',
    subcategory: 'Solar & Inverters',
    condition: 'Brand New',
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1000&q=80'
    ],
    city: 'Multan',
    locality: 'Bosan Road',
    sellerId: 'user-hamza',
    sellerName: 'Hamza Khan',
    sellerPhone: '+92 300 5551234',
    showPhone: true,
    whatsappEnabled: true,
    status: 'active',
    isFeatured: false,
    views: 310,
    createdAt: new Date(Date.now() - 3600000 * 85).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 85).toISOString(),
    specifications: {
      'Capacity': '10 kW Tier 1 Bifacial',
      'Panels': 'Longi Solar 585W',
      'Inverter': 'Growatt 10kW On-Grid',
      'Net Metering': 'Complete Liaison Service'
    }
  },
  {
    id: 'ad-mdcat-books',
    title: 'Complete MDCAT / NUMS Medical Entry Test Preparation Bundle (2025)',
    description: 'Full syllabus preparation books bundle including KIPS, STEP, and Star Academy question banks, past 15 years solved papers, and handwritten summary notes for Biology, Chemistry, Physics, and English. Condition is like new with no highlights or pen marks.',
    price: 9500,
    isNegotiable: false,
    category: 'Books',
    subcategory: 'Entry Test Prep',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80'
    ],
    city: 'Peshawar',
    locality: 'University Road',
    sellerId: 'user-ayesha',
    sellerName: 'Ayesha Malik',
    sellerPhone: '+92 321 9876543',
    showPhone: true,
    whatsappEnabled: true,
    status: 'active',
    isFeatured: false,
    views: 195,
    createdAt: new Date(Date.now() - 3600000 * 95).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 95).toISOString(),
    specifications: {
      'Exam': 'MDCAT / NUMS 2025',
      'Institutes': 'STEP & KIPS',
      'Subjects': 'Bio, Chem, Physics, Eng'
    }
  },
  {
    id: 'ad-pending-example',
    title: 'Yamaha YBR 125G 2024 Matt Dark Blue - Fresh Showroom Delivery',
    description: 'Yamaha YBR 125G latest 2024 model. Dark blue matte color, self-start, alloy rims, front disc brake. Brand new zero meter delivery with warranty book and registration file ready to transfer.',
    price: 485000,
    isNegotiable: true,
    category: 'Vehicles',
    subcategory: 'Motorcycles',
    condition: 'Brand New',
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80'
    ],
    city: 'Lahore',
    locality: 'Mcleod Road',
    sellerId: 'user-hamza',
    sellerName: 'Hamza Khan',
    sellerPhone: '+92 300 5551234',
    showPhone: true,
    whatsappEnabled: true,
    status: 'pending',
    isFeatured: false,
    views: 45,
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString()
  }
];

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    adId: 'ad-iphone15',
    adTitle: 'iPhone 15 Pro Max 256GB - Natural Titanium (PTA Approved)',
    adPrice: 345000,
    adImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=300&q=80',
    sellerId: 'user-ayesha',
    buyerId: 'user-hamza',
    lastMessage: 'AoA brother! Is this still available? Can you do Rs. 335,000 today?',
    lastMessageAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    unreadCountUser: 0,
    unreadCountOther: 1
  }
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'user-hamza',
    receiverId: 'user-ayesha',
    adId: 'ad-iphone15',
    text: 'AoA! Is this iPhone 15 Pro Max still available?',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    isRead: true
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    senderId: 'user-ayesha',
    receiverId: 'user-hamza',
    adId: 'ad-iphone15',
    text: 'W/Salam Hamza! Yes it is in 100% pristine condition with original box and invoice.',
    createdAt: new Date(Date.now() - 3600000 * 2.5).toISOString(),
    isRead: true
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    senderId: 'user-hamza',
    receiverId: 'user-ayesha',
    adId: 'ad-iphone15',
    text: 'AoA brother! Is this still available? Can you do Rs. 335,000 today?',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    isRead: false
  }
];

const INITIAL_REPORTS: AdReport[] = [
  {
    id: 'rep-1',
    adId: 'ad-alto',
    adTitle: 'Suzuki Alto VXR 2023 1st Owner',
    reporterId: 'user-ayesha',
    reporterName: 'Ayesha Malik',
    reason: 'Wrong Category',
    details: 'The seller listed standard Alto under sports cars mistakenly.',
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

// Helper to notify listeners
function triggerDbUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('sellora_db_changed'));
  }
}

// Storage helpers
function getStoredItem<T>(key: string, defaultVal: T): T {
  if (typeof window === 'undefined') return defaultVal;
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(item);
  } catch {
    return defaultVal;
  }
}

function setStoredItem<T>(key: string, val: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
    triggerDbUpdate();
  } catch (err) {
    console.error('Storage error:', err);
  }
}

// Service API
export const dbService = {
  // USERS
  getUsers(): User[] {
    return getStoredItem<User[]>('sellora_users', INITIAL_USERS);
  },

  getUserById(id: string): User | undefined {
    return this.getUsers().find(u => u.id === id);
  },

  getCurrentUser(): User | null {
    const activeId = getStoredItem<string | null>('sellora_active_user_id', 'user-hamza');
    if (!activeId) return null;
    return this.getUserById(activeId) || null;
  },

  setCurrentUser(user: User | null) {
    if (!user) {
      if (typeof window !== 'undefined') localStorage.removeItem('sellora_active_user_id');
    } else {
      setStoredItem('sellora_active_user_id', user.id);
    }
    triggerDbUpdate();
  },

  updateUser(id: string, updates: Partial<User>): User | null {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...updates };
    setStoredItem('sellora_users', users);
    return users[idx];
  },

  signupUser(name: string, email: string, phone: string, city: string): User {
    const users = this.getUsers();
    const newUser: User = {
      id: 'user-' + Date.now(),
      name,
      email,
      phone,
      city,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80`,
      bio: `Member from ${city}, Pakistan.`,
      rating: 5.0,
      reviewsCount: 0,
      isVerified: true,
      role: 'user',
      createdAt: new Date().toISOString().split('T')[0]
    };
    users.push(newUser);
    setStoredItem('sellora_users', users);
    this.setCurrentUser(newUser);
    return newUser;
  },

  loginUser(email: string): User | null {
    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      this.setCurrentUser(user);
      return user;
    }
    return null;
  },

  // ADS
  getAds(params?: SearchFilterParams): Ad[] {
    let ads = getStoredItem<Ad[]>('sellora_ads', INITIAL_ADS);
    if (!params) return ads;

    return ads.filter(ad => {
      // Keyword
      if (params.keyword && params.keyword.trim() !== '') {
        const q = params.keyword.toLowerCase();
        const matches = 
          ad.title.toLowerCase().includes(q) ||
          ad.description.toLowerCase().includes(q) ||
          ad.category.toLowerCase().includes(q) ||
          ad.city.toLowerCase().includes(q) ||
          (ad.locality && ad.locality.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Category
      if (params.category && params.category !== 'All') {
        if (ad.category !== params.category) return false;
      }

      // City
      if (params.city && params.city !== 'All Cities') {
        if (ad.city.toLowerCase() !== params.city.toLowerCase()) return false;
      }

      // Condition
      if (params.condition && params.condition !== 'All') {
        if (ad.condition !== params.condition) return false;
      }

      // Price Range
      if (params.minPrice !== undefined && params.minPrice > 0) {
        if (ad.price < params.minPrice) return false;
      }
      if (params.maxPrice !== undefined && params.maxPrice > 0) {
        if (ad.price > params.maxPrice) return false;
      }

      // Featured only
      if (params.featuredOnly && !ad.isFeatured) return false;

      return true;
    }).sort((a, b) => {
      if (params.sortBy === 'price_asc') return a.price - b.price;
      if (params.sortBy === 'price_desc') return b.price - a.price;
      if (params.sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (params.sortBy === 'popular') return b.views - a.views;
      // Default: newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  },

  getAdById(id: string): Ad | undefined {
    return this.getAds().find(a => a.id === id);
  },

  incrementAdViews(id: string) {
    const ads = this.getAds();
    const ad = ads.find(a => a.id === id);
    if (ad) {
      ad.views = (ad.views || 0) + 1;
      setStoredItem('sellora_ads', ads);
    }
  },

  createAd(adData: Omit<Ad, 'id' | 'views' | 'createdAt' | 'updatedAt' | 'status'> & { status?: AdStatus }): Ad {
    const ads = this.getAds();
    const newAd: Ad = {
      ...adData,
      id: 'ad-' + Date.now(),
      views: 1,
      status: adData.status || 'active', // default active or pending
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    ads.unshift(newAd);
    setStoredItem('sellora_ads', ads);
    return newAd;
  },

  updateAd(id: string, updates: Partial<Ad>): Ad | null {
    const ads = this.getAds();
    const idx = ads.findIndex(a => a.id === id);
    if (idx === -1) return null;
    ads[idx] = { ...ads[idx], ...updates, updatedAt: new Date().toISOString() };
    setStoredItem('sellora_ads', ads);
    return ads[idx];
  },

  deleteAd(id: string): boolean {
    let ads = this.getAds();
    const initialLen = ads.length;
    ads = ads.filter(a => a.id !== id);
    if (ads.length !== initialLen) {
      setStoredItem('sellora_ads', ads);
      return true;
    }
    return false;
  },

  // FAVORITES
  getFavorites(userId: string): Favorite[] {
    const allFavs = getStoredItem<Favorite[]>('sellora_favorites', [
      { id: 'fav-1', userId: 'user-hamza', adId: 'ad-civic', createdAt: new Date().toISOString() },
      { id: 'fav-2', userId: 'user-hamza', adId: 'ad-macbook-m3', createdAt: new Date().toISOString() }
    ]);
    return allFavs.filter(f => f.userId === userId);
  },

  isFavorite(userId: string, adId: string): boolean {
    return this.getFavorites(userId).some(f => f.adId === adId);
  },

  toggleFavorite(userId: string, adId: string): boolean {
    const allFavs = getStoredItem<Favorite[]>('sellora_favorites', [
      { id: 'fav-1', userId: 'user-hamza', adId: 'ad-civic', createdAt: new Date().toISOString() }
    ]);
    const existingIdx = allFavs.findIndex(f => f.userId === userId && f.adId === adId);
    let isFavNow = false;

    if (existingIdx !== -1) {
      allFavs.splice(existingIdx, 1);
      isFavNow = false;
    } else {
      allFavs.push({
        id: 'fav-' + Date.now(),
        userId,
        adId,
        createdAt: new Date().toISOString()
      });
      isFavNow = true;
    }
    setStoredItem('sellora_favorites', allFavs);
    return isFavNow;
  },

  // MESSAGES & CONVERSATIONS
  getConversations(userId: string): Conversation[] {
    const all = getStoredItem<Conversation[]>('sellora_conversations', INITIAL_CONVERSATIONS);
    return all.filter(c => c.sellerId === userId || c.buyerId === userId);
  },

  getMessages(conversationId: string): Message[] {
    const all = getStoredItem<Message[]>('sellora_messages', INITIAL_MESSAGES);
    return all.filter(m => m.conversationId === conversationId);
  },

  sendMessage(conversationId: string, senderId: string, receiverId: string, adId: string, text: string): Message {
    const msgs = getStoredItem<Message[]>('sellora_messages', INITIAL_MESSAGES);
    const newMsg: Message = {
      id: 'msg-' + Date.now(),
      conversationId,
      senderId,
      receiverId,
      adId,
      text,
      createdAt: new Date().toISOString(),
      isRead: false
    };
    msgs.push(newMsg);
    setStoredItem('sellora_messages', msgs);

    // Update conversation lastMessage
    const convs = getStoredItem<Conversation[]>('sellora_conversations', INITIAL_CONVERSATIONS);
    const conv = convs.find(c => c.id === conversationId);
    if (conv) {
      conv.lastMessage = text;
      conv.lastMessageAt = newMsg.createdAt;
      setStoredItem('sellora_conversations', convs);
    }

    return newMsg;
  },

  startOrGetConversation(buyerId: string, sellerId: string, ad: Ad): Conversation {
    const convs = getStoredItem<Conversation[]>('sellora_conversations', INITIAL_CONVERSATIONS);
    const existing = convs.find(c => c.adId === ad.id && ((c.buyerId === buyerId && c.sellerId === sellerId) || (c.buyerId === sellerId && c.sellerId === buyerId)));
    if (existing) return existing;

    const newConv: Conversation = {
      id: 'conv-' + Date.now(),
      adId: ad.id,
      adTitle: ad.title,
      adPrice: ad.price,
      adImage: ad.images[0] || '',
      sellerId,
      buyerId,
      lastMessage: 'Conversation started',
      lastMessageAt: new Date().toISOString(),
      unreadCountUser: 0,
      unreadCountOther: 0
    };
    convs.unshift(newConv);
    setStoredItem('sellora_conversations', convs);
    return newConv;
  },

  // REPORTS
  getReports(): AdReport[] {
    return getStoredItem<AdReport[]>('sellora_reports', INITIAL_REPORTS);
  },

  createReport(adId: string, adTitle: string, reporterId: string, reporterName: string, reason: AdReport['reason'], details: string): AdReport {
    const reports = this.getReports();
    const newReport: AdReport = {
      id: 'rep-' + Date.now(),
      adId,
      adTitle,
      reporterId,
      reporterName,
      reason,
      details,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    reports.unshift(newReport);
    setStoredItem('sellora_reports', reports);
    return newReport;
  },

  updateReportStatus(id: string, status: 'pending' | 'resolved' | 'dismissed'): boolean {
    const reports = this.getReports();
    const rep = reports.find(r => r.id === id);
    if (rep) {
      rep.status = status;
      setStoredItem('sellora_reports', reports);
      return true;
    }
    return false;
  },

  resolveReport(id: string, status: 'resolved' | 'dismissed'): boolean {
    return this.updateReportStatus(id, status);
  },

  getAllUsers(): User[] {
    return this.getUsers();
  },

  // ADMIN STATS
  getAdminStats() {
    const ads = this.getAds();
    const users = this.getUsers();
    const reports = this.getReports();

    const activeAds = ads.filter(a => a.status === 'active').length;
    const pendingAds = ads.filter(a => a.status === 'pending').length;
    const featuredAds = ads.filter(a => a.isFeatured).length;
    const totalViews = ads.reduce((acc, a) => acc + (a.views || 0), 0);

    const cityBreakdown: Record<string, number> = {};
    const categoryBreakdown: Record<string, number> = {};

    ads.forEach(a => {
      cityBreakdown[a.city] = (cityBreakdown[a.city] || 0) + 1;
      categoryBreakdown[a.category] = (categoryBreakdown[a.category] || 0) + 1;
    });

    return {
      totalAds: ads.length,
      activeAds,
      pendingAds,
      featuredAds,
      totalUsers: users.length,
      pendingReports: reports.filter(r => r.status === 'pending').length,
      totalViews,
      cityBreakdown,
      categoryBreakdown
    };
  }
};
