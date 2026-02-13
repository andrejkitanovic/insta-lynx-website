export interface Job {
  id: number;
  slug: string;
  company: string;
  companyDescription: string;
  fleetSize: string;
  title: string;
  pay: string;
  payDetails: string[];
  type: string;
  route: string;
  equipment: string;
  homeTime: string;
  homeTimeDetails: string[];
  bonus: string | null;
  hiring: boolean;
  hiringRequirements: string[];
  freightHandling: string;
  additionalInfo: string[];
  petPolicy: string;
  riderPolicy: string;
  description: string;
}

export const JOBS: Job[] = [
  {
    id: 1,
    slug: "eagle-point-cdl-a-oo-otr",
    company: "Eagle Point Transportation LLC",
    companyDescription:
      "Eagle Point Transportation, LLC, a small family-owned company based in Bloomer Wisconsin, is seeking experienced owner-operators. We provide a driver-focused and friendly approach to building our business and yours.",
    fleetSize: "8 trucks",
    title: "CDL-A · Owner Operator OTR",
    pay: "$7,500 – $9,000/wk",
    payDetails: [
      "$7,500 – $9,000 gross total weekly, paid weekly",
      "86% of load",
      "$3,000 sign-on bonus",
      "2,700 – 3,100 miles per week",
    ],
    type: "Owner Operator",
    route: "OTR",
    equipment: "Refrigerated, Dry Van",
    homeTime: "2 weeks out, 3 days home",
    homeTimeDetails: [
      "14 – 28 expected days out",
      "You can stay out longer if you want",
      "Home at least one weekend per month",
    ],
    bonus: "$3,000 sign-on",
    hiring: true,
    hiringRequirements: [
      "Class A license without restrictions (L, Z, G, O, K)",
      "2 years Tractor Trailer experience",
      "No more than 1 moving violation in the last year",
      "No more than 1 moving violation in the last 3 years",
      "Max 1 accident in the last year",
    ],
    freightHandling: "100% live load / unload",
    additionalInfo: [
      "Line Haul",
      "Can take truck home",
      "Equal opportunity employer",
    ],
    petPolicy: "Pets are allowed",
    riderPolicy: "Riders are allowed",
    description:
      "Up to 86% of gross revenue! Weekly pay via direct deposit. Referral bonuses available. Strong communication and real driver collaboration are our core values.",
  },
  {
    id: 2,
    slug: "midwest-express-cdl-a-regional",
    company: "Midwest Express Freight",
    companyDescription:
      "Midwest Express Freight is a mid-size carrier focused on regional lanes throughout the heartland. We prioritize driver home time and offer industry-leading benefits.",
    fleetSize: "120 trucks",
    title: "CDL-A · Regional Driver",
    pay: "$1,600 – $1,900/wk",
    payDetails: [
      "$1,600 – $1,900 total weekly pay",
      "$0.58 – $0.65 CPM",
      "$2,000 sign-on bonus",
      "2,200 – 2,600 miles per week",
    ],
    type: "W2 Employee",
    route: "Regional",
    equipment: "Dry Van",
    homeTime: "Home weekly",
    homeTimeDetails: [
      "5 expected days out",
      "Home every weekend",
      "Flexible scheduling available",
    ],
    bonus: "$2,000 sign-on",
    hiring: true,
    hiringRequirements: [
      "Class A CDL required",
      "1 year verifiable experience",
      "Clean MVR",
      "No DUI/DWI in the last 5 years",
    ],
    freightHandling: "No-touch freight",
    additionalInfo: [
      "Full benefits (health, dental, vision)",
      "401(k) with company match",
      "Paid vacation after 1 year",
    ],
    petPolicy: "Small pets allowed",
    riderPolicy: "Riders allowed after 90 days",
    description:
      "Join Midwest Express Freight for consistent miles, weekly home time, and a team that treats you like family. Full benefits from day one.",
  },
  {
    id: 3,
    slug: "summit-logistics-cdl-a-dedicated",
    company: "Summit Logistics Group",
    companyDescription:
      "Summit Logistics Group operates dedicated routes for major retailers across the Southeast. Consistent freight, consistent pay.",
    fleetSize: "250 trucks",
    title: "CDL-A · Dedicated Route",
    pay: "$1,800 – $2,100/wk",
    payDetails: [
      "$1,800 – $2,100 total weekly pay",
      "$0.62 CPM + $25/stop",
      "Guaranteed minimum 2,400 miles/week",
    ],
    type: "W2 Employee",
    route: "Dedicated",
    equipment: "Flatbed",
    homeTime: "Home every other weekend",
    homeTimeDetails: [
      "10 – 14 expected days out",
      "Home every other weekend guaranteed",
    ],
    bonus: null,
    hiring: true,
    hiringRequirements: [
      "Class A CDL required",
      "6 months flatbed experience preferred",
      "Must pass drug screen and background check",
    ],
    freightHandling: "Driver assist load/unload with tarping",
    additionalInfo: [
      "Late-model equipment",
      "APU-equipped trucks",
      "Dedicated dispatcher",
    ],
    petPolicy: "No pets",
    riderPolicy: "Riders allowed",
    description:
      "Dedicated lanes with consistent miles and pay. Late-model equipment and a dedicated dispatcher who knows your route.",
  },
  {
    id: 4,
    slug: "pacific-coast-cdl-a-local",
    company: "Pacific Coast Carriers",
    companyDescription:
      "Pacific Coast Carriers handles last-mile and regional delivery along the West Coast. Home daily positions with competitive hourly pay.",
    fleetSize: "85 trucks",
    title: "CDL-A · Local P&D Driver",
    pay: "$1,400 – $1,700/wk",
    payDetails: [
      "$1,400 – $1,700 total weekly pay",
      "$28 – $32 per hour",
      "$1,500 sign-on bonus",
    ],
    type: "W2 Employee",
    route: "Local",
    equipment: "Dry Van",
    homeTime: "Home daily",
    homeTimeDetails: [
      "Home every night",
      "5-day work week, weekends off",
    ],
    bonus: "$1,500 sign-on",
    hiring: false,
    hiringRequirements: [
      "Class A CDL required",
      "1 year P&D experience preferred",
      "Must be able to use pallet jack",
    ],
    freightHandling: "Touch freight — average 12 stops/day",
    additionalInfo: [
      "Day cab equipment",
      "Full benefits package",
      "Overtime available",
    ],
    petPolicy: "No pets (day cab)",
    riderPolicy: "No riders",
    description:
      "Local P&D routes along the West Coast. Home every night, weekends off, full benefits from day one.",
  },
  {
    id: 5,
    slug: "transcontinental-cdl-a-team-otr",
    company: "Transcontinental Haulers",
    companyDescription:
      "Transcontinental Haulers runs coast-to-coast temperature-controlled freight. Top team pay in the industry.",
    fleetSize: "500+ trucks",
    title: "CDL-A · Team OTR",
    pay: "$3,200 – $4,000/wk (team)",
    payDetails: [
      "$3,200 – $4,000 total weekly team pay",
      "$0.72 CPM split",
      "$8,000 team sign-on bonus",
      "5,000+ miles per week",
    ],
    type: "W2 Employee",
    route: "OTR",
    equipment: "Refrigerated",
    homeTime: "3 weeks out, 1 week home",
    homeTimeDetails: [
      "21 expected days out",
      "7 days home time",
      "Flexible scheduling for teams",
    ],
    bonus: "$8,000 team sign-on",
    hiring: true,
    hiringRequirements: [
      "Class A CDL required for both drivers",
      "1 year OTR experience each",
      "Clean MVR",
      "Must pass hair follicle test",
    ],
    freightHandling: "No-touch freight",
    additionalInfo: [
      "Brand new Freightliner Cascadias",
      "Full benefits for both team members",
      "Quarterly safety bonus",
    ],
    petPolicy: "One small pet per team",
    riderPolicy: "Team partner is the rider",
    description:
      "Industry-leading team pay with brand new equipment. Coast-to-coast reefer lanes. $8,000 team sign-on bonus.",
  },
  {
    id: 6,
    slug: "heartland-cdl-a-oo-regional",
    company: "Heartland Trucking Co.",
    companyDescription:
      "Heartland Trucking Co. has been serving the Midwest for over 30 years. Owner-operators are the backbone of our operation.",
    fleetSize: "200+ trucks",
    title: "CDL-A · Owner Operator Regional",
    pay: "$5,000 – $7,000/wk",
    payDetails: [
      "$5,000 – $7,000 gross weekly",
      "88% of load rate",
      "Fuel surcharge passed through 100%",
    ],
    type: "Owner Operator",
    route: "Regional",
    equipment: "Dry Van, Refrigerated",
    homeTime: "Home weekends",
    homeTimeDetails: [
      "5 – 6 days out",
      "Home every weekend",
    ],
    bonus: null,
    hiring: true,
    hiringRequirements: [
      "Class A CDL required",
      "Own your own truck (2015 or newer)",
      "2 years OTR/Regional experience",
    ],
    freightHandling: "No-touch freight",
    additionalInfo: [
      "Trailer provided",
      "ELD provided",
      "Weekly settlements",
    ],
    petPolicy: "Pets allowed",
    riderPolicy: "Riders allowed",
    description:
      "88% of load rate with 100% fuel surcharge pass-through. Home weekends. We provide trailers and ELD equipment.",
  },
  {
    id: 7,
    slug: "coastal-freight-cdl-b-local",
    company: "Coastal Freight Solutions",
    companyDescription:
      "Coastal Freight Solutions specializes in last-mile delivery for e-commerce and retail clients along the Eastern Seaboard.",
    fleetSize: "60 trucks",
    title: "CDL-B · Local Delivery",
    pay: "$1,100 – $1,400/wk",
    payDetails: [
      "$1,100 – $1,400 total weekly pay",
      "$24 – $28 per hour",
      "$500 sign-on bonus",
    ],
    type: "W2 Employee",
    route: "Local",
    equipment: "Box Truck",
    homeTime: "Home daily",
    homeTimeDetails: [
      "Home every night",
      "Monday – Friday schedule",
    ],
    bonus: "$500 sign-on",
    hiring: true,
    hiringRequirements: [
      "Class B CDL required",
      "6 months delivery experience",
      "Ability to lift 50 lbs",
    ],
    freightHandling: "Touch freight — 15-20 stops/day",
    additionalInfo: [
      "Automatic transmission trucks",
      "Health and dental benefits",
      "Paid training provided",
    ],
    petPolicy: "No pets",
    riderPolicy: "No riders",
    description:
      "Local delivery routes with home daily. Monday through Friday schedule. Paid training and full benefits.",
  },
  {
    id: 8,
    slug: "great-plains-cdl-a-otr-flatbed",
    company: "Great Plains Carriers",
    companyDescription:
      "Great Plains Carriers runs flatbed freight across the lower 48. Specializing in construction materials and heavy equipment.",
    fleetSize: "150 trucks",
    title: "CDL-A · OTR Flatbed",
    pay: "$2,000 – $2,500/wk",
    payDetails: [
      "$2,000 – $2,500 total weekly pay",
      "$0.60 CPM + tarp pay",
      "$3,000 sign-on bonus",
      "2,500 – 3,000 miles per week",
    ],
    type: "W2 Employee",
    route: "OTR",
    equipment: "Flatbed",
    homeTime: "2 weeks out, 4 days home",
    homeTimeDetails: [
      "14 expected days out",
      "4 days home",
      "Can request extended home time",
    ],
    bonus: "$3,000 sign-on",
    hiring: true,
    hiringRequirements: [
      "Class A CDL required",
      "1 year flatbed experience",
      "Must be able to tarp and secure loads",
      "Clean MVR",
    ],
    freightHandling: "Driver assist — tarping and securement required",
    additionalInfo: [
      "Tarp pay on every load",
      "Full benefits after 30 days",
      "Newer Peterbilt and Kenworth equipment",
    ],
    petPolicy: "Pets allowed",
    riderPolicy: "Riders allowed after 90 days",
    description:
      "OTR flatbed with top pay and tarp compensation. Newer equipment. $3,000 sign-on bonus and full benefits after 30 days.",
  },
];

export function getJobBySlug(slug: string): Job | undefined {
  return JOBS.find((job) => job.slug === slug);
}
