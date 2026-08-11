import { useState, useEffect } from 'react'
import { Mic, Send, Sparkles, Settings2, PlayCircle, LoaderCircle, CheckCircle2 } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import DashboardHeader from '../components/layout/DashboardHeader'
import useStore from '../store/useStore'
import {
  createInterview,
  startInterview,
  getCurrentQuestion,
  submitInterviewAnswer,
  completeInterview,
  getInterviewResults,
} from '../services/interviewService'

export default function Interview() {
  const { resumes, showToast } = useStore()
  
  const [view, setView] = useState('setup') // 'setup', 'session', 'results'
  const [loading, setLoading] = useState(false)
  
  // Setup State
  const [selectedResumeId, setSelectedResumeId] = useState('')
  const [role, setRole] = useState('Frontend Developer')
  const [type, setType] = useState('mixed')
  const [difficulty, setDifficulty] = useState('medium')
  
  // Session State
  const [interviewId, setInterviewId] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [answer, setAnswer] = useState('')
  const [evaluation, setEvaluation] = useState(null)
  
  // Results State
  const [finalResults, setFinalResults] = useState(null)

  useEffect(() => {
    if (resumes.length > 0 && !selectedResumeId) {
      setSelectedResumeId(resumes[0]._id || resumes[0].id)
    }
  }, [resumes, selectedResumeId])

  const handleStart = async () => {
    if (!selectedResumeId) return showToast('Please select a resume first')
    if (!role) return showToast('Target role is required')
    
    setLoading(true)
    try {
      // 1. Create
      const newInterview = await createInterview({
        resumeId: selectedResumeId,
        role,
        type,
        difficulty,
        questionCount: 3, // keep short for testing
      })
      
      setInterviewId(newInterview._id)
      
      // 2. Start
      await startInterview(newInterview._id)
      
      // 3. Get First Question
      const q = await getCurrentQuestion(newInterview._id)
      setCurrentQuestion(q)
      setEvaluation(null)
      
      setView('session')
    } catch (err) {
      showToast(err.message || 'Failed to start interview')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) return showToast('Answer cannot be empty')
    
    setLoading(true)
    try {
      const res = await submitInterviewAnswer(interviewId, currentQuestion.questionId, answer)
      setEvaluation(res.evaluation)
      
      if (res.isComplete) {
        // Complete the interview
        const completed = await completeInterview(interviewId)
        setFinalResults(completed)
      }
    } catch (err) {
      showToast(err.message || 'Failed to evaluate answer')
    } finally {
      setLoading(false)
    }
  }

  const handleNextQuestion = async () => {
    setLoading(true)
    try {
      if (finalResults) {
        setView('results')
      } else {
        const q = await getCurrentQuestion(interviewId)
        setCurrentQuestion(q)
        setAnswer('')
        setEvaluation(null)
      }
    } catch (err) {
      showToast(err.message || 'Failed to fetch next question')
    } finally {
      setLoading(false)
    }
  }

  if (view === 'setup') {
    return (
      <div>
        <DashboardHeader title="AI Interview Coach" subtitle="Set up your personalized adaptive interview." />
        <div className="page-padding py-6 xl:px-8 max-w-3xl mx-auto">
          <Card className="p-6">
            <div className="flex items-center gap-3 text-indigo-700 mb-6">
              <Settings2 />
              <h3 className="text-xl font-semibold">Interview Configuration</h3>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Select Resume Context</label>
                <select 
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm"
                  value={selectedResumeId} 
                  onChange={(e) => setSelectedResumeId(e.target.value)}
                >
                  <option value="">-- Choose Resume --</option>
                  {resumes.map(r => (
                    <option key={r._id || r.id} value={r._id || r.id}>{r.fileName || r.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Target Role</label>
                <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Senior Frontend Engineer" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Interview Type</label>
                  <select 
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm"
                    value={type} 
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="mixed">Mixed (Technical & Behavioral)</option>
                    <option value="technical">Technical Only</option>
                    <option value="behavioral">Behavioral Only</option>
                    <option value="resume_based">Resume Deep Dive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Difficulty</label>
                  <select 
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm"
                    value={difficulty} 
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full justify-center" onClick={handleStart} disabled={loading || resumes.length === 0}>
                  {loading ? <><LoaderCircle className="animate-spin mr-2" size={16} /> Generating Personalized Questions...</> : <><PlayCircle className="mr-2" size={16} /> Start Interview</>}
                </Button>
                {resumes.length === 0 && <p className="text-sm text-red-500 mt-2 text-center">You must upload a resume in the Resume Analyzer first.</p>}
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (view === 'session') {
    return (
      <div>
        <DashboardHeader title="Live Interview" subtitle={`Role: ${role} | Difficulty: ${difficulty}`} />
        <div className="page-padding py-6 xl:px-8 max-w-5xl mx-auto">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-600 text-white">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="font-semibold text-ink">CareerAI Coach</p>
                <p className="text-sm text-slate">Question {currentQuestion?.currentIndex} of {currentQuestion?.totalQuestions}</p>
              </div>
              <div className="ml-auto flex gap-2">
                <span className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full uppercase">{currentQuestion?.category}</span>
              </div>
            </div>
            
            <div className="mt-6 rounded-3xl bg-indigo-50/50 p-6 text-lg leading-relaxed text-slate-800 font-medium">
              {currentQuestion?.question}
            </div>
            
            {!evaluation ? (
              <div className="mt-6 space-y-4">
                <textarea 
                  className="w-full rounded-2xl border border-slate-200 p-4 text-sm min-h-[160px] focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  value={answer} 
                  onChange={(e) => setAnswer(e.target.value)} 
                  placeholder="Type your detailed answer here. Use the STAR method if applicable..." 
                />
                <div className="flex justify-end gap-3">
                  <Button variant="secondary" disabled><Mic size={16} className="mr-2"/> Voice (Coming Soon)</Button>
                  <Button onClick={handleSubmitAnswer} disabled={loading || !answer.trim()}>
                    {loading ? <><LoaderCircle className="animate-spin mr-2" size={16} /> Evaluating...</> : <><Send size={16} className="mr-2"/> Submit Answer</>}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h4 className="font-semibold text-ink flex items-center gap-2 mb-4"><CheckCircle2 className="text-emerald-500" size={20}/> Evaluation Results</h4>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/30 p-5">
                    <p className="text-sm font-semibold text-emerald-800 mb-2">Strengths</p>
                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                      {evaluation.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-amber-100 bg-amber-50/30 p-5">
                    <p className="text-sm font-semibold text-amber-800 mb-2">Areas to Improve</p>
                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                      {evaluation.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-800 mb-2">Ideal Answer Approach</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{evaluation.betterAnswer}</p>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleNextQuestion} disabled={loading}>
                     {loading ? <LoaderCircle className="animate-spin" size={16} /> : finalResults ? 'View Final Results' : 'Next Question'}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    )
  }

  if (view === 'results' && finalResults) {
    return (
      <div>
        <DashboardHeader title="Interview Results" subtitle="Your final performance review and AI-generated improvement plan." />
        <div className="page-padding py-6 xl:px-8">
          <div className="grid gap-5 lg:grid-cols-4 mb-8">
            <Card className="p-6 text-center">
              <p className="text-sm text-slate">Overall Score</p>
              <p className="mt-2 text-4xl font-bold text-indigo-600">{finalResults.overallScore}<span className="text-lg text-slate-400">/100</span></p>
            </Card>
            <Card className="p-6 text-center">
              <p className="text-sm text-slate">Difficulty</p>
              <p className="mt-2 text-2xl font-bold text-ink capitalize">{finalResults.difficulty}</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="text-sm text-slate">Type</p>
              <p className="mt-2 text-2xl font-bold text-ink capitalize">{finalResults.type.replace('_', ' ')}</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="text-sm text-slate">Duration</p>
              <p className="mt-2 text-2xl font-bold text-ink">{Math.floor(finalResults.duration / 60)}m {finalResults.duration % 60}s</p>
            </Card>
          </div>
          
          <h3 className="text-xl font-semibold mb-4">Improvement Plan</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {finalResults.improvementPlan.map((plan, idx) => (
              <Card key={idx} className="p-5 border-t-4 border-indigo-500">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-ink">{plan.topic}</p>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${plan.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{plan.priority.toUpperCase()}</span>
                </div>
                <p className="text-sm text-slate-600 mb-3">{plan.reason}</p>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Action Item</p>
                  <p className="text-sm font-medium">{plan.action}</p>
                </div>
              </Card>
            ))}
            {finalResults.improvementPlan.length === 0 && (
              <p className="text-slate col-span-3">Great job! You scored high across all topics.</p>
            )}
          </div>
          
          <div className="mt-8 flex justify-center">
             <Button onClick={() => setView('setup')}>Start Another Interview</Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}