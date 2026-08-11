import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, BrainCircuit, FileSearch, Globe2, LayoutGrid, ShieldCheck, Sparkles, Target, TrendingUp, Users, Workflow } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import CircularProgress from '../components/ui/CircularProgress'
import PageSection from '../components/layout/PageSection'
import { aiDashboardMetrics, featureCards, landingStats, testimonials } from '../data/mockData'

const iconMap = { FileSearch, Target, BrainCircuit, TrendingUp, LayoutGrid, Workflow, Sparkles, BarChart3, ShieldCheck, Globe2, Users }

function AnimatedCounter({ value }) {
  return <span>{value}</span>
}

export default function Home() {
  return (
    <div>
      <section className="page-padding section-padding">
        <div className="container-wrap grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge>AI-powered career intelligence</Badge>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl">Your career deserves an AI copilot.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate">Analyze your resume, match yourself with jobs, discover missing skills, prepare for interviews, and build a personalized career roadmap - all in one place.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button>Analyze My Resume <ArrowRight size={16} /></Button>
              <Button variant="secondary">Explore CareerAI</Button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {landingStats.map((item) => (
                <Card key={item.label} className="p-4">
                  <p className="text-2xl font-semibold text-ink"><AnimatedCounter value={item.value} /></p>
                  <p className="mt-1 text-sm text-slate">{item.label}</p>
                  <p className="mt-2 text-xs font-medium text-emerald-600">{item.trend}</p>
                </Card>
              ))}
            </div>
          </div>

          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="relative mx-auto w-full max-w-xl">
            <Card className="ai-gradient overflow-hidden p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate">CareerAI dashboard preview</p>
                  <p className="mt-1 text-xl font-semibold text-ink">Resume intelligence in motion</p>
                </div>
                <span className="chip">Live AI</span>
              </div>
              <div className="mt-6 grid gap-4 lg:grid-cols-[170px_1fr]">
                <div className="card bg-white p-4">
                  <p className="text-sm text-slate">Resume Score</p>
                  <div className="mt-3 flex items-center justify-center">
                    <CircularProgress value={87} size={150} />
                    <div className="absolute text-center">
                      <p className="text-4xl font-semibold text-ink">87</p>
                      <p className="text-sm text-slate">out of 100</p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between text-sm text-slate"><span>Job Match</span><span>89%</span></div>
                    <div className="mt-3 h-2 rounded-full bg-slate-100"><div className="h-2 w-[89%] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" /></div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center justify-between text-sm text-slate"><span>Skill Gap</span><span>Docker • AWS • Redis</span></div>
                    <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-slate">
                      {['Docker', 'AWS', 'Redis'].map((skill) => <span key={skill} className="chip justify-center py-2">{skill}</span>)}
                    </div>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm font-medium text-slate">AI Recommendation</p>
                    <p className="mt-2 text-sm leading-7 text-ink">Adding Docker and AWS projects could significantly improve your profile for this role.</p>
                  </Card>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <PageSection eyebrow="Trust" title="AI that feels precise, not generic." description="Built with premium product signals, measurable guidance, and a professional workflow that helps users act quickly.">
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {landingStats.map((stat) => <Card key={stat.label} className="p-5"><p className="text-sm text-slate">{stat.label}</p><p className="mt-2 text-3xl font-semibold text-ink">{stat.value}</p></Card>)}
        </div>
      </PageSection>

      <PageSection id="features" eyebrow="Features" title="Everything you need to move forward." description="Each module is designed for a real career workflow with clean interactions, clear outcomes, and mock data ready for API integration.">
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((feature) => {
            const Icon = iconMap[feature.icon] || Sparkles
            return (
              <Card key={feature.title} className="card-hover p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600"><Icon size={20} /></div>
                <h3 className="mt-5 text-xl font-semibold text-ink">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </PageSection>

      <PageSection id="how-it-works" eyebrow="How it works" title="A 4-step workflow that removes guesswork." description="A visual path from upload to insight to action.">
        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {['Upload Resume', 'Add Job Description', 'AI Analyzes Your Profile', 'Get Your Career Strategy'].map((step, index) => (
            <Card key={step} className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo">0{index + 1}</p>
              <h3 className="mt-3 text-lg font-semibold text-ink">{step}</h3>
              <p className="mt-2 text-sm leading-7 text-slate">{index === 0 ? 'Start with a resume upload or paste your current experience.' : index === 1 ? 'Tell CareerAI what role you want and what matters to you.' : index === 2 ? 'The platform measures fit, gaps, and high-impact changes.' : 'Get a targeted plan with actions you can take right away.'}</p>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection eyebrow="AI preview" title="A dashboard that shows the story at a glance." description="Everything is designed to feel like a modern AI product with clear metrics and helpful guidance.">
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Card className="p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {aiDashboardMetrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate">{metric.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-ink">{metric.value}%</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <p className="text-sm font-medium text-slate">AI Recommendation</p>
            <p className="mt-3 text-base leading-8 text-ink">Your React and Node.js experience strongly matches this role. Adding Docker and AWS projects could significantly improve your profile.</p>
            <div className="mt-5 flex flex-wrap gap-2"><Badge>React</Badge><Badge>Node.js</Badge><Badge>MongoDB</Badge><Badge>JavaScript</Badge></div>
          </Card>
        </div>
      </PageSection>

      <PageSection eyebrow="Testimonials" title="Professionals trust it because it feels usable." description="Believable feedback from people with real career goals.">
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => <Card key={item.name} className="p-6"><p className="text-sm leading-7 text-slate">“{item.quote}”</p><p className="mt-6 font-semibold text-ink">{item.name}</p><p className="text-sm text-slate">{item.role}</p></Card>)}
        </div>
      </PageSection>

      <section id="pricing" className="page-padding section-padding">
        <div className="container-wrap">
          <Card className="ai-gradient overflow-hidden p-8 sm:p-12">
            <div className="max-w-2xl">
              <p className="eyebrow">Final CTA</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">Ready to build your next career move?</h2>
              <p className="mt-4 text-base leading-7 text-slate">Start free and explore resume intelligence, job matching, interview practice, and career roadmaps in one premium product experience.</p>
              <div className="mt-8"><Button>Start Free</Button></div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
