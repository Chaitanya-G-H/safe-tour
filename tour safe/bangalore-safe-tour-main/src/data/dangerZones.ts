export interface DangerZone {
  id: number;
  name: string;
  lat: number;
  lng: number;
  radius: number;
  threat: string;
  description: string;
  tips: string[];
}

export const dangerZones: DangerZone[] = [
  {
    id: 1,
    name: "Majestic Bus Station (Kempegowda)",
    lat: 12.9772,
    lng: 77.5721,
    radius: 400,
    threat: "High Scam Risk",
    description: "Touts posing as 'official' guides offer overpriced transport and fake hotel bookings. Pickpocketing is common in crowded areas.",
    tips: [
      "Use only KSRTC/BMTC official counters",
      "Book transport via apps (Ola, Uber, Namma Yatri)",
      "Keep valuables in front pockets",
      "Ignore anyone approaching with 'special offers'",
    ],
  },
  {
    id: 2,
    name: "MG Road / Brigade Road (Night)",
    lat: 12.9748,
    lng: 77.6068,
    radius: 350,
    threat: "Nightlife Touts & Overcharging",
    description: "After dark, touts push tourists into overpriced clubs/bars with inflated bills. Fake 'VIP entry' scams are common.",
    tips: [
      "Research bars/clubs before visiting",
      "Check prices on the menu before ordering",
      "Avoid people offering 'free entry' deals",
      "Use verified apps for nightlife recommendations",
    ],
  },
  {
    id: 3,
    name: "City Railway Station Area",
    lat: 12.9784,
    lng: 77.5711,
    radius: 350,
    threat: "Fake Tour Offices",
    description: "Unlicensed 'tour operators' near the station sell fake packages with non-existent hotels and transport. Some impersonate KSTDC.",
    tips: [
      "Book only through KSTDC official office or website",
      "Verify tour operator licenses",
      "Never pay full amount upfront to strangers",
      "Check reviews on Google Maps before booking",
    ],
  },
  {
    id: 4,
    name: "Bangalore Palace Vicinity",
    lat: 12.9988,
    lng: 77.5922,
    radius: 300,
    threat: "Aggressive 'Government' Shops",
    description: "Shops near the palace claim 'government fixed rates' for silk, sandalwood, and handicrafts but sell at 3-5x actual prices.",
    tips: [
      "Government emporiums are Cauvery/KSIC only",
      "Compare prices at Cauvery Arts & Crafts Emporium",
      "Don't trust auto drivers' shop recommendations",
      "Bargain hard or walk away — it's expected",
    ],
  },
  {
    id: 5,
    name: "KR Market (City Market)",
    lat: 12.9633,
    lng: 77.5779,
    radius: 300,
    threat: "Pickpocketing & Overcharging",
    description: "Extremely crowded wholesale market where pickpockets operate and vendors may overcharge tourists unfamiliar with local rates.",
    tips: [
      "Visit early morning for fewer crowds",
      "Keep phone and wallet in secure inner pockets",
      "Ask locals about fair prices before buying",
      "Travel light — avoid carrying large bags",
    ],
  },
  {
    id: 6,
    name: "Silk Board Junction",
    lat: 12.9177,
    lng: 77.6238,
    radius: 250,
    threat: "Traffic Scam & Auto Overcharging",
    description: "Auto and cab drivers refuse meters and demand 2-3x fares, especially during peak traffic hours. Some take unnecessarily long routes.",
    tips: [
      "Always insist on meter or use ride-hailing apps",
      "Use Namma Yatri for fair auto fares",
      "Avoid autos that approach you first",
      "Check Google Maps for the correct route",
    ],
  },
];
