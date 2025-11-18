import { Sparkles, ShieldCheck, Clock, Layers, Camera, ImagePlus, Palette } from 'lucide-react'

export default function Landing({ onGetStarted }) {
  const features = [
    { icon: Camera, title: 'Face & Full Body Generation', desc: 'Photorealistic faces and full-body renders designed for fashion catalogs.' },
    { icon: ImagePlus, title: '360° Angles & Expressions', desc: 'Rotate, pose and emote without prompt engineering.' },
    { icon: Layers, title: 'Dataset Generator', desc: 'Create training-ready datasets for LoRA-like fine-tunes.' },
    { icon: Palette, title: 'Background Designer', desc: 'Shops, studios and lifestyle scenes ready for your brand.' },
    { icon: ShieldCheck, title: 'Automatic Consistency', desc: 'Identity-safe seed and embedding controls for repeatable shoots.' },
    { icon: Clock, title: 'Guided Workflow', desc: 'A step-by-step builder that anyone can follow.' },
  ]

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600 text-sm">
            <Sparkles className="w-4 h-4 text-fuchsia-600"/> AI-powered fashion content
          </div>
          <h1 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-tight text-slate-900">
            Create consistent hijabi models without prompts
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Generate catalog-ready images with many poses, backgrounds and moods. Built for e‑commerce teams, not prompt engineers.
          </p>
          <div className="mt-6 flex justify-center">
            <button onClick={onGetStarted} className="px-6 py-3 rounded-xl bg-slate-900 text-white text-lg">Get started</button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <f.icon className="w-6 h-6 text-slate-700"/>
              <div className="mt-3 text-lg font-medium text-slate-900">{f.title}</div>
              <div className="mt-1 text-slate-600">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
