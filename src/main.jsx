import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles.css'
import { AuthProvider } from './context/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import useStore from './store/useStore'
import { mockResumes } from './data/resumeData'
import { mockJobs } from './data/jobData'
import { mockApplications } from './data/applicationData'
import { sampleConversations } from './data/assistantData'
import { sampleRoadmaps } from './data/roadmapData'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || 'mock_google_client_id'}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)

// initialize store with lightweight mock data
try {
  useStore.getState().initializeFromMocks({
    resumes: mockResumes,
    jobs: mockJobs,
    applications: mockApplications,
    conversations: sampleConversations,
    roadmap: sampleRoadmaps,
  })
} catch (e) {
  // ignore during SSR or tests
}
