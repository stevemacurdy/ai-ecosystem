interface CardProps { children: React.ReactNode; className?: string; hover?: boolean }

export function Card({ children, className = '', hover }: CardProps) {
  const hoverClass = hover ? 'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-pointer' : ''
  return <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ${hoverClass} ${className}`}>{children}</div>
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>{children}</div>
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>{children}</div>
}