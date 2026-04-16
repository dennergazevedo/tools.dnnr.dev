'use client'

import { motion } from 'framer-motion'
import * as Tabs from '@radix-ui/react-tabs'
import { useCallback, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation';

interface TabItemProps {
  value: string
  title: string
  isSelected: boolean
}

export function TabItem({ title, value, isSelected }: TabItemProps) {
  const router = useRouter();
  const pathname = usePathname();

  const addParameter = useCallback(() => {
    const params = new URLSearchParams();
    params.set('tab', value);

    router.push(`${pathname}?${params.toString()}`);
  }, [value, pathname, router])

  useEffect(() => {
    if(isSelected) addParameter()
  }, [isSelected])

  return (
    <Tabs.Trigger
      value={value}
      className="group relative px-1 pb-4 text-sm font-medium leading-5 text-neutral-500 outline-none transition-colors data-[state=active]:text-amber-500 hover:text-neutral-200"
    >
      <span className="whitespace-nowrap rounded group-focus-visible:ring-2 group-focus-visible:ring-amber-400 group-focus-visible:ring-offset-4">
        {title}
      </span>

      {isSelected && (
        <motion.div
          layoutId="activeTab"
          className="absolute -bottom-px left-0 right-0 h-0.5 bg-amber-500"
        />
      )}
    </Tabs.Trigger>
  )
}
