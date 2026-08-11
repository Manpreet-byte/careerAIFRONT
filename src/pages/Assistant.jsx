import { useState, useEffect, useRef } from 'react'
import { Copy, RotateCcw, ThumbsDown, ThumbsUp, Loader2 } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import DashboardHeader from '../components/layout/DashboardHeader'
import api from '../services/api'
import useStore from '../store/useStore'

const assistantPrompts = [
  'How do I pivot to a Machine Learning role?',
  'Review my skills and tell me what I should learn next.',
  'How do I answer behavioral questions about conflict?',
  'What should I say when asked about my salary expectations?',
]

export default function Assistant() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [conversationId, setConversationId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const showToast = useStore((s) => s.showToast)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    fetchConversation()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const fetchConversation = async () => {
    try {
      // For now we just get the latest conversation, or create one if none exists
      const res = await api.get('/assistant/conversations?limit=1')
      if (res.data.data?.data && res.data.data.data.length > 0) {
        const activeConv = res.data.data.data[0]
        setConversationId(activeConv._id)
        setMessages(activeConv.messages || [])
      } else {
        // Create new
        const createRes = await api.post('/assistant/conversations', { title: 'Career Coaching' })
        setConversationId(createRes.data.data.conversation._id)
      }
    } catch (err) {
      showToast('Failed to load conversation', 'error')
    } finally {
      setIsInitializing(false)
    }
  }

  const handleSend = async (text) => {
    const messageText = text || input
    if (!messageText.trim()) return

    if (!conversationId) {
      showToast('No active conversation. Please refresh.', 'error')
      return
    }

    // Optimistic UI update
    const userMsg = { _id: Date.now().toString(), role: 'user', content: messageText }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await api.post(`/assistant/conversations/${conversationId}/messages`, { content: messageText })
      setMessages(res.data.data.conversation.messages)
    } catch (err) {
      // Remove optimistic update on error
      setMessages(prev => prev.filter(m => m._id !== userMsg._id))
      showToast(err.response?.data?.message || 'Failed to send message', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    showToast('Copied to clipboard')
  }

  if (isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <DashboardHeader title="AI Assistant" subtitle="Career-focused guidance powered by RAG context." />
      <div className="page-padding flex-1 overflow-hidden py-6 xl:px-8">
        <div className="grid h-full gap-5 lg:grid-cols-[0.34fr_0.66fr]">
          <Card className="flex flex-col p-6">
            <h3 className="text-xl font-semibold text-ink">Suggested prompts</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {assistantPrompts.map((prompt) => (
                <Badge key={prompt} className="cursor-pointer hover:bg-slate-100" onClick={() => setInput(prompt)}>
                  {prompt}
                </Badge>
              ))}
            </div>
            <div className="mt-auto space-y-3 pt-6">
              <Input 
                placeholder="Ask CareerAI anything career-related..." 
                value={input} 
                onChange={(event) => setInput(event.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && !loading && handleSend()}
                disabled={loading}
              />
              <Button className="w-full" onClick={() => handleSend()} disabled={loading || !input.trim()}>
                {loading ? <Loader2 className="mr-2 animate-spin" size={16} /> : null}
                Send
              </Button>
            </div>
          </Card>
          
          <Card className="flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center text-slate">
                  <p>Start the conversation by sending a message.</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div key={message._id || Math.random()} className="group relative">
                    <div className={`max-w-[85%] rounded-3xl p-4 text-sm leading-7 ${message.role === 'assistant' ? 'bg-slate-50 text-slate' : 'ml-auto bg-indigo-600 text-white'}`}>
                      {message.content.split('\\n').map((line, i) => (
                        <p key={i} className="mb-2 last:mb-0">{line}</p>
                      ))}
                    </div>
                    {message.role === 'assistant' && (
                      <div className="mt-2 flex opacity-0 transition-opacity group-hover:opacity-100 gap-2">
                        <Button variant="secondary" className="h-8 px-2 text-xs" onClick={() => handleCopy(message.content)}><Copy size={14} className="mr-1" /> Copy</Button>
                      </div>
                    )}
                  </div>
                ))
              )}
              {loading && (
                <div className="max-w-[85%] rounded-3xl bg-slate-50 p-4 text-sm text-slate">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}