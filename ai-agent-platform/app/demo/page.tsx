'use client'

import Link from 'next/link'
import { 
  Sparkles, Package, TrendingUp, DollarSign, Megaphone, 
  Headphones, FileText, GraduationCap, ArrowLeft, ArrowRight,
  Warehouse
} from 'lucide-react'

const agents = [
  { 
    name: 'WMS Agent', 
    subtitle: 'Warehouse Management & Billing',
    description: 'AI-powered warehouse operations with automated proof-of-delivery, billing calculations, and real-time inventory tracking.', 
    icon: Package, 
    href: '/demo/wms-proof-billing', 
    gradient: 'from-blue-500 to-cyan-400',
    features: ['Photo Verification', 'Auto-Billing', 'Inventory Tracking', 'BOL Processing']
  },
  { 
    name: 'Sales Agent', 
    subtitle: 'Field Sales & CRM Integration',
    description: 'Field sales companion with AI-powered pre-call research, lead scoring, CRM sync, and real-time coaching.', 
    icon: TrendingUp, 
    href: '/demo/sales-field', 
    gradient: 'from-emerald-500 to-teal-400',
    features: ['Pre-Call Intel', 'Lead Scoring', 'CRM Sync', 'Call Coaching']
  },
  { 
    name: 'CFO Agent', 
    subtitle: 'Financial Operations & Cash Flow',
    description: '13-week rolling cash forecasts, AR/AP automation, bank reconciliation, and financial scenario modeling.', 
    icon: DollarSign, 
    href: '/demo/finance-ops', 
    gradient: 'from-amber-500 to-orange-400',
    features: ['Cash Forecasting', 'AR Collections', 'AP Automation', 'Reconciliation']
  },
  { 
    name: 'Marketing Agent', 
    subtitle: 'Campaign & Content Automation',
    description: 'Multi-channel campaign management, A/B testing, content generation, and brand consistency across platforms.', 
    icon: Megaphone, 
    href: '/demo/marketing', 
    gradient: 'from-pink-500 to-rose-400',
    features: ['Campaign Builder', 'A/B Testing', 'Content Gen', 'Analytics']
  },
  { 
    name: 'Support Agent', 
    subtitle: 'Customer Service & Ticketing',
    description: 'AI phone routing, live chat with knowledge base, ticket management, and customer satisfaction tracking.', 
    icon: Headphones, 
    href: '/demo/customer-support', 
    gradient: 'from-violet-500 to-purple-400',
    features: ['Phone Routing', 'Live Chat', 'Ticket System', 'CSAT Tracking']
  },
  { 
    name: 'Research Agent', 
    subtitle: 'Company Intelligence & Analysis',
    description: 'Deep company research, competitive intelligence, market analysis, and AI-generated sales talking points.', 
    icon: FileText, 
    href: '/demo/research-intel', 
    gradient: 'from-indigo-500 to-blue-400',
    features: ['Company Intel', 'Competitor Analysis', 'Pain Points', 'Talking Points']
  },
  { 
    name: 'Training Agent', 
    subtitle: 'Staff Certification & Onboarding',
    description: 'Employee training management, course creation, certification tracking, and compliance reporting.', 
    icon: GraduationCap, 
    href: '/demo/training', 
    gradient: 'from-orange-500 to-amber-400',
    features: ['Course Builder', 'Certifications', 'Progress Tracking', 'Compliance']
  },
  { 
    name: 'Customer Portal', 
    subtitle: '3PL Client Self-Service',
    description: 'White-label customer portal for inventory visibility, order management, shipment tracking, and billing.', 
    icon: Warehouse, 
    href: '/portal', 
    gradient: 'from-sky-500 to-blue-400',
    features: ['Inventory View', 'Order Management', 'Shipment Tracking', 'Invoices']
  },
]

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
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
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16 relative">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Agent Demos</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our complete suite of AI agents. Each demo is fully interactive with real functionality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {agents.map((agent, i) => (
            <Link
              key={i}
              href={agent.href}
              className="group p-8 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-white/20 transition-all"
            >
              <div className="flex items-start gap-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center flex-shrink-0`}>
                  <agent.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                    {agent.name}
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h2>
                  <p className="text-sm text-gray-500 mb-3">{agent.subtitle}</p>
                  <p className="text-gray-400 mb-4">{agent.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {agent.features.map((feature, j) => (
                      <span key={j} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Deploy?</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Start with a 14-day free trial. Our team will help you configure the perfect AI workforce for your business.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/contact" className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Start Free Trial
            </Link>
            <Link href="/pricing" className="border border-white/20 px-8 py-3 rounded-full font-medium hover:bg-white/5 transition-colors">
              View Pricing
            </Link>
          </div>
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
