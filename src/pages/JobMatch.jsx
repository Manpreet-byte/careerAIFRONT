import { useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Textarea from '../components/ui/Textarea'
import Badge from '../components/ui/Badge'
import DashboardHeader from '../components/layout/DashboardHeader'
import { analyzeJobMatchMock } from '../services/jobService'
import useStore from '../store/useStore'

export default function JobMatch() {
  const [loading, setLoading] = useState(false)
  const [score, setScore] = useState(null)
  const [jobDesc, setJobDesc] = useState('')
  const resumes = useStore((s) => s.resumes)
  const selectedResumeId = useStore((s) => s.selectedResumeId)
  const selectResume = useStore((s) => s.selectResume)
  const setJobMatchAnalysis = useStore((s) => s.setJobMatchAnalysis)
  const showToast = useStore((s) => s.showToast)

  const analyze = async () => {
    if (!selectedResumeId) return showToast('Select a resume first.')
    if (!jobDesc) return showToast('Paste a job description to analyze.')
    setLoading(true)
    const result = await analyzeJobMatchMock({ resumeId: selectedResumeId, jobDescription: jobDesc })
    setJobMatchAnalysis(selectedResumeId, result)
    setScore(result.overall)
    setLoading(false)
    showToast('Job match analysis complete')
  }

  return (
    <div>
      <DashboardHeader title="Job Match" subtitle="Compare a target job description against your resume and highlight fit gaps." />
      <div className="page-padding py-6 xl:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="p-6">
            <p className="label">Job Description</p>
            <Textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} placeholder="Paste the full job description here..." />
          </Card>
          <Card className="p-6">
            <p className="label">Resume Selection</p>
            <div className="mt-2 space-y-2">
              {resumes.length ? resumes.map((r) => (
                <button key={r.id} onClick={() => selectResume(r.id)} className={`w-full rounded-2xl border p-3 text-left ${selectedResumeId === r.id ? 'border-indigo-200 bg-indigo-50' : 'border-border bg-white'}`}>
                  <div className="flex items-center justify-between"><div className="text-sm font-medium text-ink">{r.name}</div><div className="text-xs text-slate">{Math.round(r.size / 1024)} KB</div></div>
                </button>
              )) : <div className="rounded-2xl border border-dashed border-border bg-slate-50 p-5 text-sm text-slate">No resumes uploaded yet.</div>}
            </div>
            <div className="mt-4"><Button onClick={analyze}>{loading ? <><LoaderCircle className="animate-spin" size={16} /> Analyzing</> : 'Analyze Match'}</Button></div>
          </Card>
        </div>

        {score ? (
          <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_1fr]">
            <Card className="p-6"><p className="text-sm text-slate">Match Score</p><p className="mt-2 text-5xl font-semibold text-ink">{score}%</p><div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate">Skills Match 92% • Experience Match 84% • Education Match 95% • Keyword Match 88%</div></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold text-ink">AI Summary</h3><p className="mt-3 text-sm leading-7 text-slate">Your profile is a strong fit overall. Emphasize production deployment experience, project outcomes, and cloud exposure to improve the match further.</p><div className="mt-5 flex flex-wrap gap-2"><Badge>Matched Skills</Badge><Badge>Missing Skills</Badge><Badge>Recommended Skills</Badge></div></Card>
          </div>
        ) : null}
      </div>
    </div>
  )
}