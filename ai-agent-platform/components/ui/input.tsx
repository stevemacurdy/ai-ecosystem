import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  className?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const errorClass = error ? 'border-red-500' : ''
    const inputClass = `w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errorClass} ${className}`
    return (
      <div>
        {label && <label className="block text-sm font-medium mb-1">{label}</label>}
        <input ref={ref} className={inputClass} {...props} />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
export { Input }