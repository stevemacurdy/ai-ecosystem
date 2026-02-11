'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { 
  Package, TrendingUp, DollarSign, FileText, GraduationCap, Megaphone, 
  Headphones, Users, ArrowRight, Sparkles, Shield, Zap, CheckCircle2,
  Play, ChevronRight, Star, BarChart3, Clock, Globe, Cpu, Lock,
  ArrowUpRight, Menu, X
} from 'lucide-react'

const agents = [
  { name: 'WMS Agent', description: 'AI-powered warehouse management with automated billing, photo verification, and real-time inventory', icon: Package, href: '/demo/wms-proof-billing', gradient: 'from-blue-500 to-cyan-400' },
  { name: 'Sales Agent', description: 'Field sales companion with CRM integration, pre-call intelligence, and AI coaching', icon: TrendingUp, href: '/demo/sales-field', gradient: 'from-emerald-500 to-teal-400' },
  { name: 'CFO Agent', description: '13-week cash forecasting, AR/AP automation, and complete financial visibility', icon: DollarSign, href: '/demo/finance-ops', gradient: 'from-amber-500 to-orange-400' },
  { name: 'Marketing Agent', description: 'Campaign automation, A/B testing, content generation, and brand management', icon: Megaphone, href: '/demo/marketing', gradient: 'from-pink-500 to-rose-400' },
  { name: 'Support Agent', description: 'AI phone routing, live chat, product knowledge base, and ticket management', icon: Headphones, href: '/demo/customer-support', gradient: 'from-violet-500 to-purple-400' },
  { name: 'Research Agent', description: 'Company intelligence, competitor analysis, and market research automation', icon: FileText, href: '/demo/research-intel', gradient: 'from-indigo-500 to-blue-400' },
  { name: 'Training Agent', description: 'Employee training, certification tracking, and compliance management with AI-generated courses', icon: GraduationCap, href: '/demo/training', gradient: 'from-cyan-500 to-blue-400' },
]

const stats = [
  { value: '500+', label: 'Companies Automated' },
  { value: '2.4M', label: 'Tasks Completed Daily' },
  { value: '99.9%', label: 'Uptime Guaranteed' },
  { value: '< 2s', label: 'Average Response Time' },
]

const testimonials = [
  { quote: "Cut our billing time from 8 hours to 15 minutes. The WMS Agent paid for itself in the first week.", name: "Sarah Chen", role: "Operations Director", company: "Pacific Logistics" },
  { quote: "The Sales Agent increased our close rate by 34%. It's like having a sales coach on every call.", name: "Marcus Thompson", role: "VP Sales", company: "TechFlow Solutions" },
  { quote: "Finally, a CFO tool that actually understands cash flow. We avoided a crisis we didn't see coming.", name: "Jennifer Walsh", role: "CFO", company: "GrowthStack Inc" },
]

const features = [
  { icon: Cpu, title: 'Purpose-Built AI', description: 'Not generic chatbots. Each agent is trained on industry-specific workflows and best practices.' },
  { icon: Lock, title: 'Enterprise Security', description: 'SOC 2 Type II certified. Your data is encrypted at rest and in transit. GDPR compliant.' },
  { icon: Globe, title: 'Seamless Integrations', description: 'Connect to Odoo, QuickBooks, Salesforce, HubSpot, and 200+ other business tools.' },
  { icon: Clock, title: '24/7 Operations', description: 'AI agents work around the clock. No breaks, no sick days, no timezone issues.' },
  { icon: BarChart3, title: 'Real-Time Analytics', description: 'Live dashboards show exactly what your agents are doing and the ROI they generate.' },
  { icon: Zap, title: 'Instant Deployment', description: 'Go live in days, not months. Pre-built agents that work out of the box.' },
]

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <img src="/images/woulf-logo.png" alt="Woulf" className="w-10 h-10 rounded-xl" />
              <span className="text-xl font-bold tracking-tight">WoulfAI</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/solutions" className="text-gray-400 hover:text-white transition-colors">Solutions</Link>
              <Link href="/demo" className="text-gray-400 hover:text-white transition-colors">Demos</Link>
              <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link>
              <Link href="/case-studies" className="text-gray-400 hover:text-white transition-colors">Case Studies</Link>
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link href="/demo" className="text-gray-400 hover:text-white transition-colors">Try Demo</Link>
              <Link href="/login" className="px-4 py-2 border border-white/20 rounded-full text-white hover:bg-white/10 transition-colors">Sign In</Link>
              <Link href="/contact" className="bg-white text-black px-5 py-2.5 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Get Started
              </Link>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a0a0f] border-t border-white/5 py-6 px-6">
            <div className="flex flex-col gap-4">
              <Link href="/solutions" className="text-lg">Solutions</Link>
              <Link href="/demo" className="text-lg">Demos</Link>
              <Link href="/pricing" className="text-lg">Pricing</Link>
              <Link href="/case-studies" className="text-lg">Case Studies</Link>
              <Link href="/about" className="text-lg">About</Link>
              <Link href="/login" className="text-lg text-blue-400 font-medium">Sign In →</Link>
              <Link href="/contact" className="bg-white text-black px-5 py-3 rounded-full font-medium text-center mt-4">Get Started</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-gray-300">Now with GPT-4 Turbo Integration</span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8">
              AI Employees That
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Actually Work
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mb-10">
              Deploy intelligent agents that handle your operations 24/7. From warehouse management to sales calls, 
              our AI employees integrate seamlessly with your existing workflows.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mb-16">
              <Link href="/contact" className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/demo" className="group inline-flex items-center gap-3 border border-white/20 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/5 transition-all">
                <Play className="w-5 h-5" />
                Explore Demos
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-white/10">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm text-gray-500 uppercase tracking-wider mb-8">Trusted by innovative companies</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
            {['Pacific Logistics', 'TechFlow', 'GrowthStack', 'Meridian Corp', 'Atlas Industries', 'Vertex Solutions'].map((company, i) => (
              <div key={i} className="text-xl font-semibold text-gray-400">{company}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Showcase */}
      <section id="agents" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Your AI Workforce</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Each agent is purpose-built for specific business functions. Deploy one or all—they work together seamlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, i) => (
              <Link key={i} href={agent.href} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10" 
                     style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
                <div className="h-full p-8 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <agent.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    {agent.name}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{agent.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12 flex flex-wrap justify-center gap-6">
            <Link href="/demo" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Try All Demos <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/solutions" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
              View Solutions <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built for Enterprise</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to deploy AI at scale, with the security and reliability your business demands.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="p-6">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Operations Teams</h2>
            <p className="text-gray-400 text-lg">Real results from real businesses</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="p-8 bg-white/[0.03] border border-white/10 rounded-2xl">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-lg leading-relaxed mb-6">&quot;{testimonial.quote}&quot;</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 rounded-3xl">
            <h2 className="text-4xl font-bold mb-4">Ready to Deploy Your AI Workforce?</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Start with a 14-day free trial. No credit card required. See results in your first week.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
                Start Free Trial
              </Link>
              <Link href="/pricing" className="border border-white/20 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/5 transition-colors">
                View Pricing
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              <CheckCircle2 className="w-4 h-4 inline mr-1" />
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">WoulfAI</span>
              </Link>
              <p className="text-gray-400 max-w-sm">
                AI-powered business operations. Deploy intelligent agents that work 24/7 to automate your workflows.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="flex flex-col gap-3 text-gray-400">
                <Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link>
                <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                <Link href="/demo" className="hover:text-white transition-colors">Demos</Link>
                <Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="flex flex-col gap-3 text-gray-400">
                <Link href="/about" className="hover:text-white transition-colors">About</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                <Link href="/portal" className="hover:text-white transition-colors">Customer Portal</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="flex flex-col gap-3 text-gray-400">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                <Link href="/security" className="hover:text-white transition-colors">Security</Link>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© 2026 WoulfAI. All rights reserved.</p>
            <div className="flex items-center gap-6 text-gray-500 text-sm">
              <span>solutions@woulfgroup.com</span>
              <span>(801) 688-1745</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
