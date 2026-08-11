import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Star, LoaderCircle, CheckCircle2 } from 'lucide-react';
import DashboardHeader from '../components/layout/DashboardHeader';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import useStore from '../store/useStore';
import api from '../services/api';

export default function JobDiscovery() {
  const { showToast } = useStore();
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  
  const [query, setQuery] = useState('');
  const [remote, setRemote] = useState(false);
  
  const searchJobs = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.get('/discovery/search', {
        params: { query, remote }
      });
      setJobs(data.data.items);
    } catch (err) {
      showToast('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const saveJob = async (id) => {
    try {
      await api.post(`/discovery/${id}/save`);
      showToast('Job saved to your Application Tracker');
    } catch (err) {
      showToast('Failed to save job');
    }
  };

  return (
    <div>
      <DashboardHeader 
        title="Job Discovery" 
        subtitle="AI-ranked job recommendations based on your skills, resume, and preferences."
      />
      
      <div className="page-padding py-6 xl:px-8">
        <Card className="p-6 mb-8 bg-slate-50 border-slate-100 shadow-sm">
          <form onSubmit={searchJobs} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-slate-700 mb-1">Keywords / Title</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input 
                  className="pl-10" 
                  placeholder="Software Engineer, Product Manager..." 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <input 
                type="checkbox" 
                id="remote" 
                checked={remote}
                onChange={(e) => setRemote(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 h-4 w-4"
              />
              <label htmlFor="remote" className="text-sm font-medium text-slate-700">Remote Only</label>
            </div>
            <Button type="submit" disabled={loading} className="w-full md:w-auto">
              {loading ? <LoaderCircle className="animate-spin" size={18} /> : 'Search'}
            </Button>
          </form>
        </Card>
        
        <div className="space-y-4">
          {jobs.length === 0 && !loading && (
            <div className="text-center py-12 text-slate-500">
              <Search size={32} className="mx-auto mb-4 text-slate-300" />
              <p>No jobs found. Try adjusting your search filters.</p>
            </div>
          )}
          
          {jobs.map(({ job, ranking }) => (
            <Card key={job._id} className="p-6 transition-all hover:shadow-md border border-slate-200">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      ranking.category === 'Excellent' ? 'bg-emerald-100 text-emerald-700' :
                      ranking.category === 'Strong' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {ranking.score}% Match
                    </span>
                  </div>
                  <p className="text-lg font-medium text-slate-700 mb-4">{job.company}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-6">
                    <span className="flex items-center"><MapPin size={16} className="mr-1.5 opacity-70"/> {job.location || 'Not specified'}</span>
                    <span className="flex items-center"><Briefcase size={16} className="mr-1.5 opacity-70"/> {job.remoteType || 'Unknown'}</span>
                    <span className="flex items-center"><DollarSign size={16} className="mr-1.5 opacity-70"/> {job.salary?.min ? `${job.salary.min} - ${job.salary.max}` : 'Undisclosed'}</span>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-slate-900 mb-2 flex items-center">
                      <Star size={14} className="text-amber-500 mr-2" /> Why this matches you:
                    </p>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {ranking.reasons.map((r, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle2 size={14} className="text-emerald-500 mr-2 shrink-0"/> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {ranking.missingSkills.length > 0 && (
                     <div className="mt-4">
                       <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Missing Skills</p>
                       <div className="flex flex-wrap gap-2">
                         {ranking.missingSkills.map((s, i) => (
                           <span key={i} className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded border border-red-100">{s}</span>
                         ))}
                       </div>
                     </div>
                  )}
                </div>
                
                <div className="flex flex-row md:flex-col gap-3 shrink-0">
                  <Button variant="primary" className="flex-1 md:w-full justify-center">Apply</Button>
                  <Button variant="secondary" className="flex-1 md:w-full justify-center" onClick={() => saveJob(job._id)}>Save Job</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
