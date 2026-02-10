'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Sparkles, Package, TrendingUp, DollarSign, Megaphone, Headphones, 
  FileText, GraduationCap, LogOut, Settings, Users, Shield, Crown,
  ChevronRight, Loader2, Lock, ExternalLink, Download
} from 'lucide-react'
import { supabase, getCurrentUser, getUserAgents, ALL_AGENTS, User, AgentName } from '@/lib/supabase'

const agentConfig = {
  wms: { name: 'WMS Agent', icon: Package, href: '/demo/wms-proof-billing', gradient: 'from-blue-500 to-cyan-400', description: 'Warehouse management & billing' },
  sales: { name: 'Sales Agent', icon: TrendingUp, href: '/demo/sales-field', gradient: 'from-emerald-500 to-teal-400', description: 'CRM & sales automation' },
  cfo: { name: 'CFO Agent', icon: DollarSign, href: '/demo/finance-ops', gradient: 'from-amber-500 to-orange-400', description: 'Financial operations' },
  marketing: { name: 'Marketing Agent', icon: Megaphone, href: '/demo/marketing', gradient: 'from-pink-500 to-rose-400', description: 'Campaigns & content' },
  support: { name: 'Support Agent', icon: Headphones, href: '/demo/customer-support', gradient: 'from-violet-500 to-purple-400', description: 'Customer service' },
  research: { name: 'Research Agent', icon: FileText, href: '/demo/research-intel', gradient: 'from-indigo-500 to-blue-400', description: 'Market intelligence' },
  training: { name: 'Training Agent', icon: GraduationCap, href: '/demo/training', gradient: 'from-teal-500 to-emerald-400', description: 'Employee training' },
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [userAgents, setUserAgents] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      const profile = await getCurrentUser()
      if (!profile) {
        router.push('/login')
        return
      }
      setUser(profile)
      
      // Get accessible agents based on role
      if (profile.role === 'executive' || profile.role === 'admin') {
        setUserAgents([...ALL_AGENTS])
      } else if (profile.role === 'manager') {
        // Managers get their department agents + user agents
        const granted = await getUserAgents(profile.id)
        setUserAgents(granted)
      } else {
        // Regular users only get granted agents
        const granted = await getUserAgents(profile.id)
        setUserAgents(granted)
      }
      
      setLoading(false)
    }
    loadUser()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    )
  }

  if (!user) return null

  const getRoleBadge = () => {
    switch (user.role) {
      case 'admin':
        return <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs flex items-center gap-1"><Shield className="w-3 h-3" /> Admin</span>
      case 'executive':
        return <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs flex items-center gap-1"><Crown className="w-3 h-3" /> Executive</span>
      case 'manager':
        return <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs flex items-center gap-1"><Users className="w-3 h-3" /> Manager</span>
      default:
        return <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs">User</span>
    }
  }

  const getSubscriptionBadge = () => {
    if (user.subscription_status === 'trial') {
      const daysLeft = user.subscription_ends_at 
        ? Math.ceil((new Date(user.subscription_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : 30
      return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">{daysLeft} days left in trial</span>
    }
    if (user.subscription_status === 'active') {
      return <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs">Active</span>
    }
    return <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">Expired</span>
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <nav className="sticky top-0 z-40 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold">WoulfAI Dashboard</h1>
                <p className="text-xs text-gray-400">Welcome back, {user.full_name || user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {getRoleBadge()}
                {getSubscriptionBadge()}
              </div>
              
              {user.role === 'admin' && (
                <Link href="/admin/users" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                </Link>
              )}
              
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats for Managers/Executives */}
        {(user.role === 'manager' || user.role === 'executive' || user.role === 'admin') && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
              <div className="text-2xl font-bold">{userAgents.length}</div>
              <div className="text-sm text-gray-400">Active Agents</div>
            </div>
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
              <div className="text-2xl font-bold text-emerald-400">2,456</div>
              <div className="text-sm text-gray-400">Tasks Completed</div>
            </div>
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
              <div className="text-2xl font-bold">98.5%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
              <div className="text-2xl font-bold text-blue-400">$12.4k</div>
              <div className="text-sm text-gray-400">Time Saved Value</div>
            </div>
          </div>
        )}

        {/* Agents Grid */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Your AI Agents</h2>
          <p className="text-gray-400">
            {user.role === 'admin' 
              ? 'Full admin access to all agents'
              : user.role === 'executive'
              ? 'Executive access to all agents'
              : userAgents.length > 0 
              ? `You have access to ${userAgents.length} agent${userAgents.length > 1 ? 's' : ''}`
              : 'No agents assigned yet. Contact your manager.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_AGENTS.map((agentKey) => {
            const agent = agentConfig[agentKey]
            const hasAccess = userAgents.includes(agentKey) || user.role === 'executive' || user.role === 'admin'
            
            return (
              <div
                key={agentKey}
                className={`relative p-6 rounded-xl border transition-all ${
                  hasAccess 
                    ? 'bg-white/[0.02] border-white/10 hover:border-white/20 cursor-pointer' 
                    : 'bg-white/[0.01] border-white/5 opacity-50'
                }`}
              >
                {!hasAccess && (
                  <div className="absolute top-4 right-4">
                    <Lock className="w-4 h-4 text-gray-500" />
                  </div>
                )}
                
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center mb-4`}>
                  <agent.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="font-semibold mb-1">{agent.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{agent.description}</p>
                
                {hasAccess ? (
                  <div className="flex items-center gap-2">
                    <Link 
                      href={agent.href}
                      className="flex-1 py-2 bg-white text-black rounded-lg font-medium text-center text-sm hover:bg-gray-100 transition-colors"
                    >
                      Open Agent
                    </Link>
                    <button className="p-2 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button className="w-full py-2 border border-white/10 rounded-lg text-gray-500 text-sm cursor-not-allowed">
                    Request Access
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* Manager Section - Training Setup */}
        {(user.role === 'manager' || user.role === 'admin') && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">Team Management</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/admin/users" className="p-6 bg-white/[0.02] border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                <Users className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="font-semibold mb-2">Manage Team</h3>
                <p className="text-sm text-gray-400">Add users, assign agents, set permissions</p>
              </Link>
              <Link href="/demo/training" className="p-6 bg-white/[0.02] border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                <GraduationCap className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="font-semibold mb-2">Training Programs</h3>
                <p className="text-sm text-gray-400">Create and assign training for your team</p>
              </Link>
            </div>
          </div>
        )}

        {/* Admin Section */}
        {user.role === 'admin' && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">Admin Controls</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
                <Shield className="w-8 h-8 text-red-400 mb-4" />
                <h3 className="font-semibold mb-2">Agent Configuration</h3>
                <p className="text-sm text-gray-400 mb-4">Modify agent behavior and settings</p>
                <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  Configure <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
                <Settings className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="font-semibold mb-2">System Settings</h3>
                <p className="text-sm text-gray-400 mb-4">API keys, integrations, billing</p>
                <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  Manage <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
                <FileText className="w-8 h-8 text-amber-400 mb-4" />
                <h3 className="font-semibold mb-2">Audit Logs</h3>
                <p className="text-sm text-gray-400 mb-4">View all system activity</p>
                <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  View Logs <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
