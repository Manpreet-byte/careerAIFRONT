import { useState } from 'react'
import { FileUp, LoaderCircle, ShieldCheck, Sparkles } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'
import DashboardHeader from '../components/layout/DashboardHeader'
import { uploadResume, getResumeAnalysis } from '../services/resumeService'
import useStore from '../store/useStore'

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [result, setResult] = useState(null)
  const [pollingStatus, setPollingStatus] = useState('')
  const showToast = useStore((s) => s.showToast)
  const addResume = useStore((s) => s.addResume)
  const setResumeAnalysis = useStore((s) => s.setResumeAnalysis)

  const handleUpload = async () => {
    if (!file) return
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (file.size > 10 * 1024 * 1024) return showToast('File is too large (max 10MB)')
    if (!allowed.includes(file.type) && !file.name.match(/\.pdf$|\.docx?$|\.doc$/i)) return showToast('Unsupported file type')

    setLoading(true)
    setUploadError(null)
    setPollingStatus('Uploading resume...')
    try {
      // upload
      const uploaded = await uploadResume(file)
      addResume(uploaded)
      
      const resumeId = uploaded._id || uploaded.id

      // poll for completion
      let analysisResult = null
      while (true) {
        const statusCheck = await getResumeAnalysis(resumeId)
        
        if (statusCheck.status === 'completed') {
           analysisResult = statusCheck.analysis
           break
        } else if (statusCheck.status === 'failed') {
           throw new Error(statusCheck.processingError || 'Resume analysis failed on server.')
        } else {
           setPollingStatus(`Processing: ${statusCheck.status}...`)
        }
        await new Promise((r) => setTimeout(r, 2000))
      }

      setResumeAnalysis(resumeId, analysisResult)
      setResult({ ...analysisResult, uploadProgress: 100 })
      showToast('Resume analysis complete')
    } catch (err) {
      setUploadError(err.message)
      showToast(err.message || 'Unable to process resume')
    } finally {
      setLoading(false)
      setPollingStatus('')
    }
  }

  return (
    <div>
      <DashboardHeader title="Resume Analyzer" subtitle="Drag and drop your resume, then review AI-driven optimization suggestions." />
      <div className="page-padding py-6 xl:px-8">
        <Card className="p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-3xl border border-dashed border-indigo-200 bg-indigo-50/60 p-6">
              <div className="flex items-center gap-3 text-indigo-700"><FileUp /><h3 className="text-xl font-semibold">Drag & Drop Resume</h3></div>
              <p className="mt-3 text-sm leading-7 text-slate">Supported formats: PDF, DOCX. Maximum size: 10MB.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <input type="file" accept=".pdf,.docx,.doc" onChange={(event) => setFile(event.target.files?.[0] || null)} className="block w-full text-sm text-slate file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-white" />
                <Button onClick={handleUpload} disabled={!file || loading}>{loading ? <><LoaderCircle className="animate-spin" size={16} /> Processing</> : 'Upload Resume'}</Button>
              </div>
              {file ? (
                <div className="mt-5 rounded-2xl bg-white p-4">
                  <div className="flex items-center justify-between text-sm"><span className="font-medium text-ink">{file.name}</span><Badge>Uploaded</Badge></div>
                  <div className="mt-3"><ProgressBar value={loading ? 50 : 100} /></div>
                  <p className="mt-3 text-sm text-slate">{loading ? pollingStatus : 'Upload complete'}</p>
                </div>
              ) : null}
            </div>
            <div className="space-y-4">
              <Card className="p-5">
                <p className="text-sm text-slate">Processing State</p>
                <p className={`mt-2 text-2xl font-semibold ${uploadError ? 'text-red-600 text-lg' : 'text-ink'}`}>{loading ? pollingStatus : uploadError ? uploadError : result ? 'Analysis complete' : 'Waiting for upload'}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-slate"><ShieldCheck size={16} /> Secure cloud AI processing</div>
              </Card>
              <Card className="p-5"><div className="flex items-center gap-2 text-indigo-600"><Sparkles size={16} /><p className="text-sm font-medium">Analysis dashboard ready</p></div><p className="mt-3 text-sm text-slate">The results below show the AI-driven structural feedback.</p></Card>
            </div>
          </div>
        </Card>

        {result ? (
          <div className="mt-6 grid gap-5 lg:grid-cols-2 xl:grid-cols-5">
            {[
              ['Overall Score', `${result.overallScore}/100`],
              ['ATS Score', `${result.atsScore}/100`],
              ['Content Score', `${result.contentScore}/100`],
              ['Skills Score', `${result.skillsScore}/100`],
              ['Experience Score', `${result.experienceScore}/100`],
            ].map(([title, value]) => <Card key={title} className="p-5"><p className="text-sm text-slate">{title}</p><p className="mt-2 text-3xl font-semibold text-ink">{value}</p></Card>)}
          </div>
        ) : null}

        {result ? (
          <div className="mt-6 grid gap-5 xl:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-ink">Strengths</h3>
              <ul className="mt-4 list-disc pl-5 space-y-3 text-sm text-slate">
                {(result.strengths || []).map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-ink">Improvements</h3>
              <ul className="mt-4 list-disc pl-5 space-y-3 text-sm text-slate">
                {(result.weaknesses || []).map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-ink">Missing Keywords</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {(result.missingKeywords || []).map((item) => <Badge key={item}>{item}</Badge>)}
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-ink">AI Suggestions</h3>
              <div className="mt-4 space-y-4">
                {(result.recommendations || []).map((rec, idx) => (
                   <div key={idx} className="text-sm">
                     <p className="font-medium text-slate-800">Section: {rec.section}</p>
                     <p className="text-slate italic mt-1 bg-gray-50 p-2 rounded">"{rec.original}"</p>
                     <p className="text-indigo-600 mt-2 font-medium">Suggestion:</p>
                     <p className="text-slate bg-indigo-50 p-2 rounded">"{rec.suggested}"</p>
                   </div>
                ))}
              </div>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  )
}