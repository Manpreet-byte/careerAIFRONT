import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, AlertCircle } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import CircularProgress from '../components/ui/CircularProgress'
import ScoreCard from '../components/ui/ScoreCard'
import DashboardHeader from '../components/layout/DashboardHeader'
import ResponsiveTableCards from '../components/layout/ResponsiveTableCards'
import { getDashboardAnalytics } from '../services/careerService'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [analytics, setAnalytics] = useState(null)
  
  // Use a fallback target role for now or empty
  const targetRole = 'Software Engineer' // Could be dynamic based on user profile

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getDashboardAnalytics(targetRole)
      setAnalytics(data)
    } catch (err) {
      setError('Unable to load career analytics. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="flex h-full min-h-[50vh] flex-col items-center justify-center p-8">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
        <p className="mt-4 text-slate">Loading career analytics...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full min-h-[50vh] flex-col items-center justify-center p-8">
        <AlertCircle className="h-12 w-12 text-rose-500" />
        <p className="mt-4 text-slate">{error}</p>
        <button onClick={fetchAnalytics} className="btn-primary mt-4">Try Again</button>
      </div>
    )
  }

  if (!analytics) return null

  // Mappings for the ScoreCards
  const dashboardCardsMap = [
    { label: 'Resume Score', value: `${analytics.dashboardCards.resumeScore}/100`, trend: 'Latest upload', icon: 'FileBadge2' },
    { label: 'Job Matches', value: analytics.dashboardCards.jobMatches.toString(), trend: 'Active tracking', icon: 'BriefcaseBusiness' },
    { label: 'Skills Identified', value: analytics.dashboardCards.skillsIdentified.toString(), trend: 'Verified skills', icon: 'Sparkles' },
    { label: 'Applications', value: analytics.dashboardCards.activeApplications.toString(), trend: 'In progress', icon: 'Send' },
  ]

  return (
    <div>
      <DashboardHeader title="Good morning 👋" subtitle="Here's your career progress at a glance." />
      <div className="page-padding py-6 xl:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {dashboardCardsMap.map((card) => <ScoreCard key={card.label} title={card.label} value={card.value} description={card.trend} />)}
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <Card className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate">Career Health</p>
                <p className="mt-1 text-2xl font-semibold text-ink">{analytics.careerHealth.overall}%</p>
              </div>
              <Badge>{analytics.careerHealth.overall >= 80 ? 'Strong signal' : analytics.careerHealth.overall >= 60 ? 'Developing' : 'Needs attention'}</Badge>
            </div>
            <div className="mt-6 flex items-center justify-center">
              <CircularProgress value={analytics.careerHealth.overall} size={220} />
              <div className="absolute text-center">
                <p className="text-5xl font-semibold text-ink">{analytics.careerHealth.overall}%</p>
                <p className="text-sm text-slate">career health</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {analytics.careerHealth.metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="flex justify-between text-sm text-slate">
                    <span>{metric.label}</span>
                    <span>{metric.value}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" style={{ width: `${metric.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate">Skill Gap Chart</p>
                <h3 className="mt-1 text-xl font-semibold text-ink">Current Skills vs Required Skills</h3>
              </div>
              <Badge>Real-time</Badge>
            </div>
            <div className="mt-5 h-80 w-full">
              {analytics.skillGapChart.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.skillGapChart}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="skill" tick={{ fill: '#64748B', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#64748B', fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" fill="#4F46E5" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="required" fill="#7C3AED" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-slate">No skill data available. Take an assessment or upload a resume.</div>
              )}
            </div>
          </Card>
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-ink">Recent Job Matches</h3>
              <Badge>Active</Badge>
            </div>
            
            {analytics.recentJobMatches.length > 0 ? (
              <>
                <div className="mt-5 hidden overflow-hidden rounded-2xl border border-border md:block">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate">
                      <tr>
                        <th className="px-4 py-3 font-medium">Company</th>
                        <th className="px-4 py-3 font-medium">Position</th>
                        <th className="px-4 py-3 font-medium">Match</th>
                        <th className="px-4 py-3 font-medium">Skills</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.recentJobMatches.map((job, idx) => (
                        <tr key={idx} className="border-t border-border">
                          <td className="px-4 py-4 font-medium text-ink">{job.company}</td>
                          <td className="px-4 py-4 text-slate">{job.position}</td>
                          <td className="px-4 py-4">
                            <span className={`chip ${job.match >= 90 ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : job.match >= 75 ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
                              {job.match}%
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-wrap gap-2">
                              {job.skills.map((skill) => <span key={skill} className="chip">{skill}</span>)}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-slate">{job.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ResponsiveTableCards rows={analytics.recentJobMatches} />
              </>
            ) : (
              <div className="mt-5 p-8 text-center text-slate">No recent job matches found. Discover roles to get started.</div>
            )}
          </Card>

          <motion.div whileHover={{ y: -4 }} className="card ai-gradient p-6">
            <Sparkles className="text-indigo-600" />
            <h3 className="mt-4 text-xl font-semibold text-ink">AI Career Insight</h3>
            <p className="mt-3 text-sm leading-7 text-slate">{analytics.insight}</p>
            <button className="btn-primary mt-6 w-full justify-center">View Roadmap <ArrowRight size={16} /></button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}