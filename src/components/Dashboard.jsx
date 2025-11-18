import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="text-2xl font-semibold text-slate-800 mt-1">{value}</div>
    </div>
  )
}

function EmptyState({ title, subtitle, actionLabel, onAction }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center bg-white">
      <div className="text-lg font-medium text-slate-800">{title}</div>
      <div className="text-slate-500 mt-1">{subtitle}</div>
      {onAction && (
        <button onClick={onAction} className="mt-4 px-4 py-2 rounded-lg bg-slate-900 text-white">
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default function Dashboard() {
  const [models, setModels] = useState([])
  const [pipelines, setPipelines] = useState([])
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAll = async () => {
    try {
      setLoading(true)
      const [m, p, j] = await Promise.all([
        fetch(`${baseUrl}/models`).then(r => r.json()),
        fetch(`${baseUrl}/pipelines`).then(r => r.json()),
        fetch(`${baseUrl}/jobs`).then(r => r.json())
      ])
      setModels(m.items || [])
      setPipelines(p.items || [])
      setJobs(j.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat label="Models" value={models.length} />
        <Stat label="Pipelines" value={pipelines.length} />
        <Stat label="Jobs" value={jobs.length} />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="text-sm font-semibold text-slate-700 mb-2">Your Models</div>
          {models.length === 0 ? (
            <EmptyState title="No models yet" subtitle="Create a model to start generating consistent photos" />
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {models.map(m => (
                <div key={m.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="text-slate-800 font-medium">{m.name}</div>
                  <div className="text-slate-500 text-sm">{m.description || '—'}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-700 mb-2">Pipelines</div>
          {pipelines.length === 0 ? (
            <EmptyState title="No pipelines yet" subtitle="Design your visual pipeline for generation" />
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {pipelines.map(p => (
                <div key={p.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="text-slate-800 font-medium">{p.name}</div>
                  <div className="text-slate-500 text-sm">v{p.version} • {p.nodes?.length || 0} nodes</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <div className="text-sm font-semibold text-slate-700 mb-2">Recent Jobs</div>
        {jobs.length === 0 ? (
          <EmptyState title="No jobs yet" subtitle="Run a generation to see progress here" />
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {jobs.map(j => (
              <div key={j.id} className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between">
                <div>
                  <div className="text-slate-800 font-medium capitalize">{j.type}</div>
                  <div className="text-slate-500 text-sm">status: {j.status} • progress: {j.progress}%</div>
                </div>
                <div className="text-slate-400 text-xs">{j.id}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
