'use client'

import * as Select from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export interface TriggerProps extends ComponentProps<typeof Select.Trigger> {}

export function Trigger({ children, ...props }: TriggerProps) {
  return (
    <Select.Trigger
      {...props}
      className={twMerge(
        'flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm outline-none border-zinc-700 bg-zinc-800',
        'data-[placeholder]:text-zinc-600 data-[placeholder]:text-zinc-400',
        'focus:border-sky-300 focus:ring-4 focus:ring-sky-100 focus:border-sky-500 focus:ring-sky-500/10',
        props.className,
      )}
    >
      {children}

      <Select.Icon>
        <ChevronDown className="h-5 w-5 text-zinc-500" />
      </Select.Icon>
    </Select.Trigger>
  )
}
