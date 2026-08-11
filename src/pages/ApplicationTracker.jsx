import { useState, useEffect } from 'react';
import { LoaderCircle, FileText, Sparkles, Building2, MapPin } from 'lucide-react';
import DashboardHeader from '../components/layout/DashboardHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import useStore from '../store/useStore';
import api from '../services/api';

const KANBAN_COLUMNS = [
  { id: 'saved', label: 'Saved' },
  { id: 'preparing', label: 'Preparing' },
  { id: 'applied', label: 'Applied' },
  { id: 'assessment', label: 'Assessment' },
  { id: 'interview', label: 'Interview' },
  { id: 'offer', label: 'Offer' },
  { id: 'rejected', label: 'Rejected' },
];

export default function ApplicationTracker() {
  const { showToast } = useStore();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  
  const [optimizingId, setOptimizingId] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/applications');
      setApplications(data.data.items || []);
    } catch (err) {
      showToast('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (appId, newStatus) => {
    try {
      setApplications(prev => prev.map(a => a._id === appId ? { ...a, status: newStatus } : a));
      await api.patch(`/applications/${appId}`, { status: newStatus });
      showToast('Application updated');
    } catch (err) {
      showToast('Failed to update status');
      fetchApplications(); // revert
    }
  };

  const handleDragStart = (e, appId) => {
    e.dataTransfer.setData('appId', appId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const appId = e.dataTransfer.getData('appId');
    if (appId) {
      const app = applications.find(a => a._id === appId);
      if (app && app.status !== status) {
        updateStatus(appId, status);
      }
    }
  };
  
  const optimizeResume = async (appId) => {
    setOptimizingId(appId);
    try {
      const { data } = await api.post(`/applications/${appId}/resume-analysis`);
      // Update the local state with the notes containing AI feedback for now
      setApplications(prev => prev.map(a => {
        if (a._id === appId) {
          return {
            ...a,
            notes: `AI Analysis:\nATS Score: ${data.data.insights.atsScore}%\nMissing: ${data.data.insights.missingKeywords.join(', ')}\nImprovements: ${data.data.insights.suggestedImprovements.join(' | ')}`
          };
        }
        return a;
      }));
      showToast('Resume optimization insights generated!');
    } catch (err) {
      showToast('Failed to generate insights');
    } finally {
      setOptimizingId(null);
    }
  };

  if (loading) {
    return <div className="p-8 text-center"><LoaderCircle className="animate-spin mx-auto text-indigo-500" size={32} /></div>;
  }

  return (
    <div className="h-full flex flex-col">
      <DashboardHeader 
        title="Application Tracker" 
        subtitle="Manage your job search pipeline and optimize your resume for each role."
      />
      
      <div className="page-padding py-6 xl:px-8 flex-1 overflow-x-auto">
        <div className="flex gap-6 h-full pb-8" style={{ minWidth: '1200px' }}>
          {KANBAN_COLUMNS.map(column => (
            <div 
              key={column.id} 
              className="flex-1 min-w-[300px] flex flex-col bg-slate-50/50 rounded-2xl border border-slate-200 p-4"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="font-bold text-slate-700">{column.label}</h3>
                <span className="bg-white border border-slate-200 text-slate-500 text-xs font-bold px-2 py-0.5 rounded-full">
                  {applications.filter(a => a.status === column.id).length}
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4">
                {applications.filter(a => a.status === column.id).map(app => (
                  <Card 
                    key={app._id} 
                    className="p-4 cursor-grab active:cursor-grabbing border-slate-200 hover:border-indigo-300 transition-colors bg-white shadow-sm"
                    draggable
                    onDragStart={(e) => handleDragStart(e, app._id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-900 leading-tight">{app.job?.title || 'Unknown Role'}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${app.recommendationScore >= 80 ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                        {app.recommendationScore}%
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 mb-3 flex items-center">
                      <Building2 size={14} className="mr-1.5 opacity-70"/> {app.job?.company || 'Unknown Company'}
                    </p>
                    <p className="text-xs text-slate-500 flex items-center mb-4">
                      <MapPin size={12} className="mr-1 opacity-70"/> {app.job?.location || 'Remote'}
                    </p>
                    
                    {app.notes && (
                      <div className="bg-slate-50 p-2 rounded text-xs text-slate-600 mb-4 whitespace-pre-wrap border border-slate-100">
                        {app.notes}
                      </div>
                    )}
                    
                    <div className="pt-3 border-t border-slate-100 flex gap-2">
                      <Button 
                        variant="secondary" 
                        className="flex-1 text-xs px-2 py-1 h-auto" 
                        onClick={() => optimizeResume(app._id)}
                        disabled={optimizingId === app._id}
                      >
                        {optimizingId === app._id ? <LoaderCircle className="animate-spin" size={14} /> : <><Sparkles size={14} className="mr-1.5 text-indigo-500"/> Optimize</>}
                      </Button>
                    </div>
                  </Card>
                ))}
                
                {applications.filter(a => a.status === column.id).length === 0 && (
                  <div className="h-24 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-sm text-slate-400 font-medium bg-slate-50/30">
                    Drop here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
