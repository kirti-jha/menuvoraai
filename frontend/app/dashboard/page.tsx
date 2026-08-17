"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  User, 
  QrCode, 
  Utensils, 
  MessageSquare, 
  Globe, 
  Calendar, 
  TrendingUp, 
  LogOut, 
  CheckCircle2, 
  Plus, 
  Settings, 
  Store,
  CreditCard,
  Printer,
  Smartphone,
  Trash2,
  Edit,
  Check,
  X,
  Radio,
  Clock,
  Sparkles,
  Download,
  Share2
} from "lucide-react";
import { useStore } from "@/lib/store";
import Link from "next/link";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  isVeg: boolean;
  inStock: boolean;
  description: string;
}

interface Order {
  id: string;
  tableNo: string;
  items: string;
  total: number;
  status: "NEW" | "PREPARING" | "READY" | "SERVED";
  time: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logoutUser } = useStore();

  const [activeTab, setActiveTab] = useState<"overview" | "menu" | "qr" | "orders" | "pos">("overview");
  const [storeOpen, setStoreOpen] = useState(true);
  const [selectedTable, setSelectedTable] = useState("Table 1");
  const [showAddDishModal, setShowAddDishModal] = useState(false);

  // Menu State
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: "1", name: "Shree Ram Special Thali", price: 280, category: "Main Course", isVeg: true, inStock: true, description: "Paneer, Dal Makhani, 2 Butter Naan, Rice, Raita & Gulab Jamun" },
    { id: "2", name: "Paneer Butter Masala", price: 240, category: "Curry", isVeg: true, inStock: true, description: "Rich cottage cheese cooked in tomato butter gravy" },
    { id: "3", name: "Butter Naan", price: 45, category: "Breads", isVeg: true, inStock: true, description: "Traditional clay oven baked bread topped with fresh butter" },
    { id: "4", name: "Dal Makhani", price: 190, category: "Main Course", isVeg: true, inStock: true, description: "Slow-cooked black lentils enriched with cream" },
    { id: "5", name: "Chicken Tikka Masala", price: 320, category: "Non-Veg", isVeg: false, inStock: true, description: "Smoky roasted chicken cooked in spicy gravy" },
    { id: "6", name: "Gulab Jamun (2 Pcs)", price: 80, category: "Dessert", isVeg: true, inStock: true, description: "Soft milk dumplings soaked in cardamom sugar syrup" },
  ]);

  // New Dish Form State
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Main Course");
  const [newItemIsVeg, setNewItemIsVeg] = useState(true);
  const [newItemDesc, setNewItemDesc] = useState("");

  // Orders State
  const [orders, setOrders] = useState<Order[]>([
    { id: "ORD-901", tableNo: "Table 4", items: "1x Special Thali, 2x Butter Naan", total: 370, status: "NEW", time: "2 mins ago" },
    { id: "ORD-902", tableNo: "Table 2", items: "2x Paneer Butter Masala, 4x Naan", total: 660, status: "PREPARING", time: "8 mins ago" },
    { id: "ORD-903", tableNo: "Table 7", items: "1x Chicken Tikka, 2x Naan", total: 410, status: "READY", time: "15 mins ago" },
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleAddDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) return;

    const item: MenuItem = {
      id: Date.now().toString(),
      name: newItemName,
      price: parseFloat(newItemPrice),
      category: newItemCategory,
      isVeg: newItemIsVeg,
      inStock: true,
      description: newItemDesc || "Freshly prepared dish",
    };

    setMenuItems([item, ...menuItems]);
    setShowAddDishModal(false);
    setNewItemName("");
    setNewItemPrice("");
    setNewItemDesc("");
  };

  const toggleStock = (id: string) => {
    setMenuItems(menuItems.map(item => item.id === id ? { ...item, inStock: !item.inStock } : item));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const updateOrderStatus = (id: string, newStatus: Order["status"]) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* HEADER BAR */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-6 sm:p-8 border border-[rgba(99,102,241,0.2)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30 shrink-0">
            <Store className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-heading font-bold text-white tracking-tight">
                Shree Ram Dhaba & Café
              </h1>
              <button
                onClick={() => setStoreOpen(!storeOpen)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  storeOpen
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                    : "bg-red-500/20 text-red-400 border-red-500/40"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${storeOpen ? "bg-emerald-400 animate-ping" : "bg-red-400"}`}></span>
                {storeOpen ? "STORE ONLINE / OPEN" : "STORE CLOSED"}
              </button>
            </div>
            <p className="text-xs text-[#8888aa] font-mono mt-1">
              Admin: <strong className="text-indigo-300">{user.email}</strong> | MID: <span className="text-slate-300">MENU_AI_9901</span>
            </p>
          </div>
        </div>

        {/* Quick Links & Signout */}
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/checkout/pos"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
          >
            <CreditCard className="w-4 h-4" /> Razorpay POS Terminal
          </Link>

          <button
            onClick={() => {
              logoutUser();
              router.push("/signin");
            }}
            className="px-4 py-2.5 rounded-xl glass-light border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-medium flex items-center gap-2 transition-all"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </motion.div>

      {/* DASHBOARD TAB NAVIGATION BAR */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 rounded-2xl glass border border-[rgba(99,102,241,0.15)]">
        {[
          { id: "overview", label: "Overview & Analytics", icon: TrendingUp },
          { id: "menu", label: `Digital Menu (${menuItems.length})`, icon: Utensils },
          { id: "qr", label: "QR Code Table Stands", icon: QrCode },
          { id: "orders", label: `Live Orders (${orders.length})`, icon: MessageSquare, badge: orders.filter(o => o.status === "NEW").length },
          { id: "pos", label: "POS & Soundbox Terminal", icon: CreditCard },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? "btn-shimmer text-white shadow-lg shadow-indigo-500/20"
                  : "text-[#8888aa] hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-indigo-400"}`} />
              <span>{tab.label}</span>
              {tab.badge && tab.badge > 0 ? (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-extrabold animate-pulse">
                  {tab.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Today's Total Sales", value: "₹ 14,850.00", icon: TrendingUp, color: "text-emerald-400", change: "+18.2%" },
              { label: "QR Scans Today", value: "482 Scans", icon: QrCode, color: "text-indigo-400", change: "+14.2%" },
              { label: "WhatsApp & Online Orders", value: "42 Orders", icon: MessageSquare, color: "text-purple-400", change: "+9.5%" },
              { label: "Connected POS Soundbox", value: "ONLINE (5B006033)", icon: Radio, color: "text-cyan-400", change: "Signal 100%" },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="glass rounded-2xl p-5 border border-[rgba(99,102,241,0.15)] relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#8888aa]">{item.label}</span>
                  <div className="p-2 rounded-xl bg-white/5">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-heading font-bold text-white">{item.value}</span>
                  <span className="text-xs font-semibold text-emerald-400">{item.change}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass rounded-3xl p-6 border border-[rgba(99,102,241,0.2)]">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[rgba(99,102,241,0.15)]">
                <div>
                  <h3 className="text-lg font-heading font-bold text-white">Popular Dishes Today</h3>
                  <p className="text-xs text-[#8888aa]">Top performing items based on customer QR orders</p>
                </div>
                <button onClick={() => setActiveTab("menu")} className="text-xs text-indigo-400 hover:underline">View All Menu →</button>
              </div>

              <div className="space-y-3">
                {menuItems.slice(0, 4).map((item) => (
                  <div key={item.id} className="glass-light p-4 rounded-xl flex items-center justify-between border border-[rgba(99,102,241,0.1)]">
                    <div className="flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${item.isVeg ? 'border-emerald-500' : 'border-red-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.name}</p>
                        <span className="text-xs text-[#8888aa]">{item.category}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-indigo-300">₹{item.price}</span>
                      <span className="block text-[10px] text-emerald-400 font-medium">Available</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-6 border border-[rgba(99,102,241,0.2)] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-heading font-bold text-white mb-2">Soundbox & POS Terminal</h3>
                <p className="text-xs text-[#8888aa] mb-4">Razorpay POS Device Integration</p>

                <div className="glass-light p-4 rounded-2xl border border-indigo-500/20 space-y-2 mb-4">
                  <div className="flex justify-between text-xs"><span>Device ID:</span><span className="font-mono text-white font-bold">5B006033</span></div>
                  <div className="flex justify-between text-xs"><span>Gateway:</span><span className="text-emerald-400 font-medium">Ezetap POS Bridge 3.0</span></div>
                  <div className="flex justify-between text-xs"><span>Status:</span><span className="text-emerald-400 font-bold">READY</span></div>
                </div>
              </div>

              <Link
                href="/checkout/pos"
                className="w-full btn-shimmer py-3 rounded-xl font-semibold text-white text-xs flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" /> Open Razorpay POS Terminal
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DIGITAL MENU MANAGER */}
      {activeTab === "menu" && (
        <div className="glass rounded-3xl p-6 sm:p-8 border border-[rgba(99,102,241,0.2)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(99,102,241,0.15)] pb-4">
            <div>
              <h2 className="text-xl font-heading font-bold text-white">Live Food Menu Manager</h2>
              <p className="text-xs text-[#8888aa]">Add, edit, or toggle availability of menu items shown on QR menu</p>
            </div>
            <button
              onClick={() => setShowAddDishModal(true)}
              className="btn-shimmer px-5 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              <Plus className="w-4 h-4" /> Add New Dish
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`glass-light p-5 rounded-2xl border transition-all space-y-3 ${
                  item.inStock ? "border-[rgba(99,102,241,0.2)]" : "border-red-500/30 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center p-0.5 ${item.isVeg ? 'border-emerald-500' : 'border-red-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                    </span>
                    <h3 className="font-heading font-bold text-white text-base">{item.name}</h3>
                  </div>
                  <span className="text-sm font-bold text-indigo-300">₹{item.price}</span>
                </div>

                <p className="text-xs text-[#8888aa] line-clamp-2">{item.description}</p>

                <div className="flex items-center justify-between border-t border-[rgba(99,102,241,0.1)] pt-3 text-xs">
                  <span className="px-2 py-0.5 rounded bg-white/5 text-[#8888aa] font-medium">{item.category}</span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleStock(item.id)}
                      className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-colors ${
                        item.inStock
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-red-500/20 text-red-300 border border-red-500/30"
                      }`}
                    >
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </button>

                    <button
                      onClick={() => deleteMenuItem(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: QR CODE TABLE STAND GENERATOR */}
      {activeTab === "qr" && (
        <div className="glass rounded-3xl p-6 sm:p-8 border border-[rgba(99,102,241,0.2)] space-y-6">
          <div className="border-b border-[rgba(99,102,241,0.15)] pb-4">
            <h2 className="text-xl font-heading font-bold text-white">Table QR Code Generator</h2>
            <p className="text-xs text-[#8888aa]">Generate and download printable QR code stands for each table in your restaurant</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#ccccdd] mb-2 uppercase tracking-wider">Select Table Number</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Table 1", "Table 2", "Table 3", "Table 4", "Table 5", "Table 6", "Table 7", "Table 8", "Table 9"].map(tbl => (
                    <button
                      key={tbl}
                      onClick={() => setSelectedTable(tbl)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        selectedTable === tbl
                          ? "border-indigo-500 bg-indigo-500/20 text-white shadow-lg shadow-indigo-500/20"
                          : "glass-light border-[rgba(99,102,241,0.15)] text-[#8888aa] hover:text-white"
                      }`}
                    >
                      {tbl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-light p-4 rounded-2xl border border-[rgba(99,102,241,0.15)] space-y-2 text-xs text-[#8888aa]">
                <div className="flex justify-between"><span>Linked Menu URL:</span><span className="text-indigo-300 font-mono">menuvoraai.com/menu</span></div>
                <div className="flex justify-between"><span>Target Table:</span><span className="text-white font-bold">{selectedTable}</span></div>
                <div className="flex justify-between"><span>Format:</span><span>Digital Scan & Order</span></div>
              </div>
            </div>

            {/* Visual Printable Card Preview */}
            <div className="md:col-span-7 flex flex-col items-center">
              <div className="w-full max-w-sm bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 p-6 rounded-3xl border-2 border-indigo-500/40 shadow-2xl text-center space-y-4 relative">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="font-heading font-bold text-white text-base">Shree Ram Dhaba</span>
                </div>

                <div className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold inline-block">
                  SCAN TO VIEW MENU & ORDER
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-xl w-48 h-48 mx-auto flex items-center justify-center border-4 border-slate-900">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://menuvoraai.com/menu?table=${encodeURIComponent(selectedTable)}`}
                    alt="Table QR Code"
                    className="w-full h-full"
                  />
                </div>

                <div>
                  <div className="text-xl font-heading font-extrabold text-white">{selectedTable}</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Powered by Menuvora AI Restaurant OS</p>
                </div>
              </div>

              <a
                href={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://menuvoraai.com/menu?table=${encodeURIComponent(selectedTable)}`}
                target="_blank"
                download={`Menuvora_${selectedTable}_QR.png`}
                className="mt-4 btn-shimmer px-6 py-3 rounded-xl font-semibold text-white text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20"
              >
                <Download className="w-4 h-4" /> Download High-Res PNG Stand
              </a>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LIVE CUSTOMER ORDERS FEED */}
      {activeTab === "orders" && (
        <div className="glass rounded-3xl p-6 sm:p-8 border border-[rgba(99,102,241,0.2)] space-y-6">
          <div className="flex items-center justify-between border-b border-[rgba(99,102,241,0.15)] pb-4">
            <div>
              <h2 className="text-xl font-heading font-bold text-white">Live Customer Orders Stream</h2>
              <p className="text-xs text-[#8888aa]">Real-time orders received from table QR scans & online ordering</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Live Sync Active
            </span>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="glass-light p-5 rounded-2xl border border-[rgba(99,102,241,0.2)] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold text-xs">{order.tableNo}</span>
                    <span className="font-mono text-xs text-white font-bold">{order.id}</span>
                    <span className="text-[11px] text-[#8888aa] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> {order.time}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-200">{order.items}</p>
                </div>

                <div className="flex items-center gap-4 justify-between md:justify-end border-t md:border-t-0 border-[rgba(99,102,241,0.1)] pt-3 md:pt-0">
                  <div className="text-left md:text-right">
                    <span className="text-base font-extrabold text-indigo-300">₹{order.total}</span>
                    <span className={`block text-[10px] font-bold ${
                      order.status === "NEW" ? "text-rose-400 animate-pulse" :
                      order.status === "PREPARING" ? "text-amber-400" :
                      order.status === "READY" ? "text-emerald-400" : "text-slate-400"
                    }`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {order.status === "NEW" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "PREPARING")}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/30 transition-all"
                      >
                        Accept & Cook
                      </button>
                    )}
                    {order.status === "PREPARING" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "READY")}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-500/30 transition-all"
                      >
                        Mark Ready
                      </button>
                    )}
                    {order.status === "READY" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "SERVED")}
                        className="px-3 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold hover:bg-indigo-500/30 transition-all"
                      >
                        Complete Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: POS & SOUNDBOX TERMINAL */}
      {activeTab === "pos" && (
        <div className="glass rounded-3xl p-6 sm:p-8 border border-[rgba(99,102,241,0.2)] space-y-6">
          <div className="flex items-center justify-between border-b border-[rgba(99,102,241,0.15)] pb-4">
            <div>
              <h2 className="text-xl font-heading font-bold text-white">Razorpay POS / Ezetap Terminal</h2>
              <p className="text-xs text-[#8888aa]">Connected POS Soundbox device configuration & quick terminal triggers</p>
            </div>
            <Link
              href="/checkout/pos"
              className="btn-shimmer px-5 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              <CreditCard className="w-4 h-4" /> Open POS Terminal UI
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-light p-6 rounded-2xl border border-indigo-500/20 space-y-4">
              <h3 className="font-heading font-bold text-white text-base flex items-center gap-2">
                <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
                Active Device Info
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[#8888aa]">Device ID / Soundbox Serial:</span>
                  <span className="font-mono font-bold text-white">5B006033</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[#8888aa]">Bridge Gateway:</span>
                  <span className="text-emerald-400 font-medium">Ezetap POS API 3.0</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[#8888aa]">Base URL:</span>
                  <span className="font-mono text-indigo-300">https://demo.ezetap.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8888aa]">Supported Payment Modes:</span>
                  <span className="text-slate-200 font-semibold">UPI, CARD, QR, CASH, CHEQUE</span>
                </div>
              </div>
            </div>

            <div className="glass-light p-6 rounded-2xl border border-indigo-500/20 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-white text-base mb-2">Quick Payment Trigger</h3>
                <p className="text-xs text-[#8888aa]">Initiate instant payment on Soundbox device `5B006033`</p>
              </div>

              <Link
                href="/checkout/pos"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Zap className="w-4 h-4" /> Collect Payment on POS Device
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW DISH MODAL */}
      {showAddDishModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass border border-[rgba(99,102,241,0.3)] rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[rgba(99,102,241,0.15)] pb-3">
              <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
                <Utensils className="w-4 h-4 text-indigo-400" />
                Add New Dish to Menu
              </h3>
              <button onClick={() => setShowAddDishModal(false)} className="text-[#8888aa] hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddDish} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#ccccdd] mb-1">Dish Name</label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g. Kadai Paneer"
                  className="w-full px-4 py-2.5 rounded-xl glass-light text-white text-xs border border-[rgba(99,102,241,0.2)] focus:border-indigo-500/80 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#ccccdd] mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    placeholder="250"
                    className="w-full px-4 py-2.5 rounded-xl glass-light text-white text-xs border border-[rgba(99,102,241,0.2)] focus:border-indigo-500/80 focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#ccccdd] mb-1">Category</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl glass-light text-white text-xs border border-[rgba(99,102,241,0.2)] focus:border-indigo-500/80 focus:outline-none bg-slate-900"
                  >
                    <option value="Main Course">Main Course</option>
                    <option value="Starters">Starters</option>
                    <option value="Breads">Breads</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#ccccdd] mb-1">Dietary Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewItemIsVeg(true)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      newItemIsVeg ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" : "glass-light border-white/5 text-[#8888aa]"
                    }`}
                  >
                    🟢 Pure Veg
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewItemIsVeg(false)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      !newItemIsVeg ? "bg-red-500/20 text-red-300 border-red-500/40" : "glass-light border-white/5 text-[#8888aa]"
                    }`}
                  >
                    🔴 Non-Veg
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#ccccdd] mb-1">Short Description</label>
                <textarea
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  placeholder="Ingredients, spice level..."
                  rows={2}
                  className="w-full p-3 rounded-xl glass-light text-white text-xs border border-[rgba(99,102,241,0.2)] focus:border-indigo-500/80 focus:outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddDishModal(false)}
                  className="flex-1 py-2.5 rounded-xl glass-light text-[#8888aa] text-xs font-semibold hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-shimmer py-2.5 rounded-xl text-white text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Save Dish
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
