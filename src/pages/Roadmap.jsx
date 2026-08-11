import { useState, useEffect } from 'react'
import { CheckCircle2, PlayCircle, Settings2, LoaderCircle, Sparkles, BookOpen } from 'lucide-react'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import DashboardHeader from '../components/layout/DashboardHeader'
import useStore from '../store/useStore'
import { useAuth } from '../context/AuthContext'
import {
  createRoadmap,
  getCurrentRoadmap,
  getSkillGaps,
  getReadinessScore
} from '../services/careerService'

export default function Roadmap() {
  const { showToast } = useStore()
  const { user } = useAuth()
  
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  
  const [roadmap, setRoadmap] = useState(null)
  const [readiness, setReadiness] = useState(null)
  const [gaps, setGaps] = useState([])
  
  const [targetRole, setTargetRole] = useState('AI Engineer')
  
  useEffect(() => {
    fetchInitialData()
  }, [user?.targetRole])
  
  const fetchInitialData = async () => {
    setLoading(true)
    try {
      const activeRoadmap = await getCurrentRoadmap()
      
      if (activeRoadmap && user?.targetRole && activeRoadmap.targetRole !== user.targetRole) {
        // User changed their target role in settings! 
        // Invalidate the current roadmap view so they can generate a new one.
        setRoadmap(null)
        setTargetRole(user.targetRole)
      } else {
        setRoadmap(activeRoadmap || null)
        
        if (activeRoadmap) {
          setTargetRole(activeRoadmap.targetRole)
          await fetchStats(activeRoadmap.targetRole)
        } else if (user?.targetRole) {
          setTargetRole(user.targetRole)
        }
      }
    } catch (err) {
      console.log('No active roadmap found or error')
      if (user?.targetRole) setTargetRole(user.targetRole)
    } finally {
      setLoading(false)
    }
  }
  
  const fetchStats = async (role) => {
    try {
      const g = await getSkillGaps(role)
      const r = await getReadinessScore(role)
      setGaps(g || [])
      setReadiness(r || null)
    } catch (err) {
      console.error(err)
    }
  }

  const handleGenerateRoadmap = async () => {
    if (!targetRole) return showToast('Please enter a target role')
    setActionLoading(true)
    try {
      const r = await createRoadmap(targetRole, 'mid')
      setRoadmap(r)
      await fetchStats(targetRole)
      showToast('Roadmap generated successfully')
    } catch (err) {
      showToast(err.message || 'Failed to generate roadmap')
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center"><LoaderCircle className="animate-spin mx-auto text-indigo-500" size={32} /></div>
  }

  if (!roadmap) {
    return (
      <div>
        <DashboardHeader title="Career Engine" subtitle="Generate a personalized learning path based on your real skill gaps." />
        <div className="page-padding py-6 xl:px-8 max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-indigo-100 text-indigo-600 mx-auto mb-6">
              <Sparkles size={28} />
            </div>
            <h3 className="text-2xl font-bold text-ink mb-2">No Active Roadmap</h3>
            <p className="text-slate-600 mb-8">What role are you aiming for? We will analyze your current skills, job preferences, and interview history to build a customized plan.</p>
            
            <div className="max-w-sm mx-auto space-y-4 text-left">
               <div>
                 <label className="block text-sm font-medium mb-1">Target Role</label>
                 <Input value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="e.g. AI Engineer" />
               </div>
               <Button className="w-full justify-center" onClick={handleGenerateRoadmap} disabled={actionLoading || !targetRole}>
                 {actionLoading ? <><LoaderCircle className="animate-spin mr-2" size={16} /> Analyzing...</> : 'Generate Learning Roadmap'}
               </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div>
      <DashboardHeader title="Career Roadmap" subtitle="Track milestone progress and unlock the next learning steps." />
      <div className="page-padding py-6 xl:px-8">
        
        {/* Readiness Dashboard */}
        <div className="grid gap-5 lg:grid-cols-[0.34fr_0.66fr] mb-8">
          <Card className="p-6 bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
            <p className="text-sm font-medium text-slate-600">Target Role</p>
            <p className="mt-2 text-3xl font-bold text-indigo-950">{roadmap.targetRole}</p>
            
            <div className="mt-8 space-y-6">
               <div>
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-sm font-semibold text-slate-700">Career Readiness Score</p>
                    <p className="text-2xl font-bold text-indigo-600">{readiness?.score || 0}%</p>
                  </div>
                  <ProgressBar value={readiness?.score || 0} />
                  <p className="mt-1 text-xs text-slate-500 font-medium">{readiness?.category || 'Analyzing...'}</p>
               </div>
               
               <div>
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-sm font-semibold text-slate-700">Overall Roadmap Progress</p>
                    <p className="text-xl font-bold text-emerald-600">0%</p>
                  </div>
                  <ProgressBar value={0} />
               </div>
            </div>
          </Card>
          
          <Card className="p-6">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-ink">Highest Priority Skill Gaps</h3>
                <Button variant="secondary" onClick={handleGenerateRoadmap} disabled={actionLoading}>
                   {actionLoading ? 'Recalculating...' : 'Recalculate Gaps'}
                </Button>
             </div>
             
             {gaps.length === 0 ? (
               <p className="text-slate-500 italic">No significant skill gaps detected.</p>
             ) : (
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {gaps.slice(0, 6).map((g, i) => (
                   <div key={i} className={`p-4 rounded-xl border ${g.priorityCategory === 'critical' ? 'border-red-200 bg-red-50/50' : g.priorityCategory === 'high' ? 'border-amber-200 bg-amber-50/50' : 'border-slate-200 bg-slate-50'}`}>
                     <div className="flex justify-between items-start mb-2">
                       <p className="font-bold text-slate-800">{g.skill}</p>
                       <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${g.priorityCategory === 'critical' ? 'bg-red-100 text-red-700' : g.priorityCategory === 'high' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'}`}>
                         {g.priorityCategory}
                       </span>
                     </div>
                     <p className="text-xs text-slate-500">Current: L{g.currentLevel} | Required: L{g.requiredLevel}</p>
                   </div>
                 ))}
               </div>
             )}
          </Card>
        </div>

        {/* Milestones List */}
        <h3 className="text-xl font-bold text-ink mb-4">Your Learning Milestones</h3>
        <p className="text-slate-600 mb-6">{roadmap.summary}</p>
        
        <div className="space-y-6">
          {roadmap.milestones.map((step, index) => { 
            const isDone = step.status === 'completed'
            const isLocked = step.status === 'locked'
            
            return (
            <div key={step.milestoneId} className={`rounded-3xl border ${isLocked ? 'border-slate-100 bg-slate-50/50 opacity-60' : 'border-indigo-100 bg-white shadow-sm'} p-6 transition-all`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-2">Phase {step.order}</p>
                  <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 max-w-3xl">{step.explanation?.whyItMatters}</p>
                </div>
                {!isLocked && (
                  <Button variant={isDone ? "secondary" : "primary"}>
                    {isDone ? <><CheckCircle2 size={16} className="mr-2"/> Passed</> : <><BookOpen size={16} className="mr-2"/> Take Assessment</>}
                  </Button>
                )}
              </div>
              
              <div className="mt-6 grid gap-4 text-sm text-slate-700 sm:grid-cols-2 md:grid-cols-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <span className="block text-xs font-medium text-slate-400 mb-1">Target Skill</span>
                  <span className="font-semibold text-slate-900">{step.skill}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <span className="block text-xs font-medium text-slate-400 mb-1">Status</span>
                  <span className="font-semibold text-slate-900 capitalize">{step.status.replace('_', ' ')}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <span className="block text-xs font-medium text-slate-400 mb-1">Priority</span>
                  <span className="font-semibold text-slate-900 capitalize">{step.priority}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <span className="block text-xs font-medium text-slate-400 mb-1">Est. Time</span>
                  <span className="font-semibold text-slate-900">{step.estimatedHours} hours</span>
                </div>
              </div>
              
              {step.learningObjectives?.length > 0 && (
                <div className="mt-6 border-t border-slate-100 pt-6">
                  <p className="text-sm font-semibold text-slate-900 mb-3">Learning Objectives</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {step.learningObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start text-sm text-slate-600">
                        <CheckCircle2 size={16} className="text-slate-300 mt-0.5 mr-2 shrink-0"/>
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )})}
        </div>
      </div>
    </div>
  )
}