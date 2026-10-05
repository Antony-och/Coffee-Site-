import { FactoryLocation, HeroSlide, ProcessStep } from '../types';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    badge: 'Since 2016 • Premium Kenyan Coffee & Tea',
    title: 'PREMIUM KENYAN COFFEE & TEA',
    subtitle: 'First Cup Coffee & Tea',
    description: 'Experience the rich, bold flavors of Kenya’s finest Arabica beans and the delicate, refreshing taste of our premium teas, grown in the fertile highlands.',
    image: '/src/assets/images/hero_kenyan_highlands_1786601767796.jpg',
    primaryCtaText: 'SHOP COFFEE',
    primaryCtaAction: 'coffee',
    secondaryCtaText: 'EXPLORE TEAS',
    secondaryCtaAction: 'tea',
  },
  {
    id: 'slide-2',
    badge: 'Exceptional Quality & Heritage',
    title: 'Kenyan Premium Coffee',
    subtitle: 'Central Highlands',
    description: 'Sourced exclusively from high-altitude farms in the Central Highlands, our beans are hand-picked at peak ripeness and processed using traditional wet methods that enhance their natural brightness and complexity.',
    image: '/src/assets/images/kenyan_coffee_beans_1786601780276.jpg',
    primaryCtaText: 'DISCOVER COFFEE',
    primaryCtaAction: 'coffee',
    secondaryCtaText: 'ABOUT US',
    secondaryCtaAction: 'about',
  },
  {
    id: 'slide-3',
    badge: 'Kenya’s Tea Heritage',
    title: 'Kenyan Premium Tea',
    subtitle: 'Rift Valley & High Elevation Estates',
    description: 'We offer a range of premium teas including traditional black tea, delicate green tea, and refreshing herbal infusions, all sustainably sourced from Kenya’s rich tea-growing communities.',
    image: '/src/assets/images/kenyan_purple_tea_1786601792478.jpg',
    primaryCtaText: 'EXPLORE TEAS',
    primaryCtaAction: 'tea',
    secondaryCtaText: 'VISIT US',
    secondaryCtaAction: 'contact',
  }
];

export const COFFEE_PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: 'High-Altitude Selective Harvesting',
    subtitle: '1,800m - 2,200m Equatorial Slopes',
    category: 'coffee',
    description: 'Our smallholder partners hand-pick only 100% crimson red, fully ripe cherries at peak brix sweetness across Mount Kenya and Aberdare highlands.',
    detailedExecution: 'Selective hand-picking guarantees that green or under-ripe cherries never taint the lot. Cherries are transported to cooperative wet mills within 6 hours of picking to prevent unwanted pre-fermentation.',
    image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=1000&q=80',
    metrics: [
      { label: 'Cherry Brix Level', value: '21° - 24° Brix' },
      { label: 'Harvesting Altitude', value: '1,800m - 2,200m' },
      { label: 'Picking Standard', value: '100% Ripe Red Cherries' }
    ],
    keyTool: 'Hand Sorters & Floating Sorting Tanks',
  },
  {
    stepNumber: 2,
    title: 'Eco-Pulping & Double Spring Fermentation',
    subtitle: 'Glacial Mountain Water Channels',
    category: 'coffee',
    description: 'Cherries pass through disc pulpers to remove outer skin before undergoing Kenya’s iconic double fermentation in clean spring water tanks.',
    detailedExecution: 'The pulped parchment ferments dry for 24-36 hours, is washed with mountain water, and ferments under fresh water for an additional 12-24 hours. This traditional two-stage soak imparts Kenya’s signature sparkling acidity and winey blackcurrant notes.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1000&q=80',
    metrics: [
      { label: 'Fermentation Duration', value: '36 - 48 Hours' },
      { label: 'Water Origin', value: 'Mount Kenya Streams' },
      { label: 'pH Target', value: '4.2 - 4.5' }
    ],
    keyTool: 'Eco-Pulper & Washing Channels',
  },
  {
    stepNumber: 3,
    title: 'Sun Drying on Raised African Beds',
    subtitle: 'Gentle Equatorial Solar Drying',
    category: 'coffee',
    description: 'Washed parchment coffee is spread in thin layers over raised wire mesh tables, continuously raked under gentle sunlight for 8 to 14 days.',
    detailedExecution: 'Slow sun drying develops uniform seed density and stabilizes parchment moisture to the golden export standard of 10.5% - 11.5%. Parchment is covered during midday peak heat and night dew.',
    image: 'https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=1000&q=80',
    metrics: [
      { label: 'Drying Time', value: '8 - 14 Days' },
      { label: 'Target Moisture', value: '11.0% ± 0.5%' },
      { label: 'Air Circulation', value: '360° Under-Bed Flow' }
    ],
    keyTool: 'Raised Mesh Drying Tables',
  },
  {
    stepNumber: 4,
    title: 'Dry Milling, Density & Mechanical Screen Grading',
    subtitle: 'Strict Screen 17/18 AA Separation',
    category: 'coffee',
    description: 'Parchment is hulled at our central Nyeri dry mill, followed by density gravity tables and optical color sorters to isolate AA, AB, and Peaberry grades.',
    detailedExecution: 'Screen 17/18 retains large AA beans, while screen 15/16 retains AB grade. Density separators eliminate low-density seeds, ensuring even roast heat absorption in the roaster drum.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
    metrics: [
      { label: 'AA Screen Size', value: 'Screen 17 & 18 (7.2mm+)' },
      { label: 'PB Separation', value: 'Oval Single Seed Sorting' },
      { label: 'Defect Rate', value: '< 0.1% Optical Clean' }
    ],
    keyTool: 'Bühler Optical Color Sorters & Gravity Separators',
  },
  {
    stepNumber: 5,
    title: 'Artisan Drum Roasting & Cupping Calibration',
    subtitle: 'Nyeri Central Roastery',
    category: 'coffee',
    description: 'Custom drum roasting profiles calibrate time and temperature curves to accentuate bright phosphoric acidity and deep caramel body without scorching.',
    detailedExecution: 'Every batch is cupped by certified Q-Graders according to SCA (Specialty Coffee Association) protocols, evaluating fragrance, aroma, flavor, acidity, body, and balance.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80',
    metrics: [
      { label: 'Batch Size', value: '30kg - 60kg Custom Drums' },
      { label: 'SCA Score Threshold', value: '88+ Points Minimum' },
      { label: 'Roast Profiling', value: 'Convection-Driven Drum' }
    ],
    keyTool: 'Loring Smart Roaster & Cropster Software',
  },
  {
    stepNumber: 6,
    title: 'Nitrogen Flush Vacuum Packaging & GrainPro Export',
    subtitle: 'Source Freshness Locked',
    category: 'coffee',
    description: 'Whole beans and ground coffees are immediately packed into one-way degassing valve foil bags with nitrogen flushing to preserve delicate volatile aromatics.',
    detailedExecution: 'Wholesale green coffee lots are lined with GrainPro hermetic bags inside natural jute sacks, shielding beans against humidity and oxygen during sea/air transit.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1000&q=80',
    metrics: [
      { label: 'Residual Oxygen', value: '< 0.5% in Bag' },
      { label: 'Barrier Protection', value: 'Triple-Layer Foil & Valve' },
      { label: 'Export Packaging', value: 'GrainPro Hermetic Liners' }
    ],
    keyTool: 'Automated Nitrogen Flush Bagging Line',
  }
];

export const TEA_PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: 'Dawn Plucking: "Two Leaves & A Bud"',
    subtitle: 'Kericho & Limuru Mist Estates',
    category: 'tea',
    description: 'Pluckers select only the tenderest top bud and two adjacent young leaves before dawn dew evaporates under the morning equatorial sun.',
    detailedExecution: 'This strict standard guarantees maximum concentration of L-theanine amino acids, aromatic polyphenols, and essential oils. Leaves are carried in ventilated woven baskets to prevent heat buildup.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
    metrics: [
      { label: 'Plucking Standard', value: 'Fine 2 Leaves & A Bud' },
      { label: 'Harvest Time', value: '06:00 - 10:30 EAT' },
      { label: 'Leaf Moisture', value: '75% - 80% Initial' }
    ],
    keyTool: 'Traditional Bamboo Baskets & Field Leaf Scales',
  },
  {
    stepNumber: 2,
    title: 'Soft Ambient Withering',
    subtitle: 'Trough Moisture Reduction',
    category: 'tea',
    description: 'Fresh green leaves are spread across long perforated withering troughs where controlled ambient air currents reduce leaf moisture.',
    detailedExecution: 'Withering softens the rigid cell structure, making leaves pliable for rolling without shattering while initiating enzymatic chemical changes that generate floral floral esters.',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1000&q=80',
    metrics: [
      { label: 'Withering Duration', value: '12 - 18 Hours' },
      { label: 'Target Moisture', value: '60% - 65%' },
      { label: 'Trough Airflow', value: 'Temperature-Controlled' }
    ],
    keyTool: 'Axial-Fan Perforated Withering Troughs',
  },
  {
    stepNumber: 3,
    title: 'CTC Cutting vs. Orthodox Gentle Leaf Rolling',
    subtitle: 'Kericho Tea Factory Hub',
    category: 'tea',
    description: 'For CTC black teas, withered leaves pass through grooved stainless steel rollers (Cut, Tear, Curl). For Orthodox green & purple teas, leaves undergo gentle hand or machine rolling.',
    detailedExecution: 'CTC processing breaks down leaf cells rapidly into uniform granular pellets for quick, strong liquor extraction. Orthodox rolling twists whole leaves, preserving ethereal delicate notes.',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1000&q=80',
    metrics: [
      { label: 'CTC Granule Size', value: '0.5mm - 1.5mm' },
      { label: 'Orthodox Twist Ratio', value: '95%+ Whole Twist' },
      { label: 'Cell Disruption', value: 'Controlled Polyphenol Release' }
    ],
    keyTool: 'Rotovane & Stainless CTC Roller Sets',
  },
  {
    stepNumber: 4,
    title: 'Enzymatic Fermentation & Oxidation Control',
    subtitle: 'Humidified Oxidation Chambers',
    category: 'tea',
    description: 'Rolled leaf particles ferment under humid, cool air. Polyphenols combine with oxygen, transforming green leaf pigments into rich reddish copper theaflavins.',
    detailedExecution: 'For Black CTC, oxidation runs for 60 to 90 minutes until peak malt aroma and bright copper color emerge. For Green Tea, oxidation is 0% (steam-panned instantly). For Purple Tea, light partial oxidation preserves purple anthocyanins.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=80',
    metrics: [
      { label: 'Oxidation Room Humidity', value: '90% - 95% RH' },
      { label: 'Temperature Target', value: '22°C - 26°C' },
      { label: 'Theaflavin Peak', value: 'Maximum Liquor Brightness' }
    ],
    keyTool: 'Continuous Fermentation Floor Beds',
  },
  {
    stepNumber: 5,
    title: 'Fluidized Bed Hot-Air Firing & Drying',
    subtitle: 'Drying & Enzyme Deactivation',
    category: 'tea',
    description: 'Fermented tea is blown through a fluid-bed dryer with 110°C - 120°C hot air to halt oxidation instantly and drop final moisture to under 3.5%.',
    detailedExecution: 'Precise thermal control prevents roasting odors while sealing in deep coppery amber infusion characteristics and shelf stability for long international shipping.',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=1000&q=80',
    metrics: [
      { label: 'Inlet Air Temp', value: '110°C - 125°C' },
      { label: 'Final Tea Moisture', value: '3.0% - 3.5%' },
      { label: 'Drying Cycle', value: '18 - 22 Minutes' }
    ],
    keyTool: 'Fluidized Bed Chain Dryer',
  },
  {
    stepNumber: 6,
    title: 'Electrostatic Fiber Separation & Grade Sorting',
    subtitle: 'BP1, PF1, PD & Orthodox Leaves',
    category: 'tea',
    description: 'Fired tea passes over electro-static rollers to lift stalk fibers, followed by vibrating sifter screens that categorize tea into precise international export grades.',
    detailedExecution: 'Grades produced include BP1 (Broken Pekoe 1), PF1 (Pekoe Fannings 1 - ideal for tea bags), PD (Pekoe Dust), and whole leaf Orthodox Purple & Green grades before packing into 50kg aluminum foil bags.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
    metrics: [
      { label: 'Primary CTC Grades', value: 'BP1, PF1, PD, D1' },
      { label: 'Electrostatic Efficiency', value: '99.5% Fiber Removal' },
      { label: 'Bulk Bag Lining', value: 'Multi-ply Aluminum Barrier' }
    ],
    keyTool: 'Vibro-Sifter Screens & Electrostatic Fiber Extractors',
  }
];

export const FACTORY_LOCATIONS: FactoryLocation[] = [
  {
    id: 'nairobi-hq',
    name: 'Nairobi Export Terminal & Executive HQ',
    role: 'Logistics & Export HQ',
    region: 'Nairobi County, Kenya',
    address: 'JKIA Freight Terminal Zone, Off Airport North Road, Nairobi, Kenya',
    coords: { lat: -1.332, lng: 36.925 },
    phone: '+254 (0) 20 800 4500',
    email: 'export@kenyanhighlandcoffee.co.ke',
    hours: 'Mon - Fri: 08:00 - 17:00 EAT (East Africa Time)',
    description: 'Our central international dispatch center featuring temperature-controlled green coffee vaults, custom cupping labs, and air/sea freight logistics clearing.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80',
    highlights: ['SCA Certified Cupping Lab', 'Air Freight Express Vaults', 'Customs Clearing Hub', 'Private Tasting Room'],
  },
  {
    id: 'nyeri-plant',
    name: 'Mount Kenya Milling & Artisan Roastery',
    role: 'Milling & Roasting Plant',
    region: 'Nyeri Highlands, Central Kenya',
    address: 'Karatina-Nyeri Highway, Sector 4, Nyeri, Kenya',
    coords: { lat: -0.421, lng: 36.951 },
    phone: '+254 (0) 61 203 1200',
    email: 'roastery@kenyanhighlandcoffee.co.ke',
    hours: 'Mon - Sat: 06:00 - 18:00 EAT',
    description: 'Nestled at 1,920m elevation directly below Mount Kenya. Houses our dry mill, optical density sorters, and Loring drum roasters for single-origin lots.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Dry Hulling & Optical Sorting', '3x Drum Roasting Lines', 'African Sun Bed Testing Fields', 'Farmer Training Academy'],
  },
  {
    id: 'kericho-factory',
    name: 'Great Rift Tea Processing Hub',
    role: 'Tea Harvest & Processing Hub',
    region: 'Kericho Valley, Western Highlands',
    address: 'Tea Estate Rd 1, Kericho Highlands, Kenya',
    coords: { lat: -0.368, lng: 35.286 },
    phone: '+254 (0) 52 202 8800',
    email: 'teafactory@kenyanhighlandcoffee.co.ke',
    hours: 'Mon - Sat: 05:00 - 19:00 EAT',
    description: 'Surrounded by 1,200 hectares of high-altitude tea gardens. Processes our iconic TRFK 306/1 Purple Tea, Orthodox Green, and Safari Gold CTC Black Teas.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
    highlights: ['TRFK 306/1 Purple Tea Line', 'Orthodox Hand-Rolling Workshop', 'Continuous CTC Dryer', 'Rainforest Alliance Center'],
  }
];

export const TERROIR_STATS = [
  { value: '1,700m - 2,400m', label: 'Highland Elevation', desc: 'Extreme equatorial altitude slows cherry growth for intense sugars and crisp acidity.' },
  { value: '12,400+', label: 'Smallholder Farmers', desc: 'Direct trade partnerships with family cooperatives across Nyeri, Kirinyaga & Kericho.' },
  { value: '88.5+', label: 'Average Cupping Score', desc: 'Q-Grader verified specialty grade lots evaluated under SCA standards.' },
  { value: '100% Organic Soil', label: 'Volcanic Terroir', desc: 'Rich nitrogen-dense dark red clay soil fed by glacial streams from Mount Kenya.' },
];
