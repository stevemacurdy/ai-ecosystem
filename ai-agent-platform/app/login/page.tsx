'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, User } from 'lucide-react'
import { signIn, signUp } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        const { error } = await signIn(email, password)
        if (error) throw error
        router.push('/dashboard')
      } else {
        const { error } = await signUp(email, password, fullName)
        if (error) throw error
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 p-12 flex-col justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold">WoulfAI</span>
        </Link>
        
        <div>
          <h1 className="text-4xl font-bold mb-4">AI Employees That Actually Work</h1>
          <p className="text-xl text-gray-400">
            Access your AI agents, manage your team, and automate your business operations.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-300">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span>7 specialized AI agents</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <span>Enterprise-grade security</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <ArrowRight className="w-5 h-5" />
            </div>
            <span>30-day free trial</span>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">WoulfAI</span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-gray-400">
              {isLogin ? 'Sign in to access your AI agents' : 'Start your 30-day free trial'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-sm text-blue-400 hover:text-blue-300">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
              }}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-center text-sm text-gray-500">
              By continuing, you agree to our{' '}
              <Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
