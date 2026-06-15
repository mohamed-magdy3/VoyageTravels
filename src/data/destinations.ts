import { Destination } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'kyoto',
    name: 'Kyoto Sanctuary',
    country: 'Japan',
    tagline: 'Step back in time amidst cherry blossoms & bamboo forests',
    rating: 4.92,
    reviewsCount: 384,
    description: 'Kyoto, once the capital of Japan, is a city on the island of Honshu. It is famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses. It’s also known for formal traditions such as kaiseki dining, consisting of multiple courses of precise dishes, and geisha, female entertainers often found in the Gion district.',
    price: 1890,
    durationDays: 7,
    tags: ['Culture', 'Scenic', 'Culinary'],
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=800&auto=format&fit=crop'
    ],
    adventureLevel: 'Relaxing',
    climate: 'Temperate (15°C - 24°C)',
    highlights: [
      {
        icon: 'Compass',
        title: 'Arashiyama Bamboo Grove',
        description: 'Meander through paths carved within towering, vibrant green stalks of thick bamboo as they sway with the mountain breeze.'
      },
      {
        icon: 'Coffee',
        title: 'Tea Ceremony in Gion',
        description: 'Taste premium hand-whisked stoneground matcha paired with delicate seasonal wagashi pastries in an ancient Machiya townhouse.'
      },
      {
        icon: 'Sparkles',
        title: 'Fushimi Inari-taisha',
        description: 'Hike through thousands of vermilion Shinto Torii gates winding up the sacred Mount Inari forest peaks.'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Ancient Arrival & Higashiyama Stroll',
        activities: [
          'Arrival at Kyoto Station & premium private transfer to ryokan retreat',
          'Settle into your traditional, rush-scented tatami suite with beautiful garden views',
          'Evening guided walking tour through the preserved, lamp-lit flagstone roads of Sannezaka and Ninenzaka'
        ]
      },
      {
        day: 2,
        title: 'Golden Pavilion & Peaceful Rock Gardens',
        activities: [
          'Visit Kinkaku-ji, the jaw-dropping Zen temple entirely covered in shimmering gold leaf over a quiet pond',
          'Contemplate the abstract, raked dry-landscape stone circles at Ryoan-ji Temple',
          'Private culinary class specializing in delicate, Kyoto-style Obanzai vegetable courses'
        ]
      },
      {
        day: 3,
        title: 'Forest Meditation & Torii Gates',
        activities: [
          'Early-access sunrise walk through Fushimi Inari-taisha to bypass crowds',
          'Participate in a guided meditation session with a resident Zen monk overlooking a cascading koi pond',
          'Exquisite multi-course Kaiseki dinner representing the highest peaks of seasonal Japanese art'
        ]
      },
      {
        day: 4,
        title: 'Arashiyama Wilderness & River Cruise',
        activities: [
          'Wander the otherworldly Arashiyama Bamboo Grove at dawn',
          'Board a traditional hand-steered wooden flat-bottom boat down the emerald Hozu River canyon',
          'See friendly, free-roaming wild macaque monkeys at the mountain-summit sanctuary'
        ]
      },
      {
        day: 5,
        title: 'Historic Nara Excursion',
        activities: [
          'Day-trip to Japan’s first capital, Nara, via private express train',
          'Offer ceremonial rice shika-senbei crackers to hundreds of bowing, sacred free-roaming deer',
          'Stand in awe of Todai-ji Temple housing one of Japan’s tallest bronze Great Buddha icons'
        ]
      },
      {
        day: 6,
        title: 'Uji Teafields & Geisha District Gion',
        activities: [
          'Travel to Uji, the spiritual cradle of Japanese green tea production',
          'Guided walk through ancient tea-plant hills and meet standard-setting multigenerational farmers',
          'Farewell evening reception in private Gion estate with tea, music, and performance'
        ]
      },
      {
        day: 7,
        title: 'Sayonara Kyoto',
        activities: [
          'Morning mindfulness ritual in the Ryokan hot-spring onsen baths',
          'Curation of high-quality local ceramics, incense, or fans to take home',
          'Private departure transfer to Kansai International Airport (KIX)'
        ]
      }
    ]
  },
  {
    id: 'amalfi',
    name: 'Amalfi Coastal Splendor',
    country: 'Italy',
    tagline: 'Sun-drenched lemon groves and pastel cliffs overlooking the Tyrrhenian Sea',
    rating: 4.88,
    reviewsCount: 292,
    description: 'The Amalfi Coast is a stretch of coastline on the northern coast of the Salerno Gulf on the Tyrrhenian Sea, located in the Province of Salerno of southern Italy. The Amalfi Coast is a popular tourist destination for the region and Italy as a whole, attracting thousands of tourists annually. In 1997, the Amalfi Coast was listed as a UNESCO World Heritage Site.',
    price: 2450,
    durationDays: 8,
    tags: ['Scenic', 'Coastal', 'Romance'],
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=800&auto=format&fit=crop'
    ],
    adventureLevel: 'Relaxing',
    climate: 'Mediterranean (22°C - 30°C)',
    highlights: [
      {
        icon: 'Anchor',
        title: 'Private Yacht to Capri',
        description: 'Sail the azure waters of the gulf on a sleek Italian yacht, exploring hidden sea arches and bathing in the luminous Blue Grotto.'
      },
      {
        icon: 'ChefHat',
        title: 'Limoncello & Gnocchi Masterclass',
        description: 'Pluck giant Amalfi lemons straight from the branches during a hands-on organic farm cookout over Positano Cliffside views.'
      },
      {
        icon: 'MapPin',
        title: 'Path of the Gods Hike',
        description: 'Trek the legendary high-elevation clifftop footpath linking together historic shepherd villages and breathtaking ocean panoramas.'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Naples Arrival & Sea-view Settle',
        activities: [
          'Met by private driver at Naples airport with premium Mercedes executive sprinter',
          'Spectacular coastal drive along Mount Vesuvius to your cliffside Positano hotel',
          'Welcome sunset dinner with fresh handmade Scialatielli pasta and local organic white wine'
        ]
      },
      {
        day: 2,
        title: 'Pictorial Positano Exploration',
        activities: [
          'Leisurely walking exploration of Positano’s candy-colored vertical alleys',
          'Relax under direct Mediterranean sun at a reserved front-row beach loungers estate at Spiaggia Grande',
          'Evening cocktail masterclass crafting classic Italian Spritz with artisan botanicals'
        ]
      },
      {
        day: 3,
        title: 'Sailing Capri & Deep Blue Grottos',
        activities: [
          'Board our private 45ft Italian wooden gozzo cruiser directly from the Positano harbor',
          'Circumnavigate Capri Island, exploring towering Faraglioni rock monoliths',
          'Dine at beachside Lo Scoglio, enjoying zucchini wood-fired spaghetti directly above water'
        ]
      },
      {
        day: 4,
        title: 'Path of the Gods Sky-High Hike',
        activities: [
          'Fuel up with warm, flakey Sfogliatella pastries and dynamic espresso',
          'Guided, moderate hike along "Sentiero degli Dei" overlooking Salerno bay',
          'Relaxing herbal massage at the hotel spa therapeutic thermal pool'
        ]
      },
      {
        day: 5,
        title: 'Limoncello Groves of Ravello',
        activities: [
          'Drive up the winding hills to Ravello, the floating musical town of the coast',
          'Explore Villa Cimbrone’s majestic gardens and look out from the legendary "Terrace of Infinity"',
          'Family-style organic cooking class making ravioli and drinking house-distilled Limoncello liqueur'
        ]
      },
      {
        day: 6,
        title: 'Historic Town of Amalfi & Emerald Grotto',
        activities: [
          'Visit the imposing 9th-century Duomo di San Andrea with spectacular moorish architecture',
          'Explore historic mills in the Paper Museum, pressing your own handmade paper fibers',
          'Exclusive sunset beach club dinner with live classical Italian acoustic guitar players'
        ]
      },
      {
        day: 7,
        title: 'Sartorial Tailoring & Pastel Panoramas',
        activities: [
          'Morning consultation with Positano’s premier custom-linen tailors for bespoke summer wear',
          'Spend the afternoon exploring Ravello’s quiet artisan leather and dynamic ceramic shops',
          'Intimate farewell white-glove dinner inside a 2-Michelin starred ocean-terrace restaurant'
        ]
      },
      {
        day: 8,
        title: 'La Dolce Vita Farewell',
        activities: [
          'Sunrise espresso on your private ocean-facing terrace',
          'Collection of customized local lemon perfumes and hand-painted pottery souvenirs',
          'Private luxury transfer returning to Naples International Airport (NAP)'
        ]
      }
    ]
  },
  {
    id: 'swiss-alps',
    name: 'Alpine Altitude Adventure',
    country: 'Switzerland',
    tagline: 'Snow-clad summits, private ski chalets & luxury cogwheel train journeys',
    rating: 4.95,
    reviewsCount: 420,
    description: 'Zermatt, in southern Switzerland’s German-speaking Valais canton, is a mountain resort renowned for skiing, climbing and hiking. The town, at an elevation of around 1,600m, lies below the iconic, pyramid-shaped Matterhorn peak. Its main street, Bahnhofstrasse is lined with boutique shops, hotels and restaurants, and also has a lively après-ski scene.',
    price: 2950,
    durationDays: 6,
    tags: ['Active', 'Nature', 'Luxury'],
    heroImage: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?q=80&w=800&auto=format&fit=crop'
    ],
    adventureLevel: 'Challenging',
    climate: 'Alpine ( -2°C - 12°C)',
    highlights: [
      {
        icon: 'Train',
        title: 'Glacier Express Excellence Class',
        description: 'Indulge in a premium 5-course wine-paired lunch on the legendary slow-moving panoramic train crossing 291 gorgeous bridges.'
      },
      {
        icon: 'Flame',
        title: 'Igloo Fondue & Stars',
        description: 'Trek into pine forests at twilight to dine on rich, bubbly mountain gruyère fondue inside a custom geometric snow dome.'
      },
      {
        icon: 'Cloud',
        title: 'Matterhorn Heli-Sensation',
        description: 'Board a twin-engine alpine helicopter to swoop past the near-vertical jagged white cliffs of the world’s most iconic peak.'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Zermatt Car-free Arrival',
        activities: [
          'Arrival into Tasch rail terminal and board the private horse-drawn carriage or electric sled taxi',
          'Settle in at your five-star luxury ski chalet with roaring log fireplaces and Matterhorn balcony views',
          'Dinner featuring slow-braised mountain venison and local Valais field mushrooms'
        ]
      },
      {
        day: 2,
        title: 'Gornergrat Railway Vista Peak',
        activities: [
          'Board the historic 1898 cogwheel train climbing up to the 3,089m high Gornergrat ridge',
          'Gaze at the massive Gorner glacier tongue and 29 peaks towering over four thousand meters high',
          'Evening ski-conditioning treatment and hot outdoor alpine jacuzzi soak'
        ]
      },
      {
        day: 3,
        title: 'Summit Glacier Paradise Skiing',
        activities: [
          'Private master ski-guide lessons at Europe’s highest ski resort, carving premium Swiss powder',
          'Gourmet lunch at the legendary Findlerhof mountain hut, pairing lamb with panoramic Matterhorn windows',
          'Apres-ski lounge gathering with rare single-malt whiskeys and live acoustic chimney music'
        ]
      },
      {
        day: 4,
        title: 'Glacier Cave Exploration & Heli-Swoop',
        activities: [
          'Descend fifteen meters deep into natural glacier ice tunnels containing hand-carved ice thrones',
          'Breathtaking 15-minute private helicopter scenic flight around the Matterhorn peak',
          'Cozy, candle-lit wooden chalet dinner serving dynamic Valaisian raclette cheese scraped live'
        ]
      },
      {
        day: 5,
        title: 'Schwarzee Hike & Chocolate Craft',
        activities: [
          'Moderate snowshoe or soft-alpine hike to the pristine, dark waters of Schwarzee lake',
          'Enjoy private workshop with a world-renowned Swiss Chocolatier crafting customized hand-tempered truffles',
          'Champagne reception and five-course tasting menu exploring alpine-contemporary gastronomy'
        ]
      },
      {
        day: 6,
        title: 'Fondue Farewell',
        activities: [
          'Final morning breathwork and panoramic cold-plunge overlooking the pine peaks',
          'Souvenir curation of Swiss army watches, handmade high-elevation honey, and custom chocolate',
          'Board the Glacier Express first-class cabin to Zurich or Geneva for your journey home'
        ]
      }
    ]
  },
  {
    id: 'serengeti',
    name: 'Serengeti Wildlife Kingdom',
    country: 'Tanzania',
    tagline: 'Witness the Great Migration in ultimate high-end tented safari luxury',
    rating: 4.98,
    reviewsCount: 156,
    description: 'The Serengeti National Park is a Tanzanian national park in the Serengeti ecosystem in the Mara and Simiyu regions. It is famous for its annual migration of over 1.5 million white-bearded wildebeest and 250,000 zebra and for its numerous Nile crocodile and honey badger.',
    price: 3200,
    durationDays: 7,
    tags: ['Active', 'Nature', 'Wildlife'],
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504431590-f097cbb14afb?q=80&w=800&auto=format&fit=crop'
    ],
    adventureLevel: 'Challenging',
    climate: 'Savannah (18°C - 28°C)',
    highlights: [
      {
        icon: 'Sun',
        title: 'Hot Air Balloon at Dawn',
        description: 'Drift silently over the endless acacia grasslands at sunrise, watching herds of thousands of racing wildebeests.'
      },
      {
        icon: 'Eye',
        title: 'Night Game Drives',
        description: 'Equipped with specialized night infrared lights, track stealthy prides of lions and shy leopards hunting on the African plain.'
      },
      {
        icon: 'Heart',
        title: 'Maasai Cultural Exchange',
        description: 'Spend an afternoon inside a traditional Maasai boma, learning their dynamic ancient songs, jumping dances, and beaded arts.'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arusha Arrival & Wilderness Flight',
        activities: [
          'Morning landing at Kilimanjaro (JRO) & board a private bush-plane directly to the Seronera landing strip',
          'Met by your private professional naturalist driver in an open-sided 4x4 safari cruiser',
          'Drive to your high-end safari camp featuring infinity pools looking out to wild watering holes'
        ]
      },
      {
        day: 2,
        title: 'Big Five Tracking & Savannah Sunsets',
        activities: [
          'Sunrise game drive looking for pride lions on kopjes, leopards in fever trees, and rhinos',
          'White-linen bush lunch cooked over burning coals under an expansive flat-topped umbrella acacia tree',
          'Sunset sundowner cocktails out on the savanna while watching giraffes cross the red gold horizon'
        ]
      },
      {
        day: 3,
        title: 'Epic Balloon Ascent & River Crossing',
        activities: [
          '4:30 AM coffee and pastry followed by boarding a serene hot air balloon over the Serengeti',
          'Toast your landing with chilled champagne and a gourmet bush breakfast',
          'Drive north to monitor the high-drama crocodile infested crossings of the Mara River'
        ]
      },
      {
        day: 4,
        title: 'Maasai Boma Exchange & Evening Stalk',
        activities: [
          'Cultural encounter with the elder warriors of the Maasai community, teaching tracking bow craftsmanship',
          'Explore local conservation outposts with anti-poaching rangers protecting black rhinos',
          'Specialized night safari tracking predatory civets, genets, and hunting wild dogs'
        ]
      },
      {
        day: 5,
        title: 'Ngorongoro Crater Eden Walk',
        activities: [
          'Drive down 600m deep into the legendary Ngorongoro Crater, a collapsed primeval volcanic caldera',
          'See over thirty thousand wild mammals concentrated within the crater bed in a self-enclosed Eden',
          'Dine at camp on elegant swahili-spiced grilled prawns and cold local banana wood beer'
        ]
      },
      {
        day: 6,
        title: 'Olduvai Gorge & Prehistoric Traces',
        activities: [
          'Visit the cradle of humanity at Olduvai Gorge, where fossils dating 2 million years old were found',
          'Afternoon wildlife photography masterclass capturing stunning close-ups of zebras and cheetahs',
          'Boma bonfire barbecue under the deep southern hemisphere Milky Way stars'
        ]
      },
      {
        day: 7,
        title: 'Asante Sana Serengeti',
        activities: [
          'Final short sunrise walking safari listening to the early songs of rare turacos and bee-eater birds',
          'Curio-buying session of hand-beaded cuffs and custom Tanzanian wood carvings',
          'Scenic bush flight back to Kilimanjaro airport (JRO) for your global departure'
        ]
      }
    ]
  },
  {
    id: 'santorini',
    name: 'Santorini Sunset Haven',
    country: 'Greece',
    tagline: 'Pristine whitewashed architecture hugging volcanic ocean cliffs',
    rating: 4.89,
    reviewsCount: 312,
    description: 'Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater active caldera. They overlook the sea, small islands to the west and beaches made of black, red and white lava pebbles.',
    price: 1990,
    durationDays: 5,
    tags: ['Scenic', 'Coastal', 'Romance'],
    heroImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop'
    ],
    adventureLevel: 'Relaxing',
    climate: 'Mediterranean (24°C - 32°C)',
    highlights: [
      {
        icon: 'Compass',
        title: 'Caldera Catamaran Luxury',
        description: 'Sail the expansive crescent volcanic caldera, bathing in volcanic natural red hot thermal springs before an on-deck seafood feast.'
      },
      {
        icon: 'Sparkles',
        title: 'Ancient Akrotiri Antiquities',
        description: 'Explore the masterfully preserved 16th-century BC Bronze-Age volcanic ash-buried city, the true origin of the Atlantis myth.'
      },
      {
        icon: 'Wine',
        title: 'Assyrtiko Soil Wine Tasting',
        description: 'Visit dry-basket vineyard domes holding oldest grape roots, enjoying mineral-heavy crisp whites in high sunset terraces.'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Caldera Cliffside Arrival',
        activities: [
          'Private business-class van pickup from Santorini Thira Airport (JTR)',
          'Check-in to your cave suite carved directly into the Oia cliffs, with private heated infinity plunge pools',
          'Sunset pool-deck cocktail reception overlooking the deep blue sea hundreds of meters below'
        ]
      },
      {
        day: 2,
        title: 'Oia Alleys & Volcanic Winery',
        activities: [
          'Sunrise stroll around empty Oia alleys, capturing the blue domes without any tourist crowds',
          'Private sommelier-led tour of a historic basket-vine vineyard, tasting distinct volcanically grown Assyrtiko wine',
          'Seafood dinner overlooking the ocean serving grilled octopus and golden local tomato fritters'
        ]
      },
      {
        day: 3,
        title: 'Sailing Caldera & Hot Springs',
        activities: [
          'Board our luxurious 48ft Lagoon catamaran from the red beach marina',
          'Swim in the warm geothermal waters of Nea Kameni active volcano vents',
          'Sizzle fresh lobster and prime souvlaki skewers cooked live on board as the sun slips below the horizon'
        ]
      },
      {
        day: 4,
        title: 'Skaros Rock Hike & Akrotiri Excavation',
        activities: [
          'Hike the rugged fortress path of Skaros Rock, the medieval military vantage point of Santorini',
          'Private archaeological access into Akrotiri prehistoric settlement with a certified university historian',
          'Intimate cliffside sunset dinner with bespoke multi-course Greek tasting menu and vintage wines'
        ]
      },
      {
        day: 5,
        title: 'Adieu Thira',
        activities: [
          'Morning yoga and breathwork sessions looking out north at the endless Aegean sea',
          'Shop delicate greek-gold jewelry and hand-pressed local olive oils in Fira town',
          'Private transfer back to Thira Airport or Athinios Ferry Port for your departure'
        ]
      }
    ]
  },
  {
    id: 'iceland',
    name: 'Glacial Fire & Aurora',
    country: 'Iceland',
    tagline: 'Magical thermal spas, active geysers & dancing polar light skies',
    rating: 4.96,
    reviewsCount: 224,
    description: 'Iceland, a Nordic island nation, is defined by its dramatic landscape with volcanoes, geysers, hot springs and lava fields. Massive glaciers are protected in Vatnajökull and Snæfellsjökull national parks. Most of the population lives in the capital, Reykjavik, which runs on geothermal power and is home to the National and Saga museums, tracing Iceland’s Viking history.',
    price: 2100,
    durationDays: 6,
    tags: ['Active', 'Nature', 'Scenic'],
    heroImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483168527879-c66136b56105?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=800&auto=format&fit=crop'
    ],
    adventureLevel: 'Moderate',
    climate: 'Subpolar ( -1°C - 8°C)',
    highlights: [
      {
        icon: 'Flame',
        title: 'Blue Lagoon Spa Retreat',
        description: 'Bathe in superheated geothermal silica mudpools in a private reserved luxury sanctuary with in-water master masseuses.'
      },
      {
        icon: 'Compass',
        title: 'Super-Jeep Glacier Crawl',
        description: 'Ride on massive 44-inch tires over icefields, rappelling deep into shimmering sapphire-blue Katla ice-caves.'
      },
      {
        icon: 'Sparkles',
        title: 'Private Aurora Chasing',
        description: 'Equipped with dynamic solar activity trackers and professional tripod equipment, chase deep green aurora curtains with local experts.'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Geothermal Welcome & Blue Lagoon',
        activities: [
          'Land at Keflavik (KEF) & luxury transfer in a modified 4x4 Luxury Defender',
          'Immerse in the mineral-rich milky waters of the Blue Lagoon Retreat Spa with custom clay and algae mask therapies',
          'Viking-inspired welcome tasting menu exploring ocean fish and cured icelandic lamb'
        ]
      },
      {
        day: 2,
        title: 'The Famous Golden Circle Loop',
        activities: [
          'Watch the Strokkur geyser explode superheated water thirty meters into the sub-arctic air',
          'Stand beside Gullfoss, the thundering golden dual-stage waterfall plunging into a deep rugged canyon',
          'Walk between Eurasian and North American tectonic plates at Thingvellir National Park'
        ]
      },
      {
        day: 3,
        title: 'Black Beach & Katla Ice Caves',
        activities: [
          'Wander Reynisdrangar black volcanic pebble beach, gazing at basalt pillar sea needles and powerful waves',
          'Board our specialized Icelandic super-jeep to scale the glacier tongue of Myrdalsjökull',
          'Descend deep into Katla active sub-glacial coal-black and blue ice-caves'
        ]
      },
      {
        day: 4,
        title: 'Diamond Beach & Jokulsarlon Glacier Lagoon',
        activities: [
          'Stroll Diamond Beach, where massive crystal icebergs wash onto pitch-black shores',
          'Zodiac boat cruise among towering ancient floating icebergs in Jokulsarlon lagoon',
          'Twilight northern lights safari with warm wool blankets, high-end campfires, and hot rum-cocoa drinks'
        ]
      },
      {
        day: 5,
        title: 'South Coast Waterfalls & Warm Spa',
        activities: [
          'Walk behind Seljalandsfoss waterfall mist and stand beside the massive 60m drop of Skogafoss',
          'Interactive thermal greenhouse tour, tasting fresh tomatoes grown purely under geothermal volcanic energy',
          'Warm dinner inside Reykjavik featuring premium modern Nordic food pairings'
        ]
      },
      {
        day: 6,
        title: 'Viking Farewell',
        activities: [
          'Explore Reykjavik’s avant-garde architecture, checking out the Hallgrimskirkja cathedral',
          'Souvenir hunting for luxurious icelandic wool lopapeysa sweaters and volcanic scrubs',
          'Private departure transfer back to Keflavik Airport (KEF)'
        ]
      }
    ]
  }
];
