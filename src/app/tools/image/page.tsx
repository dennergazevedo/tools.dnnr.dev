import { Image as ImageIcon } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { MenuTabs } from './tabs'

export const metadata = {
  title: 'Image Tools | dnnr.dev',
  description: 'Convert and compress your images locally in your browser.',
}

export default function ImageToolsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Image Tools"
        description="A collection of tools to help you manage and optimize your images securely."
        icon={ImageIcon}
      />

      <MenuTabs />
    </div>
  )
}
