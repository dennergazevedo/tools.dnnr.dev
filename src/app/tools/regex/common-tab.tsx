'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { toast } from 'sonner'

type CommonRegex = {
  title: string
  pattern: string
  description: string
}

const COMMON_REGEXES: CommonRegex[] = [
  {
    title: 'Email Address',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    description: 'Matches a standard email address.',
  },
  {
    title: 'URL',
    pattern: '^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$',
    description: 'Matches standard URLs (http, https, or no protocol).',
  },
  {
    title: 'Brazilian Postal Code (CEP)',
    pattern: '^\\d{5}-?\\d{3}$',
    description: 'Matches a Brazilian CEP with or without the hyphen.',
  },
  {
    title: 'US Zip Code',
    pattern: '^\\d{5}(?:[-\\s]\\d{4})?$',
    description: 'Matches US ZIP codes (5 digits or 5+4 digits).',
  },
  {
    title: 'All Numbers',
    pattern: '^\\d+$',
    description: 'Matches a string containing only digits.',
  },
  {
    title: 'All Letters',
    pattern: '^[a-zA-Z]+$',
    description: 'Matches a string containing only alphabet characters (no spaces).',
  },
  {
    title: 'Alphanumeric',
    pattern: '^[a-zA-Z0-9]+$',
    description: 'Matches a string containing only letters and numbers.',
  },
  {
    title: 'Strong Password',
    pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$',
    description: 'Minimum 8 characters, at least one letter and one number.',
  },
  {
    title: 'IPv4 Address',
    pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
    description: 'Matches a valid IPv4 address.',
  },
  {
    title: 'CPF (Brazilian ID)',
    pattern: '^\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}$',
    description: 'Matches a valid formatting of Brazilian CPF.',
  }
]

export function CommonTab() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = (pattern: string, index: number) => {
    navigator.clipboard.writeText(pattern)
    setCopiedIndex(index)
    toast.success('Regex pattern copied to clipboard!')
    setTimeout(() => {
      setCopiedIndex(null)
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-2 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {COMMON_REGEXES.map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col gap-3 p-4 bg-zinc-900 border border-zinc-800/80 rounded-lg hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-zinc-200">{item.title}</h3>
              <button
                onClick={() => handleCopy(item.pattern, index)}
                className="p-1.5 rounded-md bg-zinc-800/50 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 transition-colors"
                title="Copy Pattern"
              >
                {copiedIndex === index ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            
            <code className="text-xs font-mono text-emerald-400 bg-zinc-950 px-2 py-1.5 rounded border border-zinc-800/50 break-all select-all">
              {item.pattern}
            </code>
            
            <p className="text-sm text-zinc-500 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
