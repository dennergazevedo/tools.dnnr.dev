'use client'

import { Suspense, useState } from 'react'
import { TabItem } from '@/components/TabItem'
import * as Tabs from '@radix-ui/react-tabs'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useSearchParams } from 'next/navigation'
import { TesterTab } from './tester-tab'
import { ExplainerTab } from './explainer-tab'
import { CommonTab } from './common-tab'

function Menu() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')

  const [currentTab, setCurrentTab] = useState<string>(tabParam ?? 'tester')

  return (
    <Tabs.Root value={currentTab} onValueChange={setCurrentTab} className="flex flex-col flex-1 w-full gap-6">
      <ScrollArea.Root className="w-full" type="hover">
        <ScrollArea.Viewport className="w-full overflow-x-scroll">
          <Tabs.List className="mt-2 flex w-full items-center gap-4 border-b border-zinc-800">
            <TabItem
              isSelected={currentTab === 'tester'}
              value="tester"
              title="Match & Test"
            />
            <TabItem
              isSelected={currentTab === 'explainer'}
              value="explainer"
              title="Explain Regex"
            />
            <TabItem
              isSelected={currentTab === 'common'}
              value="common"
              title="Common Regexes"
            />
          </Tabs.List>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex h-2.5 touch-none select-none flex-col bg-zinc-900 p-0.5"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-zinc-700 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>

      <div className="flex-1 w-full min-h-[400px]">
        {currentTab === 'tester' && <TesterTab />}
        {currentTab === 'explainer' && <ExplainerTab />}
        {currentTab === 'common' && <CommonTab />}
      </div>
    </Tabs.Root>
  )
}

export function MenuTabs() {
  return (
    <Suspense>
      <Menu />
    </Suspense>
  )
}
