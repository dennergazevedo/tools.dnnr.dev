'use client'

import { useState, useMemo, useRef } from 'react'
import { explainRegex } from '@/lib/regex-explainer'
import { Copy, Check } from 'lucide-react'
import { toast } from 'sonner'

export function ExplainerTab() {
  const [pattern, setPattern] = useState<string>('^[A-Z][a-z]+ \\d{2,4}$')
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const insertToken = (token: string) => {
    if (inputRef.current) {
      const start = inputRef.current.selectionStart || pattern.length;
      const end = inputRef.current.selectionEnd || pattern.length;
      const newPattern = pattern.substring(0, start) + token + pattern.substring(end);
      setPattern(newPattern);
      
      // Move cursor after the inserted token
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = start + token.length;
          inputRef.current.selectionEnd = start + token.length;
          inputRef.current.focus();
        }
      }, 0);
    } else {
      setPattern(prev => prev + token);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`/${pattern}/`);
    setCopied(true);
    toast.success('Regex copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  }

  const explanations = useMemo(() => {
    if (!pattern) return []
    try {
      return explainRegex(pattern)
    } catch {
      return []
    }
  }, [pattern])

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-2 mt-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-400">Regular Expression</label>
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 font-mono text-lg">/</span>
          <input 
            ref={inputRef}
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 font-mono text-zinc-100 outline-none focus:border-zinc-700 transition-colors"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder=" pattern (e.g. \d+)"
          />
          <span className="text-zinc-500 font-mono text-lg">/</span>
          <button
            onClick={handleCopy}
            className="p-2.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            title="Copy Regex"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="text-xs text-zinc-500 font-medium mr-1">Insert:</span>
          {[
            { label: 'A-Z', token: '[A-Z]' },
            { label: 'a-z', token: '[a-z]' },
            { label: '0-9', token: '[0-9]' },
            { label: 'Any (\\w)', token: '\\w' },
            { label: 'Digit (\\d)', token: '\\d' },
            { label: 'Space (\\s)', token: '\\s' },
            { label: 'One or more (+)', token: '+' },
            { label: 'Zero or more (*)', token: '*' },
            { label: 'Optional (?)', token: '?' },
            { label: 'Group ()', token: '()' },
          ].map(({ label, token }) => (
            <button
              key={label}
              onClick={() => insertToken(token)}
              className="px-2 py-1 text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700/50 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-400">Explanation</label>
        
        {explanations.length > 0 ? (
          <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/50">
            {explanations.map((token, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-4 p-4 border-b border-zinc-800/60 last:border-0 hover:bg-zinc-800/30 transition-colors"
              >
                <div className="px-2 py-1 bg-zinc-800 rounded font-mono text-emerald-400 text-sm min-w-16 text-center select-all">
                  {token.value}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-200 text-sm font-medium">{token.type}</span>
                  <span className="text-zinc-400 text-sm">{token.description}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-zinc-500 bg-zinc-900/50 border border-zinc-800 rounded-lg border-dashed">
            Enter a valid regular expression to see its explanation.
          </div>
        )}
      </div>
    </div>
  )
}
