'use client'

import Link from 'next/link'
import { Sparkles, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react'
import { useState } from 'react'

const plans = [
  {
    name: 'Starter',
    price: 499,
    description: 'Perfect for small teams getting started with AI automation',
    features: [
      '1 AI Agent',
      'Up to 5 users',
      '1,000 tasks/month',
      'Email support',
      'Basic integrations',
      'Standard analytics',
    ],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    name: 'Professional',
    price: 1499,
    description: 'For growing businesses that need multiple agents',
    features: [
      'Up to 5 AI Agents',
      'Up to 25 users',
      '10,000 tasks/month',
      'Priority support',
      'Advanced integrations',
      'Custom workflows',
      'API access',
      'Team analytics',
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: null,
    description: 'Custom solutions for large organizations',
    features: [
      'Unlimited AI Agents',
      'Unlimited users',
      'Unlimited tasks',
      '24/7 dedicated support',
      'Custom integrations',
      'Custom AI training',
      'SLA guarantee',
      'Dedicated CSM',
      'On-premise option',
    ],
    cta: 'Contact Sales',
    popular: false
  }
]

const faqs = [
  { q: 'What counts as a task?', a: 'A task is any action an AI agent performs: generating content, processing a document, making an API call, or responding to a query.' },
  { q: 'Can I change plans later?', a: 'Yes! You can upgrade or downgrade at any time. Changes take effect on your next billing cycle.' },
  { q: 'Do you offer annual billing?', a: 'Yes, annual billing gives you 2 months free (save 17%). Contact us for annual pricing.' },
  { q: 'What integrations are included?', a: 'All plans include Odoo, QuickBooks, Google Workspace, and Slack. Professional adds Salesforce, HubSpot, and more. Enterprise includes custom integrations.' },
  { q: 'Is there a free trial?', a: 'Yes! All paid plans include a 14-day free trial. No credit card required to start.' },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">WoulfAI</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/solutions" className="text-gray-400 hover:text-white transition-colors">Solutions</Link>
              <Link href="/pricing" className="text-white font-medium">Pricing</Link>
              <Link href="/case-studies" className="text-gray-400 hover:text-white transition-colors">Case Studies</Link>
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
            </div>
            <Link href="/contact" className="bg-white text-black px-5 py-2.5 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Start free. Scale as you grow. No hidden fees.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 bg-white/5 rounded-full">
            <button 
              onClick={() => setAnnual(false)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${!annual ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setAnnual(true)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${annual ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
            >
              Annual <span className="text-emerald-400 text-sm ml-1">Save 17%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`relative p-8 rounded-2xl border transition-all ${
                  plan.popular 
                    ? 'bg-gradient-to-b from-blue-500/10 to-purple-500/10 border-blue-500/50' 
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  {plan.price ? (
                    <>
                      <span className="text-5xl font-bold">${annual ? Math.round(plan.price * 0.83) : plan.price}</span>
                      <span className="text-gray-400">/month</span>
                      {annual && <div className="text-sm text-gray-500">Billed annually</div>}
                    </>
                  ) : (
                    <span className="text-4xl font-bold">Custom</span>
                  )}
                </div>

                <Link 
                  href={plan.price ? '/demo/marketing' : '/contact'} 
                  className={`block w-full py-3 rounded-full font-medium text-center transition-colors mb-8 ${
                    plan.popular 
                      ? 'bg-white text-black hover:bg-gray-100' 
                      : 'border border-white/20 hover:bg-white/5'
                  }`}
                >
                  {plan.cta}
                </Link>

                <ul className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-400" />
                  {faq.q}
                </h3>
                <p className="text-gray-400 pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 rounded-3xl">
            <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-400 mb-8">
              Our team is here to help you find the right plan for your business.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Talk to Sales <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          © 2026 WoulfAI. All rights reserved. | 
          <Link href="/privacy" className="hover:text-white ml-2">Privacy</Link> | 
          <Link href="/terms" className="hover:text-white ml-2">Terms</Link>
        </div>
      </footer>
    </div>
  )
}
