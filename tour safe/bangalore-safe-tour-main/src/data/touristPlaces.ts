export interface TouristPlace {
  id: number;
  name: string;
  area: string;
  category: string;
  description: string;
  avgTime: string;
  image: string;
  lat: number;
  lng: number;
}

export const touristPlaces: TouristPlace[] = [
  {
    id: 1,
    name: "Lalbagh Botanical Garden",
    area: "Lalbagh",
    category: "Nature & Parks",
    description:
      "A stunning 240-acre garden with rare plants, the iconic Glass House, and a beautiful lake. Perfect for morning walks and photography.",
    avgTime: "2–3 hours",
    image:
      "https://s7ap1.scene7.com/is/image/incredibleindia/lalbagh-bangalore-karnataka-2-attr-hero?qlt=82&ts=1742201788130",
    lat: 12.9352,

    lng: 77.584,
  },
  {
    id: 2,
    name: "Bangalore Palace",
    area: "Vasanth Nagar",
    category: "Heritage",
    description:
      "A Tudor-style palace inspired by England's Windsor Castle, featuring stunning woodwork and royal artefacts.",
    avgTime: "1–2 hours",
    image:
      "https://www.bontravelindia.com/wp-content/uploads/2022/08/Bangalore-Palace-Karnataka.jpg",
    lat: 13.0024,
    lng: 77.5995,
  },
  {
    id: 3,
    name: "Cubbon Park",
    area: "Cubbon Park",
    category: "Nature & Parks",
    description:
      "A lush green oasis in the heart of the city spanning 300 acres with walking trails.",
    avgTime: "1–2 hours",
    image:
      "https://d2w184mfj9gts1.cloudfront.net/blog/1f6116df-6645-4f0f-b05d-5f4077a1ea66.jpg",
    lat: 12.9732,
    lng: 77.5909,
  },
  {
    id: 4,
    name: "Tipu Sultan's Summer Palace",
    area: "Chamrajpet",
    category: "Heritage",
    description:
      "An ornate 18th-century wooden palace built entirely with teak.",
    avgTime: "1 hour",
    image:
      "https://s7ap1.scene7.com/is/image/incredibleindia/tipu-sultans-summer-palace-bengaluru-karnataka-2-musthead-hero?qlt=82&ts=1742191834026",
    lat: 12.9596,
    lng: 77.5786,
  },
  {
    id: 5,
    name: "ISKCON Temple",
    area: "Rajajinagar",
    category: "Religious",
    description:
      "One of the largest ISKCON temples in the world with stunning architecture.",
    avgTime: "1–2 hours",
    image:
      "https://api.theindia.co.in/storage/image/places/banner_iskon-temple-bangalore-1_899.jpg",
    lat: 13.027,
    lng: 77.5639,
  },
  {
    id: 6,
    name: "Nandi Hills",
    area: "Chikkaballapur (60 km)",
    category: "Adventure",
    description:
      "A hilltop fortress offering breathtaking sunrise views and cycling trails.",
    avgTime: "4–5 hours",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    lat: 13.3654,
    lng: 77.5881,
  },
  {
    id: 7,
    name: "Vidhana Soudha",
    area: "Dr. Ambedkar Veedhi",
    category: "Heritage",
    description:
      "The seat of Karnataka's state legislature, an imposing Neo-Dravidian structure.",
    avgTime: "30 min (exterior)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Vidhana_Soudha%2C_front_%2801%29.jpg/1280px-Vidhana_Soudha%2C_front_%2801%29.jpg",
    lat: 12.9829,
    lng: 77.5903,
  },
  {
    id: 8,
    name: "Commercial Street",
    area: "Shivajinagar",
    category: "Shopping",
    description:
      "Bangalore's iconic shopping destination for fabrics and street food.",
    avgTime: "2–3 hours",
    image:
      "https://www.floortap.com/resources/wp-content/uploads/2024/09/commercial-street.jpg",
    lat: 12.9725,
    lng: 77.6113,
  },
  {
    id: 9,
    name: "Wonderla Amusement Park",
    area: "Mysore Road (28 km)",
    category: "Entertainment",
    description:
      "India's premier amusement park with thrilling rides and wave pools.",
    avgTime: "5–6 hours",
    image:
      "https://www.prestigesouthernstar.info/images/prestige/wonderla-amusement-park.webp",
    lat: 12.7698,
    lng: 77.5207,
  },
  {
    id: 10,
    name: "UB City Mall",
    area: "Vittal Mallya Road",
    category: "Shopping",
    description:
      "Bangalore's most luxurious mall featuring premium brands and rooftop dining.",
    avgTime: "2–3 hours",
    image:
      "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80",
    lat: 12.9745,
    lng: 77.6102,
  },
  {
    id: 11,
    name: "Bannerghatta National Park",
    area: "Bannerghatta (22 km)",
    category: "Nature & Parks",
    description:
      "Home to a zoo, safari, butterfly park, and rescue center.",
    avgTime: "3–4 hours",
    image:
      "https://wordzz.com/wp-content/uploads/2023/04/Bannerghatta-National-Park.jpg",
    lat: 12.7519,
    lng: 77.6609,
  },
  {
    id: 12,
    name: "HAL Aerospace Museum",
    area: "HAL Old Airport Road",
    category: "Museum",
    description:
      "India's first aerospace museum showcasing historic aircraft and engines.",
    avgTime: "1–2 hours",
    image:
      "https://www.trawell.in/admin/images/upload/138606180HAL_Aerospace_Museum.jpg",
    lat: 13.0015,
    lng: 77.6248,
  },
];

export const categories = [
  ...new Set(touristPlaces.map((p) => p.category)),
];