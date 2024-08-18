import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export interface TextareaProps extends ComponentProps<'textarea'> {}

export function Textarea(props: TextareaProps) {
  return (
    <textarea
      className={twMerge(
        'flex min-h-[120px] w-full resize-y items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm outline-none border-zinc-700 bg-zinc-800 text-zinc-100 placeholder-zinc-400',
        'focus-visible:border-sky-300 focus-visible:ring-4 focus-visible:ring-sky-100 focus-visible:border-sky-500 focus-visible:ring-sky-500/10',
        props.className,
      )}
      {...props}
    />
  )
}
