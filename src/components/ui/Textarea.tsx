import * as React from 'react'
import { cn } from '@/lib/utils/cn'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextareaElement> {
  label?: string
  error?: string
  helperText?: string
  maxLength?: number
  showCounter?: boolean
}

const Textarea = React.forwardRef<HTMLTextareaElement, TextareaProps>(
  ({ className, label, error, helperText, maxLength, showCounter = true, ...props }, ref) => {
    const [charCount, setCharCount] = React.useState(props.value?.toString().length || 0)
    
    const handleChange = (e: React.ChangeEvent<HTMLTextareaElement>) => {
      setCharCount(e.target.value.length)
      props.onChange?.(e)
    }
    
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <textarea
            className={cn(
              "flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-romantic-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
            ref={ref}
            maxLength={maxLength}
            onChange={handleChange}
            {...props}
          />
          {showCounter && maxLength && (
            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
              {charCount}/{maxLength}
            </div>
          )}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
