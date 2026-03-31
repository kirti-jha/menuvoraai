export const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FEATURES = [
  {
    icon: "✍️",
    title: "AI Content Generator",
    description:
      "Create blogs, captions, ads, and marketing copy in seconds. Trained on top-performing content across industries.",
    plans: ["basic", "pro", "business"],
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: "🎨",
    title: "AI Image Generator",
    description:
      "Generate stunning visuals, product mockups, and social media graphics using state-of-the-art diffusion models.",
    plans: ["basic", "pro", "business"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: "🎬",
    title: "AI Video Generator",
    description:
      "Transform scripts and images into professional videos with AI-driven editing, voiceovers, and transitions.",
    plans: ["pro", "business"],
    color: "from-pink-500 to-red-500",
  },
  {
    icon: "🤖",
    title: "AI Chatbot Builder",
    description:
      "Build and deploy custom AI chatbots on your website or app without writing a single line of code.",
    plans: ["pro", "business"],
    color: "from-cyan-500 to-teal-500",
  },
  {
    icon: "🎯",
    title: "AI Lead Generation",
    description:
      "Find, qualify, and reach your ideal customers automatically. AI identifies high-intent prospects and drafts outreach.",
    plans: ["business"],
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: "📧",
    title: "AI Email Marketing",
    description:
      "Personalized email campaigns that write themselves. Segment, send, and optimize with AI-driven insights.",
    plans: ["pro", "business"],
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: "⚡",
    title: "Automation Dashboard",
    description:
      "Connect your entire workflow. Trigger AI actions based on events, schedule tasks, and monitor performance.",
    plans: ["business"],
    color: "from-violet-500 to-indigo-500",
  },
  {
    icon: "📄",
    title: "Resume Builder",
    description:
      "AI-crafted professional resumes and cover letters tailored for the job description you're targeting.",
    plans: ["basic", "pro", "business"],
    color: "from-sky-500 to-blue-500",
  },
  {
    icon: "📱",
    title: "Social Media Tools",
    description:
      "Schedule posts, generate captions, and analyze engagement across all major platforms from one dashboard.",
    plans: ["pro", "business"],
    color: "from-fuchsia-500 to-purple-500",
  },
];

export const PRICING_PLANS = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Perfect to get started",
    prices: {
      monthly: { amount: 100, label: "₹100" },
      quarterly: { amount: 250, label: "₹250" },
      halfyearly: { amount: 500, label: "₹500" },
      yearly: { amount: 200, label: "₹200/mo" },
    },
    popular: false,
    color: "from-slate-600 to-slate-700",
    features: [
      "500 AI credits / month",
      "AI Content Generator",
      "AI Image Generator (basic)",
      "Resume Builder",
      "3 projects",
      "Email support",
    ],
    cta: "Start for ₹100",
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For serious creators & teams",
    prices: {
      monthly: { amount: 1000, label: "₹1,000" },
      quarterly: { amount: 2500, label: "₹2,500" },
      halfyearly: { amount: 5000, label: "₹5,000" },
      yearly: { amount: 2000, label: "₹2,000/mo" },
    },
    popular: true,
    color: "from-indigo-500 to-purple-600",
    features: [
      "Everything in Basic",
      "5,000 AI credits / month",
      "AI Video Generator",
      "AI Chatbot Builder",
      "Social Media Tools",
      "AI Email Marketing",
      "Priority email support",
      "Unlimited projects",
    ],
    cta: "Get Pro",
  },
  {
    id: "business",
    name: "Business",
    tagline: "Full AI OS for your company",
    prices: {
      monthly: { amount: 10000, label: "₹10,000" },
      quarterly: { amount: 25000, label: "₹25,000" },
      halfyearly: { amount: 50000, label: "₹50,000" },
      yearly: { amount: 20000, label: "₹20,000/mo" },
    },
    popular: false,
    color: "from-violet-600 to-indigo-700",
    features: [
      "Everything in Pro",
      "Unlimited AI credits",
      "AI Lead Generation System",
      "AI Sales Chatbot",
      "Automation Dashboard",
      "Custom AI Agents",
      "Dedicated account manager",
      "Priority 24/7 support",
      "White-label options",
    ],
    cta: "Go Business",
  },
];

export const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Founder, ContentFlow Agency",
    avatar: "PS",
    review:
      "Menuvora cut our content production time by 80%. What used to take a team of 5 writers now happens in minutes. Our clients are blown away by the quality.",
    rating: 5,
    plan: "Business",
  },
  {
    name: "Arjun Mehta",
    role: "Freelance Designer & Creator",
    avatar: "AM",
    review:
      "The AI Image Generator alone is worth the price. I've replaced 3 separate subscriptions with just Menuvora. My output is 10x what it used to be.",
    rating: 5,
    plan: "Pro",
  },
  {
    name: "Sneha Reddy",
    role: "Marketing Lead, TechStart India",
    avatar: "SR",
    review:
      "We launched our entire email marketing campaign using Menuvora in one afternoon. The AI understood our brand voice perfectly. Incredible tool.",
    rating: 5,
    plan: "Business",
  },
  {
    name: "Rohan Kapoor",
    role: "Solo Startup Founder",
    avatar: "RK",
    review:
      "Started with the Basic plan at ₹100 just to try it out. Upgraded to Pro within a week. The chatbot builder alone helped me convert 40% more leads.",
    rating: 5,
    plan: "Pro",
  },
];

export const USE_CASES = [
  {
    icon: "🎨",
    title: "Creators",
    description:
      "Generate content, images, and videos at scale. Stay consistent, grow faster, and monetize your creativity.",
    gradient: "from-pink-500/20 to-purple-500/20",
  },
  {
    icon: "💼",
    title: "Freelancers",
    description:
      "Deliver more to clients faster. Build a premium reputation with AI-powered work that looks handcrafted.",
    gradient: "from-indigo-500/20 to-blue-500/20",
  },
  {
    icon: "🚀",
    title: "Startups",
    description:
      "Move at startup speed without a big team. Marketing, sales, and support — all automated with AI.",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: "🏢",
    title: "Agencies",
    description:
      "Scale client deliverables without scaling headcount. White-label AI that makes you look like a genius.",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose a Plan",
    description:
      "Pick the plan that fits your needs. Start as low as ₹100. Upgrade or downgrade anytime with no lock-in.",
  },
  {
    step: "02",
    title: "Access AI Tools",
    description:
      "Log into your dashboard and get instant access to the full suite of AI tools for your plan tier.",
  },
  {
    step: "03",
    title: "Automate & Grow",
    description:
      "Connect your workflows, set automations, and watch your business grow while AI handles the heavy lifting.",
  },
];

export const BILLING_PERIODS = [
  { id: "monthly", label: "Monthly" },
  { id: "quarterly", label: "Quarterly", badge: "Save 17%" },
  { id: "halfyearly", label: "6 Months", badge: "Save 25%" },
  { id: "yearly", label: "Yearly", badge: "Save 33%" },
];
