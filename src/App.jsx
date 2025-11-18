import { useState } from 'react'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import WorkflowBuilder from './components/WorkflowBuilder'

export default function App() {
  const [started, setStarted] = useState(false)
  const [view, setView] = useState('dashboard')

  const onNewModel = () => setView('dashboard')
  const onNewPipeline = () => setView('builder')

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onNewModel={onNewModel} onNewPipeline={onNewPipeline} />
      {!started ? (
        <Landing onGetStarted={() => setStarted(true)} />
      ) : (
        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <button onClick={() => setView('dashboard')} className={`px-3 py-1.5 rounded-lg ${view==='dashboard' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200'}`}>Dashboard</button>
              <button onClick={() => setView('builder')} className={`px-3 py-1.5 rounded-lg ${view==='builder' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200'}`}>Workflow Builder</button>
            </div>
          </div>
          {view === 'dashboard' ? <Dashboard/> : <WorkflowBuilder/>}
        </div>
      )}
    </div>
  )
}
