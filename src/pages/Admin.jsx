import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, Terminal, Activity, Zap, CheckCircle2, XCircle, Search, Filter } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import ScoreCard from '../components/ui/ScoreCard'
import DashboardHeader from '../components/layout/DashboardHeader'
import ResponsiveTableCards from '../components/layout/ResponsiveTableCards'
import { getAIObservabilityMetrics, getAILogs } from '../services/adminService'

function LogModal({ log, onClose }) {
  if (!log) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 sm:p-6" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-ink">AI Log Trace</h3>
            <p className="text-sm text-slate font-mono">{log.traceId}</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-100 text-slate">
            <XCircle size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-border bg-slate-50 p-4">
              <p className="text-xs text-slate uppercase tracking-wider">Feature</p>
              <p className="mt-1 font-medium text-ink">{log.feature}</p>
            </div>
            <div className="rounded-xl border border-border bg-slate-50 p-4">
              <p className="text-xs text-slate uppercase tracking-wider">Status</p>
              <div className="mt-1 flex items-center gap-1">
                {log.status === 'success' ? <CheckCircle2 size={16} className="text-emerald-500" /> : <XCircle size={16} className="text-rose-500" />}
                <p className="font-medium text-ink capitalize">{log.status}</p>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-slate-50 p-4">
              <p className="text-xs text-slate uppercase tracking-wider">Tokens</p>
              <p className="mt-1 font-medium text-ink">{log.totalTokens}</p>
            </div>
            <div className="rounded-xl border border-border bg-slate-50 p-4">
              <p className="text-xs text-slate uppercase tracking-wider">Latency</p>
              <p className="mt-1 font-medium text-ink">{log.latencyMs}ms</p>
            </div>
          </div>
          
          <div>
            <h4 className="mb-2 font-medium text-ink">Metadata</h4>
            <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-300 shadow-inner">
              {JSON.stringify({ model: log.model, promptVersion: log.promptVersion, validationPassed: log.validationPassed, errorCode: log.errorCode }, null, 2)}
            </pre>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Admin() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [metrics, setMetrics] = useState(null)
  
  const [logsState, setLogsState] = useState({ logs: [], pagination: null, loading: false })
  const [selectedLog, setSelectedLog] = useState(null)
  const [page, setPage] = useState(1)

  const fetchDashboardData = async (currentPage = 1) => {
    try {
      if (currentPage === 1) setLoading(true)
      setLogsState(prev => ({ ...prev, loading: true }))
      setError(null)
      
      const [metricsData, logsData] = await Promise.all([
        currentPage === 1 ? getAIObservabilityMetrics() : Promise.resolve(metrics), // Only fetch metrics on initial load to save DB calls
        getAILogs({ page: currentPage, limit: 15 })
      ])
      
      if (currentPage === 1) setMetrics(metricsData)
      setLogsState({ logs: logsData.logs, pagination: logsData.pagination, loading: false })
    } catch (err) {
      if (err.response?.status === 403) {
        setError('Forbidden: You do not have administrator access.')
      } else {
        setError('Unable to load AI telemetry. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData(page)
  }, [page])

  if (loading) {
    return (
      <div className="flex h-full min-h-[50vh] flex-col items-center justify-center p-8">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
        <p className="mt-4 text-slate">Loading telemetry...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full min-h-[50vh] flex-col items-center justify-center p-8">
        <AlertCircle className="h-12 w-12 text-rose-500" />
        <p className="mt-4 text-slate">{error}</p>
        <button onClick={() => fetchDashboardData(1)} className="btn-primary mt-4">Try Again</button>
      </div>
    )
  }

  if (!metrics) return null

  const chartData = metrics.features.map(f => ({
    name: f.feature,
    requests: f.totalRequests,
    tokens: f.totalTokens,
  }))

  const logRows = logsState.logs.map(log => ({
    id: log._id,
    feature: log.feature,
    status: (
      <span className={`chip ${log.status === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
        {log.status}
      </span>
    ),
    model: <span className="font-mono text-xs text-slate">{log.model}</span>,
    latency: `${log.latencyMs}ms`,
    time: new Date(log.createdAt).toLocaleString(),
    rawLog: log // Keep reference to raw object for modal
  }))

  return (
    <div className="relative">
      <DashboardHeader title="AI Observability" subtitle="System telemetry and LLM performance metrics." />
      <div className="page-padding py-6 xl:px-8">
        
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <ScoreCard title="Total Requests" value={metrics.overview.totalRequests.toLocaleString()} description="Global inferences" icon="Activity" />
          <ScoreCard title="Avg Success Rate" value={`${metrics.overview.successRate}%`} description="Validation passing" icon="CheckCircle2" />
          <ScoreCard title="Total Tokens" value={metrics.features.reduce((acc, f) => acc + f.totalTokens, 0).toLocaleString()} description="Prompt + Completion" icon="Terminal" />
          <ScoreCard title="Global Errors" value={metrics.overview.failedRequests.toLocaleString()} description="Timeouts/Validations" icon="XCircle" />
        </div>

        <div className="mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate">Usage Volume</p>
                <h3 className="mt-1 text-xl font-semibold text-ink">Requests by Feature</h3>
              </div>
              <Badge>Real-time</Badge>
            </div>
            <div className="mt-5 h-80 w-full">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 12 }} />
                    <YAxis yAxisId="left" tick={{ fill: '#64748B', fontSize: 12 }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fill: '#64748B', fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="requests" fill="#4F46E5" radius={[4, 4, 0, 0]} name="Total Requests" />
                    <Bar yAxisId="right" dataKey="tokens" fill="#0EA5E9" radius={[4, 4, 0, 0]} name="Total Tokens" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-slate">No telemetry data available.</div>
              )}
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-semibold text-ink">Recent AI Logs</h3>
              <div className="flex items-center gap-2">
                <button className="btn-secondary px-3 py-1.5 text-sm" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Previous</button>
                <span className="text-sm text-slate">Page {logsState.pagination?.page} of {logsState.pagination?.pages || 1}</span>
                <button className="btn-secondary px-3 py-1.5 text-sm" disabled={page >= (logsState.pagination?.pages || 1)} onClick={() => setPage(p => p + 1)}>Next</button>
              </div>
            </div>
            
            {logsState.loading && logsState.logs.length === 0 ? (
              <div className="py-8 text-center text-slate animate-pulse">Loading logs...</div>
            ) : logRows.length > 0 ? (
              <div className="overflow-hidden rounded-2xl border border-border">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-slate-50 text-slate">
                    <tr>
                      <th className="px-4 py-3 font-medium">Feature</th>
                      <th className="px-4 py-3 font-medium">Model</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Latency</th>
                      <th className="px-4 py-3 font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logRows.map((row) => (
                      <tr 
                        key={row.id} 
                        className="border-t border-border hover:bg-slate-50 cursor-pointer transition-colors"
                        onClick={() => setSelectedLog(row.rawLog)}
                      >
                        <td className="px-4 py-3 font-medium text-ink">{row.feature}</td>
                        <td className="px-4 py-3">{row.model}</td>
                        <td className="px-4 py-3">{row.status}</td>
                        <td className="px-4 py-3 text-slate">{row.latency}</td>
                        <td className="px-4 py-3 text-slate">{row.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-8 text-center text-slate">No logs found.</div>
            )}
          </Card>
        </div>
      </div>
      
      <AnimatePresence>
        {selectedLog && (
          <LogModal log={selectedLog} onClose={() => setSelectedLog(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
