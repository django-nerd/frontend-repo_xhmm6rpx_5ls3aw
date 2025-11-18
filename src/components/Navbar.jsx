import { Menu, User, Settings } from 'lucide-react'

export default function Navbar({ onNewModel, onNewPipeline }) {
  return (
    <div className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/40 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-slate-100"><Menu className="w-5 h-5"/></button>
          <div className="font-semibold tracking-tight text-slate-800">AI Hijabi Model Studio</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onNewModel} className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-sm">New Model</button>
          <button onClick={onNewPipeline} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-sm">New Pipeline</button>
          <button className="p-2 rounded-lg hover:bg-slate-100"><Settings className="w-5 h-5"/></button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-fuchsia-500 to-sky-500 grid place-items-center text-white text-xs"><User className="w-4 h-4"/></div>
        </div>
      </div>
    </div>
  )
}
