import { useState } from 'react'
import { Plus, Play, Brain } from 'lucide-react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function WorkflowBuilder() {
  const [name, setName] = useState('Default Pipeline')
  const [nodes, setNodes] = useState([
    { id: 'loader', type: 'loader', label: 'Seed/Model Loader' },
    { id: 'control', type: 'control', label: 'Pose/Control' },
    { id: 'render', type: 'render', label: 'Render' },
  ])

  const addNode = () => {
    const id = `node-${nodes.length + 1}`
    setNodes([...nodes, { id, type: 'utility', label: 'New Node' }])
  }

  const savePipeline = async () => {
    const payload = { name, nodes, edges: [], version: '1.0', is_active: true }
    const res = await fetch(`${baseUrl}/pipelines`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    alert(`Pipeline saved with id ${data.id}`)
  }

  const runGeneration = async () => {
    const payload = { task: 'fullbody', promptless: true, params: { angle: 'front', mood: 'smile' } }
    const res = await fetch(`${baseUrl}/generate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    alert(`Job queued: ${data.job_id}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <input value={name} onChange={e => setName(e.target.value)} className="text-lg font-semibold text-slate-800 outline-none" />
          <div className="flex gap-2">
            <button onClick={addNode} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 flex items-center gap-2 text-sm"><Plus className="w-4 h-4"/>Add Node</button>
            <button onClick={savePipeline} className="px-3 py-1.5 rounded-lg bg-slate-900 text-white flex items-center gap-2 text-sm"><Brain className="w-4 h-4"/>Save</button>
            <button onClick={runGeneration} className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white flex items-center gap-2 text-sm"><Play className="w-4 h-4"/>Run</button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {nodes.map(n => (
            <div key={n.id} className="rounded-xl border border-slate-200 p-4">
              <div className="text-slate-800 font-medium">{n.label}</div>
              <div className="text-slate-500 text-sm">type: {n.type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
