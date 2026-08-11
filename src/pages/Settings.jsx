import { useState, useEffect } from 'react'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import Button from '../components/ui/Button'
import DashboardHeader from '../components/layout/DashboardHeader'
import { useAuth } from '../context/AuthContext'
import useStore from '../store/useStore'
import api from '../services/api'
import { LoaderCircle } from 'lucide-react'

export default function Settings() {
  const { user, updateUser } = useAuth()
  const { showToast } = useStore()
  
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    targetRole: '',
    experienceLevel: '',
    skills: '',
    careerGoals: ''
  })

  useEffect(() => {
    if (user) {
      setFormData({
        targetRole: user.targetRole || '',
        experienceLevel: user.experienceLevel || '',
        skills: user.skills ? user.skills.join(', ') : '',
        careerGoals: user.careerGoals || ''
      })
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
      }
      
      const { data } = await api.patch('/users/profile', payload)
      updateUser(data.data.user)
      showToast('Profile updated successfully!')
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <DashboardHeader title="Settings" subtitle="Update profile, career goals, resume preferences, and AI settings." />
      <div className="page-padding py-6 xl:px-8">
        <div className="grid gap-5 xl:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-ink">Profile</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Target Role</label>
                <Input name="targetRole" value={formData.targetRole} onChange={handleChange} placeholder="e.g. AI Engineer" />
              </div>
              <div>
                <label className="label">Experience Level</label>
                <Input name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} placeholder="e.g. entry, mid, senior" />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Preferred Technologies (comma separated)</label>
                <Input name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node.js, Python" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-ink">Career Goals</h3>
            <div className="mt-5 space-y-4">
              <Textarea 
                name="careerGoals"
                value={formData.careerGoals}
                onChange={handleChange}
                placeholder="What are you trying to achieve?" 
                rows={4}
              />
              <Button onClick={handleSave} disabled={loading} className="w-full sm:w-auto">
                {loading ? <LoaderCircle className="w-5 h-5 animate-spin" /> : 'Save Changes'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}