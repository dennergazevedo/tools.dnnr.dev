import { Rocket, ShieldCheck, SaveAll } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'

export const metadata = {
  title: 'Get Started | dnnr.dev',
}

export default function ToolsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Get Started"
        description="Welcome to dnnr.dev tools. A collection of useful tools for your daily tasks."
        icon={Rocket}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="flex flex-col gap-4 p-6 rounded-xl border border-zinc-800/60 bg-zinc-900 shadow-sm">
          <div className="flex items-center gap-3 text-emerald-500">
            <ShieldCheck className="h-8 w-8" />
            <h2 className="text-xl font-semibold text-zinc-100">100% Local and Secure</h2>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            All tools here run <strong className="text-zinc-300">exclusively in your browser</strong>. 
            No data is sent to our servers, which means there is no risk of your information 
            being leaked or stolen. You can paste tokens, passwords, or sensitive data with 
            complete peace of mind.
          </p>
        </div>

        <div className="flex flex-col gap-4 p-6 rounded-xl border border-zinc-800/60 bg-zinc-900 shadow-sm">
          <div className="flex items-center gap-3 text-sky-500">
            <SaveAll className="h-8 w-8" />
            <h2 className="text-xl font-semibold text-zinc-100">Purposefully Saved Data</h2>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Certain tools allow you to save useful data to speed up your work (such as your 
            to-do list or cron generator settings). This data is stored locally in your browser 
            (LocalStorage) and is only accessible to you. You have the option to log in and 
            securely sync these preferences if you wish.
          </p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-center p-8 rounded-xl border border-dashed border-zinc-800 bg-zinc-900/40">
        <div className="text-center flex flex-col items-center gap-3">
          <Rocket className="h-10 w-10 text-zinc-600 mb-2" />
          <h3 className="text-lg font-medium text-zinc-200">Ready to get started?</h3>
          <p className="text-sm text-zinc-400 max-w-md">
            Use the left sidebar to navigate between the different available tools.
          </p>
        </div>
      </div>
    </div>
  )
}
