'use client'

import Link from 'next/link'
import { Sparkles, ArrowLeft, Search, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const integrations = [
  { name: 'Odoo', category: 'ERP', desc: 'Full ERP integration for invoicing, inventory, and accounting', popular: true },
  { name: 'QuickBooks', category: 'Accounting', desc: 'Sync invoices, payments, and financial data', popular: true },
  { name: 'Salesforce', category: 'CRM', desc: 'Bi-directional sync for contacts, deals, and activities', popular: true },
  { name: 'HubSpot', category: 'CRM', desc: 'Marketing automation and CRM integration', popular: true },
  { name: 'Slack', category: 'Communication', desc: 'Real-time notifications and team updates', popular: true },
  { name: 'Google Workspace', category: 'Productivity', desc: 'Gmail, Calendar, and Drive integration', popular: true },
  { name: 'Microsoft 365', category: 'Productivity', desc: 'Outlook, Teams, and SharePoint sync', popular: false },
  { name: 'Shopify', category: 'E-Commerce', desc: 'Order sync, inventory management, fulfillment', popular: true },
  { name: 'WooCommerce', category: 'E-Commerce', desc: 'WordPress e-commerce integration', popular: false },
  { name: 'Amazon Seller', category: 'E-Commerce', desc: 'FBA inventory and order management', popular: false },
  { name: 'Stripe', category: 'Payments', desc: 'Payment processing and subscription billing', popular: true },
  { name: 'Twilio', category: 'Communication', desc: 'SMS and voice call integration', popular: false },
  { name: 'Zapier', category: 'Automation', desc: 'Connect to 5,000+ apps', popular: true },
  { name: 'Make', category: 'Automation', desc: 'Advanced workflow automation', popular: false },
  { name: 'Xero', category: 'Accounting', desc: 'Cloud accounting integration', popular: false },
  { name: 'NetSuite', category: 'ERP', desc: 'Enterprise ERP integration', popular: false },
  { name: 'SAP', category: 'ERP', desc: 'Enterprise resource planning', popular: false },
  { name: 'Mailchimp', category: 'Marketing', desc: 'Email marketing campaigns', popular: true },
  { name: 'SendGrid', category: 'Communication', desc: 'Transactional email delivery', popular: false },
  { name: 'Intercom', category: 'Support', desc: 'Customer messaging platform', popular: false },
  { name: 'Zendesk', category: 'Support', desc: 'Help desk and ticketing', popular: true },
  { name: 'Freshdesk', category: 'Support', desc: 'Customer support software', popular: false },
  { name: 'Google Ads', category: 'Marketing', desc: 'PPC campaign management', popular: true },
  { name: 'Meta Ads', category: 'Marketing', desc: 'Facebook & Instagram advertising', popular: true },
]

const categories = ['All', 'ERP', 'CRM', 'Accounting', 'E-Commerce', 'Marketing', 'Communication', 'Support', 'Automation', 'Payments', 'Productivity']

export default function IntegrationsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = integrations.filter(i => 
    (category === 'All' || i.category === category) &&
    (i.name.toLowerCase().includes(search.toLowerCase()) || i.desc.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <nav className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">WoulfAI</span>
              </Link>
            </div>
            <Link href="/contact" className="bg-white text-black px-5 py-2.5 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Request Integration
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Integrations</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Connect WoulfAI with your existing tools. 200+ integrations available.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search integrations..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  category === cat ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((integration, i) => (
            <div key={i} className="p-6 bg-white/[0.02] border border-white/10 rounded-xl hover:border-blue-500/50 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center font-bold text-lg">
                  {integration.name.charAt(0)}
                </div>
                {integration.popular && (
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">Popular</span>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-1 group-hover:text-blue-400 transition-colors">{integration.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{integration.category}</p>
              <p className="text-gray-400">{integration.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Integration?</h2>
          <p className="text-gray-400 mb-6">
            Our team can build custom integrations for your specific needs.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          © 2026 WoulfAI. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
