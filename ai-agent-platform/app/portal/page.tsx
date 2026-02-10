'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, Package, Search, ShoppingCart, Truck, FileText, Download, 
  Plus, Minus, X, Check, AlertTriangle, Calendar, Scale, Box, Layers, 
  Hash, MapPin, Clock, Eye, ChevronRight, Filter, RefreshCw,
  BarChart3, TrendingUp, DollarSign, Warehouse, ClipboardList,
  Bell, Settings, LogOut, User, HelpCircle, ExternalLink
} from 'lucide-react'

const inventoryData = [
  { id: 1, sku: 'PRD-001', name: 'Organic Protein Powder - Vanilla', lotNumber: 'LOT-2026-001', expiration: '2026-08-15', pallets: 24, cases: 576, units: 6912, weight: 4320, location: 'A-12-3', hazmat: false, status: 'available' },
  { id: 2, sku: 'PRD-002', name: 'Organic Protein Powder - Chocolate', lotNumber: 'LOT-2026-002', expiration: '2026-08-20', pallets: 18, cases: 432, units: 5184, weight: 3240, location: 'A-12-4', hazmat: false, status: 'available' },
  { id: 3, sku: 'PRD-003', name: 'Pre-Workout Formula - Berry', lotNumber: 'LOT-2026-003', expiration: '2026-06-10', pallets: 12, cases: 288, units: 3456, weight: 1728, location: 'B-05-2', hazmat: false, status: 'low' },
  { id: 4, sku: 'PRD-004', name: 'Industrial Cleaner - Concentrate', lotNumber: 'LOT-2026-004', expiration: '2027-01-01', pallets: 8, cases: 192, units: 768, weight: 2304, location: 'H-01-1', hazmat: true, status: 'available' },
  { id: 5, sku: 'PRD-005', name: 'Vitamin D3 Supplements', lotNumber: 'LOT-2026-005', expiration: '2026-12-31', pallets: 6, cases: 144, units: 8640, weight: 432, location: 'C-08-1', hazmat: false, status: 'available' },
  { id: 6, sku: 'PRD-006', name: 'Collagen Peptides', lotNumber: 'LOT-2026-006', expiration: '2026-09-15', pallets: 15, cases: 360, units: 4320, weight: 2160, location: 'A-15-2', hazmat: false, status: 'reserved' },
]

const shipmentsData = [
  { id: 'SHP-2026-0156', type: 'Outbound', destination: 'Amazon FBA - Phoenix', status: 'in-transit', items: 12, pallets: 4, carrier: 'FedEx Freight', eta: '2026-02-11', tracking: '794644790306' },
  { id: 'SHP-2026-0155', type: 'Outbound', destination: 'Walmart DC - Dallas', status: 'delivered', items: 24, pallets: 8, carrier: 'XPO Logistics', eta: '2026-02-08', tracking: 'XPO789456123' },
  { id: 'SHP-2026-0154', type: 'Inbound', origin: 'Manufacturer - China', status: 'receiving', items: 48, pallets: 16, carrier: 'Ocean Freight', eta: '2026-02-09', tracking: 'MAEU123456789' },
  { id: 'SHP-2026-0153', type: 'Outbound', destination: 'Direct to Consumer - Various', status: 'processing', items: 156, pallets: 2, carrier: 'UPS', eta: '2026-02-10', tracking: 'Multiple' },
]

const ordersData = [
  { id: 'ORD-2026-0089', date: '2026-02-09', status: 'processing', items: 3, total: 2450.00, type: 'Outbound' },
  { id: 'ORD-2026-0088', date: '2026-02-08', status: 'shipped', items: 5, total: 8920.00, type: 'Outbound' },
  { id: 'ORD-2026-0087', date: '2026-02-07', status: 'delivered', items: 2, total: 1200.00, type: 'Outbound' },
  { id: 'ORD-2026-0086', date: '2026-02-06', status: 'delivered', items: 8, total: 15600.00, type: 'Outbound' },
]

const invoicesData = [
  { id: 'INV-2026-02', period: 'February 2026', status: 'pending', storage: 2850, handling: 1240, shipping: 890, total: 4980, dueDate: '2026-03-01' },
  { id: 'INV-2026-01', period: 'January 2026', status: 'paid', storage: 2650, handling: 980, shipping: 1120, total: 4750, dueDate: '2026-02-01', paidDate: '2026-01-28' },
  { id: 'INV-2025-12', period: 'December 2025', status: 'paid', storage: 2450, handling: 1100, shipping: 950, total: 4500, dueDate: '2026-01-01', paidDate: '2025-12-29' },
]

interface CartItem {
  product: typeof inventoryData[0]
  quantity: number
  quantityType: 'pallets' | 'cases' | 'units'
}

export default function CustomerPortalPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<typeof inventoryData[0] | null>(null)
  const [quantityType, setQuantityType] = useState<'pallets' | 'cases' | 'units'>('cases')
  const [quantity, setQuantity] = useState(1)

  const addToCart = () => {
    if (!selectedProduct) return
    const existing = cart.find(item => item.product.id === selectedProduct.id && item.quantityType === quantityType)
    if (existing) {
      setCart(cart.map(item => 
        item.product.id === selectedProduct.id && item.quantityType === quantityType
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ))
    } else {
      setCart([...cart, { product: selectedProduct, quantity, quantityType }])
    }
    setSelectedProduct(null)
    setQuantity(1)
  }

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'orders', label: 'Orders', icon: ClipboardList },
    { id: 'shipments', label: 'Shipments', icon: Truck },
    { id: 'billing', label: 'Billing', icon: DollarSign },
  ]

  const stats = [
    { label: 'Total SKUs', value: '6', icon: Package, change: '+2 this month' },
    { label: 'Pallets Stored', value: '83', icon: Layers, change: '+12 from last week' },
    { label: 'Pending Orders', value: '2', icon: ClipboardList, change: '1 processing' },
    { label: 'In-Transit', value: '1', icon: Truck, change: 'ETA: Tomorrow' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/demo" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Warehouse className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Customer Portal</h1>
                  <p className="text-xs text-gray-400">Acme Supplements Inc.</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowCart(true)}
                className="relative p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 rounded-full text-xs flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
              <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">2</span>
              </button>
              <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 pl-3 border-l border-white/10">
                <div className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm">John Smith</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-indigo-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                  <div className="text-xs text-emerald-400 mt-2">{stat.change}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Shipments */}
              <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Recent Shipments</h3>
                  <button onClick={() => setActiveTab('shipments')} className="text-sm text-indigo-400 hover:text-indigo-300">View All</button>
                </div>
                <div className="space-y-3">
                  {shipmentsData.slice(0, 3).map((shipment) => (
                    <div key={shipment.id} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          shipment.type === 'Inbound' ? 'bg-blue-500/20' : 'bg-emerald-500/20'
                        }`}>
                          <Truck className={`w-5 h-5 ${shipment.type === 'Inbound' ? 'text-blue-400' : 'text-emerald-400'}`} />
                        </div>
                        <div>
                          <div className="font-medium">{shipment.id}</div>
                          <div className="text-sm text-gray-400">{shipment.destination || shipment.origin}</div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        shipment.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                        shipment.status === 'in-transit' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {shipment.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low Stock Alerts */}
              <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    Inventory Alerts
                  </h3>
                </div>
                <div className="space-y-3">
                  {inventoryData.filter(p => p.status === 'low' || new Date(p.expiration) < new Date('2026-07-01')).map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-amber-400">
                          {product.status === 'low' ? `Low stock: ${product.cases} cases remaining` : `Expires: ${product.expiration}`}
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 rounded text-sm text-amber-400 transition-colors">
                        Reorder
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Invoices */}
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent Invoices</h3>
                <button onClick={() => setActiveTab('billing')} className="text-sm text-indigo-400 hover:text-indigo-300">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-400 border-b border-white/10">
                      <th className="pb-3">Invoice</th>
                      <th className="pb-3">Period</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoicesData.slice(0, 2).map((invoice) => (
                      <tr key={invoice.id} className="border-b border-white/5">
                        <td className="py-3 font-medium">{invoice.id}</td>
                        <td className="py-3 text-gray-400">{invoice.period}</td>
                        <td className="py-3">${invoice.total.toLocaleString()}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            invoice.status === 'paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <button className="text-indigo-400 hover:text-indigo-300">
                            <Download className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by SKU, name, or lot number..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10">
                <Filter className="w-5 h-5" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10">
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 font-medium text-gray-400">Product</th>
                    <th className="text-left p-4 font-medium text-gray-400">SKU</th>
                    <th className="text-left p-4 font-medium text-gray-400">Lot #</th>
                    <th className="text-left p-4 font-medium text-gray-400">Location</th>
                    <th className="text-left p-4 font-medium text-gray-400">Quantity</th>
                    <th className="text-left p-4 font-medium text-gray-400">Expiration</th>
                    <th className="text-left p-4 font-medium text-gray-400">Status</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.filter(p => 
                    p.name.toLowerCase().includes(search.toLowerCase()) ||
                    p.sku.toLowerCase().includes(search.toLowerCase())
                  ).map((product) => (
                    <tr key={product.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="font-medium">{product.name}</div>
                          {product.hazmat && (
                            <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded">HAZMAT</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-gray-400 font-mono text-sm">{product.sku}</td>
                      <td className="p-4 text-gray-400 font-mono text-sm">{product.lotNumber}</td>
                      <td className="p-4 text-gray-400">{product.location}</td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div>{product.pallets} pallets</div>
                          <div className="text-gray-500">{product.cases} cases / {product.units.toLocaleString()} units</div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-400">{product.expiration}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          product.status === 'available' ? 'bg-emerald-500/20 text-emerald-400' :
                          product.status === 'low' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => setSelectedProduct(product)}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded text-sm transition-colors"
                        >
                          Order
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Order History</h2>
              <button 
                onClick={() => setShowCart(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Order
              </button>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 font-medium text-gray-400">Order ID</th>
                    <th className="text-left p-4 font-medium text-gray-400">Date</th>
                    <th className="text-left p-4 font-medium text-gray-400">Items</th>
                    <th className="text-left p-4 font-medium text-gray-400">Total</th>
                    <th className="text-left p-4 font-medium text-gray-400">Status</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {ordersData.map((order) => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="p-4 font-medium">{order.id}</td>
                      <td className="p-4 text-gray-400">{order.date}</td>
                      <td className="p-4 text-gray-400">{order.items} items</td>
                      <td className="p-4">${order.total.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                          order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button className="text-indigo-400 hover:text-indigo-300">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Shipments Tab */}
        {activeTab === 'shipments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Shipment Tracking</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>

            <div className="grid gap-4">
              {shipmentsData.map((shipment) => (
                <div key={shipment.id} className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        shipment.type === 'Inbound' ? 'bg-blue-500/20' : 'bg-emerald-500/20'
                      }`}>
                        <Truck className={`w-6 h-6 ${shipment.type === 'Inbound' ? 'text-blue-400' : 'text-emerald-400'}`} />
                      </div>
                      <div>
                        <div className="font-bold text-lg">{shipment.id}</div>
                        <div className="text-gray-400">{shipment.type}: {shipment.destination || shipment.origin}</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      shipment.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                      shipment.status === 'in-transit' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {shipment.status}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Carrier</div>
                      <div className="font-medium">{shipment.carrier}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Items</div>
                      <div className="font-medium">{shipment.items} items ({shipment.pallets} pallets)</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">ETA</div>
                      <div className="font-medium">{shipment.eta}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Tracking</div>
                      <div className="font-medium text-indigo-400">{shipment.tracking}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Track Package
                    </button>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      BOL
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Billing & Invoices</h2>
            </div>

            <div className="grid gap-4">
              {invoicesData.map((invoice) => (
                <div key={invoice.id} className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-bold text-lg">{invoice.id}</div>
                      <div className="text-gray-400">{invoice.period}</div>
                    </div>
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      invoice.status === 'paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {invoice.status}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Storage</div>
                      <div className="font-medium">${invoice.storage.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Handling</div>
                      <div className="font-medium">${invoice.handling.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Shipping</div>
                      <div className="font-medium">${invoice.shipping.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Total</div>
                      <div className="font-bold text-lg">${invoice.total.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                    {invoice.status === 'pending' && (
                      <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors">
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Order Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
          <div className="w-full max-w-md p-6 bg-[#1a1a24] border border-white/10 rounded-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Order Product</h3>
            <div className="mb-4">
              <div className="font-medium">{selectedProduct.name}</div>
              <div className="text-sm text-gray-400">{selectedProduct.sku} • {selectedProduct.lotNumber}</div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Quantity Type</label>
              <div className="grid grid-cols-3 gap-2">
                {(['pallets', 'cases', 'units'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setQuantityType(type)}
                    className={`py-2 rounded-lg text-sm capitalize transition-colors ${
                      quantityType === type ? 'bg-indigo-600' : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 bg-white/5 rounded-lg hover:bg-white/10">
                  <Minus className="w-5 h-5" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center py-2 bg-white/5 border border-white/10 rounded-lg"
                />
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 bg-white/5 rounded-lg hover:bg-white/10">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="text-sm text-gray-400 mt-2">
                Available: {selectedProduct[quantityType]} {quantityType}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => setSelectedProduct(null)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={addToCart} className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm" onClick={() => setShowCart(false)}>
          <div className="w-full max-w-md bg-[#1a1a24] border-l border-white/10 h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Shopping Cart</h3>
                <button onClick={() => setShowCart(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Your cart is empty</p>
                  <button onClick={() => { setShowCart(false); setActiveTab('inventory') }} className="mt-4 text-indigo-400 hover:text-indigo-300">
                    Browse Inventory
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item, i) => (
                      <div key={i} className="flex items-start justify-between p-4 bg-white/[0.02] rounded-lg">
                        <div>
                          <div className="font-medium">{item.product.name}</div>
                          <div className="text-sm text-gray-400">{item.quantity} {item.quantityType}</div>
                        </div>
                        <button onClick={() => removeFromCart(i)} className="p-1 hover:bg-white/10 rounded transition-colors">
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={() => { 
                        alert('Order submitted successfully! You will receive a confirmation email shortly.'); 
                        setCart([]); 
                        setShowCart(false); 
                      }} 
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors"
                    >
                      Submit Order
                    </button>
                    <button onClick={() => setCart([])} className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
