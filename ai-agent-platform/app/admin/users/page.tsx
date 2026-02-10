'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, Users, Search, Plus, Edit, Trash2, Shield, Crown,
  User, Check, X, Loader2, Mail, ChevronDown
} from 'lucide-react'
import { supabase, getCurrentUser, ALL_AGENTS, User as UserType } from '@/lib/supabase'

const agentNames: Record<string, string> = {
  wms: 'WMS Agent',
  sales: 'Sales Agent',
  cfo: 'CFO Agent',
  marketing: 'Marketing Agent',
  support: 'Support Agent',
  research: 'Research Agent',
  training: 'Training Agent',
}

export default function AdminUsersPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [notification, setNotification] = useState<string | null>(null)

  // New user form
  const [newUser, setNewUser] = useState({
    email: '',
    full_name: '',
    role: 'user',
    department: '',
    agents: [] as string[]
  })

  useEffect(() => {
    async function load() {
      const user = await getCurrentUser()
      if (!user || (user.role !== 'admin' && user.role !== 'manager')) {
        router.push('/dashboard')
        return
      }
      setCurrentUser(user)
      await loadUsers()
      setLoading(false)
    }
    load()
  }, [router])

  const loadUsers = async () => {
    const { data } = await supabase
      .from('users')
      .select('*, user_agents(agent_name)')
      .order('created_at', { ascending: false })
    
    setUsers(data || [])
  }

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  const handleAddUser = async () => {
    try {
      // Create user in database (they'll get an invite email)
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert({
          email: newUser.email,
          full_name: newUser.full_name,
          role: newUser.role,
          department: newUser.department,
          subscription_status: 'active'
        })
        .select()
        .single()

      if (userError) throw userError

      // Add agent permissions
      if (newUser.agents.length > 0 && userData) {
        const agentRecords = newUser.agents.map(agent => ({
          user_id: userData.id,
          agent_name: agent,
          granted_by: currentUser?.id
        }))
        
        await supabase.from('user_agents').insert(agentRecords)
      }

      showNotification('User added successfully!')
      setShowAddModal(false)
      setNewUser({ email: '', full_name: '', role: 'user', department: '', agents: [] })
      await loadUsers()
    } catch (error: any) {
      showNotification(`Error: ${error.message}`)
    }
  }

  const handleUpdateRole = async (userId: string, newRole: string) => {
    await supabase
      .from('users')
      .update({ role: newRole })
      .eq('id', userId)
    
    showNotification('Role updated!')
    await loadUsers()
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    await supabase.from('users').delete().eq('id', userId)
    showNotification('User deleted')
    await loadUsers()
  }

  const handleToggleAgent = async (userId: string, agentName: string, hasAccess: boolean) => {
    if (hasAccess) {
      await supabase
        .from('user_agents')
        .delete()
        .eq('user_id', userId)
        .eq('agent_name', agentName)
    } else {
      await supabase
        .from('user_agents')
        .insert({ user_id: userId, agent_name: agentName, granted_by: currentUser?.id })
    }
    
    await loadUsers()
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4 text-red-400" />
      case 'executive': return <Crown className="w-4 h-4 text-purple-400" />
      case 'manager': return <Users className="w-4 h-4 text-blue-400" />
      default: return <User className="w-4 h-4 text-gray-400" />
    }
  }

  const filteredUsers = users.filter(u => 
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {notification}
        </div>
      )}

      {/* Header */}
      <nav className="sticky top-0 z-40 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
                Back
              </Link>
              <div className="h-6 w-px bg-white/10" />
              <div>
                <h1 className="font-bold">User Management</h1>
                <p className="text-xs text-gray-400">{users.length} users</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-80 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Users Table */}
        <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left text-sm text-gray-400">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Agents</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-medium">
                        {(user.full_name?.[0] || user.email?.[0] || '?').toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{user.full_name || 'No name'}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <select
                        value={user.role}
                        onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                        className="appearance-none bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 pr-8 text-sm cursor-pointer"
                        disabled={user.id === currentUser?.id}
                      >
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                        <option value="executive">Executive</option>
                        {currentUser?.role === 'admin' && <option value="admin">Admin</option>}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {user.department || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {ALL_AGENTS.map((agent) => {
                        const hasAccess = user.user_agents?.some((a: any) => a.agent_name === agent) ||
                                          user.role === 'executive' || user.role === 'admin'
                        return (
                          <button
                            key={agent}
                            onClick={() => handleToggleAgent(user.id, agent, hasAccess)}
                            className={`px-2 py-0.5 rounded text-xs transition-colors ${
                              hasAccess 
                                ? 'bg-emerald-500/20 text-emerald-400' 
                                : 'bg-white/5 text-gray-500 hover:bg-white/10'
                            }`}
                            disabled={user.role === 'executive' || user.role === 'admin'}
                          >
                            {agentNames[agent].replace(' Agent', '')}
                          </button>
                        )
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-white/10 rounded-lg">
                        <Mail className="w-4 h-4 text-gray-400" />
                      </button>
                      {user.id !== currentUser?.id && (
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-[#111118] border border-white/10 rounded-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Add New User</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg"
                  placeholder="user@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={newUser.full_name}
                  onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg"
                  >
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    <option value="executive">Executive</option>
                    {currentUser?.role === 'admin' && <option value="admin">Admin</option>}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Department</label>
                  <input
                    type="text"
                    value={newUser.department}
                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg"
                    placeholder="Operations"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Agent Access</label>
                <div className="flex flex-wrap gap-2">
                  {ALL_AGENTS.map((agent) => (
                    <button
                      key={agent}
                      type="button"
                      onClick={() => {
                        const agents = newUser.agents.includes(agent)
                          ? newUser.agents.filter(a => a !== agent)
                          : [...newUser.agents, agent]
                        setNewUser({ ...newUser, agents })
                      }}
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        newUser.agents.includes(agent)
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-white/5 text-gray-400 border border-white/10'
                      }`}
                    >
                      {agentNames[agent]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 border border-white/10 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="flex-1 py-2 bg-white text-black rounded-lg font-medium"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
