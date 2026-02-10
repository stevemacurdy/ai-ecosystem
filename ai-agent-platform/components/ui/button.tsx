import { forwardRef, ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', className = '', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors disabled:opacity-50'
    const variants = {
      primary: 'bg-white text-black hover:bg-gray-100',
      secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/10',
      ghost: 'text-gray-400 hover:text-white hover:bg-white/10',
      danger: 'bg-red-500 text-white hover:bg-red-600',
    }
    const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2', lg: 'px-6 py-3 text-lg' }
    const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`
    return <button ref={ref} className={classes} {...props}>{children}</button>
  }
)
Button.displayName = 'Button'
export { Button }