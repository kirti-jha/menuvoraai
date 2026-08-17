export const NAV_LINKS = [
  { label: "Services", href: "/products" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FEATURES = [
  {
    icon: "🌐",
    title: "Restaurant Website Development",
    description:
      "Responsive, fast-loading websites that showcase your restaurant beautifully across mobile, tablet, and desktop.",
    plans: ["basic", "pro", "business"],
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: "🍽️",
    title: "Interactive Food Menu",
    description:
      "A stunning digital menu with categories, prices, and item details that keeps customers browsing — and ordering.",
    plans: ["basic", "pro", "business"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: "📱",
    title: "QR Code Menu",
    description:
      "Customers scan a QR code to view your full menu instantly on their phone. Update anytime — no reprinting.",
    plans: ["pro", "business"],
    color: "from-pink-500 to-red-500",
  },
  {
    icon: "📅",
    title: "Online Table Reservation",
    description:
      "Let guests book a table directly from your website. Reduce no-shows and fill your seats every night.",
    plans: ["basic", "pro", "business"],
    color: "from-cyan-500 to-teal-500",
  },
  {
    icon: "💬",
    title: "WhatsApp Ordering",
    description:
      "Turn browsers into buyers with one-tap WhatsApp ordering integrated directly into your menu and website.",
    plans: ["pro", "business"],
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: "📍",
    title: "Google Maps & Location",
    description:
      "Contact and location integration with Google Maps so customers can find and reach you in seconds.",
    plans: ["basic", "pro", "business"],
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: "🔍",
    title: "SEO Optimization",
    description:
      "Rank higher on Google and get discovered by hungry customers searching for restaurants near them.",
    plans: ["basic", "pro", "business"],
    color: "from-violet-500 to-indigo-500",
  },
  {
    icon: "🛠️",
    title: "Restaurant Management System",
    description:
      "Custom order management dashboards and digital menu management tools built around how your restaurant runs.",
    plans: ["business"],
    color: "from-sky-500 to-blue-500",
  },
  {
    icon: "🎁",
    title: "Customer Loyalty Programs",
    description:
      "Keep customers coming back with digital loyalty programs and business automation tools tailored to your brand.",
    plans: ["business"],
    color: "from-fuchsia-500 to-purple-500",
  },
];

export const PRICING_PLANS = [
  {
    id: "basic",
    name: "Website",
    tagline: "Get your restaurant online fast",
    prices: {
      monthly: { amount: 100, label: "₹100" },
      quarterly: { amount: 250, label: "₹250" },
      halfyearly: { amount: 500, label: "₹500" },
      yearly: { amount: 200, label: "₹200/mo" },
    },
    popular: false,
    color: "from-slate-600 to-slate-700",
    features: [
      "Responsive restaurant website",
      "Interactive food menu",
      "Online table reservation",
      "Contact & Google Maps integration",
      "Mobile-friendly design",
      "Basic SEO setup",
      "Email support",
    ],
    cta: "Start for ₹100",
  },
  {
    id: "pro",
    name: "Website + QR Menu",
    tagline: "The complete digital package",
    prices: {
      monthly: { amount: 1000, label: "₹1,000" },
      quarterly: { amount: 2500, label: "₹2,500" },
      halfyearly: { amount: 5000, label: "₹5,000" },
      yearly: { amount: 2000, label: "₹2,000/mo" },
    },
    popular: true,
    color: "from-indigo-500 to-purple-600",
    features: [
      "Everything in Website",
      "QR code digital menu",
      "Unlimited menu updates",
      "WhatsApp ordering",
      "Full SEO optimization",
      "Fast & secure hosting",
      "Priority support",
    ],
    cta: "Get QR Menu",
  },
  {
    id: "business",
    name: "Custom Solution",
    tagline: "Tailored for your restaurant brand",
    prices: {
      monthly: { amount: 10000, label: "₹10,000" },
      quarterly: { amount: 25000, label: "₹25,000" },
      halfyearly: { amount: 50000, label: "₹50,000" },
      yearly: { amount: 20000, label: "₹20,000/mo" },
    },
    popular: false,
    color: "from-violet-600 to-indigo-700",
    features: [
      "Everything in Website + QR Menu",
      "Restaurant management system",
      "Order management dashboard",
      "Customer loyalty program",
      "Business automation tools",
      "Custom web applications",
      "Dedicated account manager",
      "24/7 priority support",
    ],
    cta: "Request a Quote",
  },
];

export const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    role: "Owner, Spice Garden Café",
    avatar: "RK",
    review:
      "Menuvora built us a beautiful website and QR menu in under two weeks. Customers love scanning the code, and we update our specials in seconds without reprinting anything.",
    rating: 5,
    plan: "Website + QR Menu",
  },
  {
    name: "Meena Nair",
    role: "Manager, Coastal Kitchen",
    avatar: "MN",
    review:
      "Online reservations and WhatsApp ordering have genuinely increased our footfall. The site loads fast on mobile and we started showing up on Google for nearby searches.",
    rating: 5,
    plan: "Website + QR Menu",
  },
  {
    name: "Harpreet Singh",
    role: "Owner, Punjabi Rasoi",
    avatar: "HS",
    review:
      "They understood exactly how a dhaba operates and built a custom management dashboard around it. Fast delivery, clean design, and support whenever we need it.",
    rating: 5,
    plan: "Custom Solution",
  },
  {
    name: "Aditya Verma",
    role: "Founder, Urban Bites Cloud Kitchen",
    avatar: "AV",
    review:
      "As a cloud kitchen, our menu is everything. The digital QR menu and order management tools Menuvora built have made our operations far smoother.",
    rating: 5,
    plan: "Custom Solution",
  },
];

export const CLIENTS = [
  {
    name: "Shree Ram Dhaba",
    description:
      "Custom restaurant website and digital business solutions.",
    icon: "🍛",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    name: "HR26 Dhaba",
    description:
      "Tailored web development and online presence enhancements.",
    icon: "🍲",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    name: "Kake Da Hotel, Delhi",
    description:
      "Customized digital solutions supporting restaurant operations and customer engagement.",
    icon: "🍽️",
    gradient: "from-indigo-500/20 to-purple-500/20",
  },
];

export const USE_CASES = [
  {
    icon: "☕",
    title: "Cafés",
    description:
      "Cozy, mobile-first websites and QR menus that match your café's vibe and keep regulars coming back.",
    gradient: "from-pink-500/20 to-purple-500/20",
  },
  {
    icon: "🍷",
    title: "Fine Dining",
    description:
      "Elegant websites with reservations and rich menus that reflect a premium dining experience.",
    gradient: "from-indigo-500/20 to-blue-500/20",
  },
  {
    icon: "🍛",
    title: "Dhabas",
    description:
      "Simple, fast digital menus and websites that bring traditional dhabas online with zero hassle.",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: "🍔",
    title: "Cloud Kitchens",
    description:
      "QR menus, WhatsApp ordering, and order dashboards built for delivery-first, digital-native kitchens.",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Share Your Requirements",
    description:
      "Tell us about your restaurant, your menu, and your goals. Café, fine dining, dhaba, or cloud kitchen — we tailor to you.",
  },
  {
    step: "02",
    title: "We Design & Build",
    description:
      "Our team builds your website and QR menu around your branding and workflow, with fast, secure hosting included.",
  },
  {
    step: "03",
    title: "Launch & Grow",
    description:
      "Go live, get discovered on Google, and serve customers better. Update your menu anytime with ongoing support.",
  },
];

export const BILLING_PERIODS = [
  { id: "monthly", label: "Monthly" },
  { id: "quarterly", label: "Quarterly", badge: "Save 17%" },
  { id: "halfyearly", label: "6 Months", badge: "Save 25%" },
  { id: "yearly", label: "Yearly", badge: "Save 33%" },
];
