'use client'

import { useState, useMemo, useRef } from 'react'
import { Copy, Check } from 'lucide-react'
import { toast } from 'sonner'

export function TesterTab() {
  const [pattern, setPattern] = useState<string>('[A-Z][a-z]+')
  const [flags, setFlags] = useState<string>('g')
  const [testString, setTestString] = useState<string>('Hello world! Welcome to the Regex Tester.')
  const [error, setError] = useState<string | null>(null)
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
    navigator.clipboard.writeText(`/${pattern}/${flags}`);
    setCopied(true);
    toast.success('Regex copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  }

  const highlightedString = useMemo(() => {
    if (!pattern) return testString;

    try {
      const regex = new RegExp(pattern, flags);
      setError(null);

      // If no global flag, we only match once, so split using match is harder.
      // But we can just use matchAll or String.replace.
      // Easiest is to rebuild the string with spans.
      
      let match;
      let lastIndex = 0;
      const elements = [];
      
      // If no 'g' flag is provided but we want to highlight all matches, we can't use matchAll.
      // So let's force a 'g' for highlighting purposes if it doesn't exist? 
      // Actually standard regex testers show all matches if global is on, or just first if off.
      const RegExpToUse = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
      
      let matchCount = 0;
      while ((match = RegExpToUse.exec(testString)) !== null) {
        if (match[0].length === 0) {
          // Prevent infinite loops on zero-length matches (like '^')
          RegExpToUse.lastIndex++;
          continue;
        }
        
        // Add text before match
        if (match.index > lastIndex) {
          elements.push(
            <span key={`text-${lastIndex}`}>{testString.substring(lastIndex, match.index)}</span>
          );
        }
        
        // Add matched text
        elements.push(
           <mark 
             key={`match-${match.index}`} 
             className="bg-emerald-500/30 text-emerald-200 border border-emerald-500/50 rounded px-0.5 shadow-sm"
           >
             {match[0]}
           </mark>
        );
        
        lastIndex = match.index + match[0].length;
        matchCount++;
        
        if (!flags.includes('g') && matchCount >= 1) {
          break;
        }
      }
      
      // Add remaining text
      if (lastIndex < testString.length) {
        elements.push(
          <span key={`text-${lastIndex}`}>{testString.substring(lastIndex)}</span>
        );
      }
      
      return elements;

    } catch (err: any) {
      setError(err.message);
      return testString;
    }
  }, [pattern, flags, testString]);

  // Handle auto-resize of textarea
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-2 mt-4">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex flex-col gap-2 flex-1">
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
            <input 
              className="w-20 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 font-mono text-zinc-100 outline-none focus:border-zinc-700 transition-colors"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="flags"
            />
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

          {error && <span className="text-red-400 text-sm">{error}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-400">Test String</label>
        <textarea 
          className="w-full min-h-[120px] bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 font-mono text-zinc-100 outline-none focus:border-zinc-700 transition-colors resize-y leading-relaxed"
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Enter text to test your regex against..."
        />
      </div>

      <div className="flex flex-col gap-2">
         <label className="text-sm font-medium text-zinc-400">Match Result</label>
         <div className="w-full min-h-[120px] bg-zinc-950 border border-zinc-800/80 rounded-md px-4 py-3 font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
            {highlightedString.length > 0 ? highlightedString : <span className="text-zinc-600 italic">No matches...</span>}
         </div>
      </div>
    </div>
  )
}
