'use client'

import { useState } from 'react'
import { TabItem } from '@/components/TabItem'
import * as Tabs from '@radix-ui/react-tabs'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useSearchParams } from 'next/navigation'
import { TabContent } from './tabContent'

export function MenuTabs() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [currentTab, setCurrentTab] = useState<string>(tabParam ?? 'jsonts')

  return (
    <Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
      <ScrollArea.Root className="w-full" type="hover">
        <ScrollArea.Viewport className="w-full overflow-x-scroll">
          <Tabs.List className="mt-6 flex w-full items-center gap-4 border-b border-zinc-200 dark:border-zinc-800">
            <TabItem
              isSelected={currentTab === 'jsonts'}
              value="jsonts"
              title="JSON to TS"
            />
          </Tabs.List>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex h-2.5 touch-none select-none flex-col bg-zinc-100 p-0.5"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-zinc-300 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
      <TabContent currentTab={currentTab}/>
    </Tabs.Root>
  )
}
