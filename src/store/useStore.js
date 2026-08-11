import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const useStore = create(devtools(persist((set, get) => ({
  // UI
  theme: localStorage.getItem('careerai_theme') || 'light',
  sidebarCollapsed: JSON.parse(localStorage.getItem('careerai_sidebar')) || false,
  setTheme: (theme) => {
    localStorage.setItem('careerai_theme', theme)
    set({ theme })
  },
  toggleSidebar: () => {
    const next = !get().sidebarCollapsed
    localStorage.setItem('careerai_sidebar', JSON.stringify(next))
    set({ sidebarCollapsed: next })
  },

  // Toasts & notifications
  toast: null,
  showToast: (message, timeout = 3000) => {
    set({ toast: message })
    if (timeout > 0) setTimeout(() => get().clearToast(), timeout)
  },
  clearToast: () => set({ toast: null }),

  notifications: [],
  addNotification: (notice) => set((state) => ({ notifications: [notice, ...state.notifications] })),
  markAllNotificationsRead: () => set({ notifications: [] }),

  // Resumes
  resumes: [],
  selectedResumeId: null,
  addResume: (resume) => set((state) => ({ resumes: [resume, ...state.resumes], selectedResumeId: resume.id })),
  selectResume: (id) => set({ selectedResumeId: id }),
  removeResume: (id) => set((state) => ({ resumes: state.resumes.filter((r) => r.id !== id), selectedResumeId: state.selectedResumeId === id ? null : state.selectedResumeId })),

  // Resume analysis
  resumeAnalysis: {},
  setResumeAnalysis: (id, analysis) => set((state) => ({ resumeAnalysis: { ...state.resumeAnalysis, [id]: analysis } })),

  // Jobs
  jobs: [],
  selectedJobId: null,
  addJobs: (jobs) => set({ jobs }),
  selectJob: (id) => set({ selectedJobId: id }),
  jobMatchAnalysis: {},
  setJobMatchAnalysis: (id, analysis) => set((state) => ({ jobMatchAnalysis: { ...state.jobMatchAnalysis, [id]: analysis } })),

  // Interview
  interviewSession: null,
  startInterview: (session) => set({ interviewSession: session }),
  updateInterview: (patch) => set((state) => ({ interviewSession: { ...state.interviewSession, ...patch } })),
  endInterview: () => set({ interviewSession: null }),

  // Roadmap
  roadmap: {},
  setRoadmap: (role, data) => set((state) => ({ roadmap: { ...state.roadmap, [role]: data } })),

  // Applications (Kanban)
  applications: [],
  addApplication: (app) => set((state) => ({ applications: [app, ...state.applications] })),
  updateApplication: (id, patch) => set((state) => ({ applications: state.applications.map((a) => (a.id === id ? { ...a, ...patch } : a)) })),
  removeApplication: (id) => set((state) => ({ applications: state.applications.filter((a) => a.id !== id) })),

  // AI Assistant
  conversations: [],
  addConversation: (conv) => set((state) => ({ conversations: [conv, ...state.conversations] })),
  updateConversation: (id, patch) => set((state) => ({ conversations: state.conversations.map((c) => (c.id === id ? { ...c, ...patch } : c)) })),

  // Helpers to load initial mock data
  initializeFromMocks: (mocks) => {
    set({
      resumes: mocks.resumes || [],
      applications: mocks.applications || [],
      jobs: mocks.jobs || [],
      conversations: mocks.conversations || [],
      roadmap: mocks.roadmap || {},
    })
  },
}), { name: 'careerai-store' })))

export default useStore
